import { ComponentProps, RefObject, useRef } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import { useInstance } from '@mygoodstack/di-react/dist';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Box } from 'konva/lib/shapes/Transformer';

import { useTemplate } from '../../context';
import { LayerConfig } from '../../types';

import { CanvasService, LayerNode } from './canvas-service/canvas.service';

import { StateItemsController } from '#core/react';

export function Canvas() {
  const { layers, selectedLayerId, canvasConfig } = useTemplate();

  const handleStageClick = (event: KonvaEventObject<MouseEvent>) => {
    if (event.target === event.target.getStage()) {
      selectedLayerId.set(null);
    }
  };

  return (
    <div className="relative">
      <Stage
        height={canvasConfig.frontHeight}
        width={canvasConfig.frontWidth}
        style={{ border: '1px solid #ccc' }}
        onClick={handleStageClick}
      >
        <Layer>
          {StateItemsController.getAll(layers).map((layer) => (
            <KonvaLayer
              key={layer.id}
              layer={layer}
              state={
                layer.id === selectedLayerId.get ? 'selected' : 'unselected'
              }
              onClick={() => selectedLayerId.set(layer.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

function KonvaLayer({
  layer,
  state,
  onClick,
}: {
  layer: LayerConfig;
  state: 'selected' | 'unselected';
  onClick: () => void;
}) {
  const canvasService = useInstance(CanvasService);

  const { canvasConfig, layers } = useTemplate();
  const shapeRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const styles = {
    selected: {
      stroke: '#00ff00',
      strokeWidth: 2,
      cornerRadius: 5,
    },
    unselected: {
      stroke: '#999',
      strokeWidth: 1,
    },
  } as const satisfies Record<typeof state, ComponentProps<typeof Rect>>;

  const style = styles[state];

  const applyHandlers = canvasService.buildLayerNodePipeline({
    canvas: canvasConfig,
    layers: StateItemsController.getAll(layers),
  });

  const handleDragMove = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target;

    const initLayerNode = LayerNode.build({
      id: node.id(),
      x: node.x(),
      y: node.y(),
      height: node.height(),
      width: node.width(),
    });

    const layerNode = applyHandlers(initLayerNode);

    node.x(layerNode.x);
    node.y(layerNode.y);
  };

  const handleTransformEnd = (event: Konva.KonvaEventObject<Event>) => {
    transformerRef.current?.getLayer()?.batchDraw();
    const node = event.target;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale to 1 and adjust width/height instead
    node.scaleX(1);
    node.scaleY(1);

    StateItemsController.update(layers, layer.id, {
      // x: node.x(),
      // y: node.y(),
      frontHeight: Math.max(node.height() * scaleY, 50), // Minimum height of 50
      frontWidth: Math.max(node.width() * scaleX, 50), // Minimum width of 50
    });
  };

  const onDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    const node = event.target;

    StateItemsController.update(layers, layer.id, {
      frontX: node.x(),
      frontY: node.y(),
    });
  };

  const onTransform = (event: Konva.KonvaEventObject<Event>) => {
    const gridSize = CanvasService.GRID_SIZE;
    const node = event.target;
    const transformer = transformerRef.current;

    // Get the active anchor (the one being dragged)
    const activeAnchor = transformer?.getActiveAnchor();
    const isCornerAnchor = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ].includes(activeAnchor as string);

    // Get the current transformation
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const width = Math.max(20, node.width() * scaleX);
    const height = Math.max(20, node.height() * scaleY);

    let newWidth: number;
    let newHeight: number;

    if (isCornerAnchor) {
      // Maintain aspect ratio for corner anchors
      const aspectRatio = node.width() / node.height();
      newWidth = Math.round(width / gridSize) * gridSize;
      newHeight = Math.round(newWidth / aspectRatio);

      if (newHeight % gridSize !== 0) {
        newHeight = Math.round(height / gridSize) * gridSize;
        newWidth = Math.round(newHeight * aspectRatio);
      }
    } else {
      // Don't maintain ratio for middle anchors
      newWidth = Math.round(width / gridSize) * gridSize;
      newHeight = Math.round(height / gridSize) * gridSize;
    }

    // Apply snapped dimensions and reset scale to 1
    node.width(newWidth);
    node.height(newHeight);
    node.scaleX(1);
    node.scaleY(1);

    // Snap position to grid
    const newX = Math.round(node.x() / gridSize) * gridSize;
    const newY = Math.round(node.y() / gridSize) * gridSize;
    node.position({ x: newX, y: newY });
  };

  return (
    <>
      <Rect
        {...style}
        ref={shapeRef}
        id={layer.id}
        data-id={layer.id}
        x={layer.frontX}
        y={layer.frontY}
        height={layer.frontHeight}
        width={layer.frontWidth}
        fill="#ddd"
        onClick={onClick}
        draggable
        onDragMove={handleDragMove}
        onDragEnd={onDragEnd}
        onTransform={onTransform}
        onTransformEnd={handleTransformEnd}
      />
      <KonvaLayerResizingControl
        state={state}
        transformerRef={transformerRef}
        shapeRef={shapeRef}
      />
    </>
  );
}

function KonvaLayerResizingControl({
  state,
  shapeRef,
  transformerRef,
}: {
  state: 'selected' | 'unselected';
  shapeRef: RefObject<Konva.Rect | null>;
  transformerRef: RefObject<Konva.Transformer | null>;
}) {
  const { canvasConfig, layers } = useTemplate();

  const checkCollision = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const currentLayer = shapeRef.current;
    if (!currentLayer) return true;

    const currentLayerId = currentLayer.attrs['data-id'];

    return StateItemsController.getAll(layers).some((otherLayer) => {
      if (otherLayer.id === currentLayerId) return false;

      const noOverlap =
        x + width <= otherLayer.frontX ||
        x >= otherLayer.frontX + otherLayer.frontWidth ||
        y + height <= otherLayer.frontY ||
        y >= otherLayer.frontY + otherLayer.frontHeight;

      return !noOverlap;
    });
  };

  // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const boundBoxFunc: (oldBox: Box, newBox: Box) => Box = (oldBox, newBox) => {
    // Limit resize
    const minHeight = 50;
    const minWidth = 50;
    const maxHeight = canvasConfig.frontHeight - newBox.y;
    const maxWidth = canvasConfig.frontWidth - newBox.x;

    // Calculate new dimensions
    const height = Math.max(minHeight, Math.min(newBox.height, maxHeight));
    const width = Math.max(minWidth, Math.min(newBox.width, maxWidth));

    // Check if new dimensions would cause overlap
    if (checkCollision(newBox.x, newBox.y, width, height)) {
      // If overlap detected, keep old dimensions
      return oldBox;
    }

    return {
      ...newBox,
      width,
      height,
    };
  };

  if (state === 'selected') {
    return (
      <Transformer
        ref={transformerRef}
        nodes={[shapeRef.current]}
        enabledAnchors={[
          'top-left',
          'top-center',
          'top-right',
          'middle-right',
          'middle-left',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ]}
      />
    );
  }

  return null;
}
