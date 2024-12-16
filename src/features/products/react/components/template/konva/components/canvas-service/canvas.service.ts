import { CanvasHandler } from './handlers/canvas.handler';
import { FindNearestPositionHandler } from './handlers/find-nearest-position.handler';
import { GridSnapHandler } from './handlers/grid-snap.handler';
import { LimitPositionsToCanvasHandler } from './handlers/limit-positions-to-canvas.handler';
import { MagneticHandler } from './handlers/magnetic.handler';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';
import { singleton } from '#di';
import { CanvasConfig, LayerConfig } from '#features/products/react';

export class LayerNode extends Dto<LayerNode> {
  id!: string;
  x!: number;
  y!: number;
  height!: number;
  width!: number;

  static build<TBody extends LayerNode>(body: TBody[]): LayerNode[];
  static build<TBody extends LayerNode>(body: TBody): LayerNode;
  static build(body: unknown): LayerNode | LayerNode[] {
    return plainToInstance(this, body);
  }
}

export type LayerNodeHandler = (layerNode: LayerNode) => LayerNode;

@singleton()
export class CanvasService {
  static GRID_SIZE = 10;

  buildLayerNodePipeline({
    canvas,
    layers,
  }: {
    canvas: CanvasConfig;
    layers: LayerConfig[];
  }) {
    return this.createLayerNodePipeline([
      // First limit to canvas
      new LimitPositionsToCanvasHandler(canvas),
      // Then snap to grid if needed
      new GridSnapHandler(10),
      // Then handle magnetic snapping
      new MagneticHandler(CanvasService.GRID_SIZE),
      // Finally handle layer collision
      new FindNearestPositionHandler(layers),
    ]);
  }

  private createLayerNodePipeline(handlers: CanvasHandler[]): LayerNodeHandler {
    return (layerNode: LayerNode) =>
      handlers.reduce(
        (currentPositions, handler) => handler.handler(currentPositions),
        layerNode,
      );
  }
}
