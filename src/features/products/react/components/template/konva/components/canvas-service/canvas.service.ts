import { CanvasHandler } from './handlers/canvas.handler';
import { FindNearestPositionHandler } from './handlers/find-nearest-position.handler';
import { GridSnapHandler } from './handlers/grid-snap.handler';
import { LimitPositionsToCanvasHandler } from './handlers/limit-positions-to-canvas.handler';
import { MagneticHandler } from './handlers/magnetic.handler';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';
import { StateItems, StateItemsController } from '#core/react';
import { singleton } from '#di';
import { CanvasConfig, LayerConfig } from '#features/products/react';

export class LayerNode extends Dto<LayerNode> {
  x!: number;
  y!: number;
  height!: number;
  width!: number;

  static build<TBody>(body: TBody[]): LayerNode[];
  static build<TBody>(body: TBody): LayerNode;
  static build(body: unknown): LayerNode | LayerNode[] {
    return plainToInstance(this, body);
  }
}

export type LayerNodeHandler = (layerNode: LayerNode) => LayerNode;

@singleton()
export class CanvasService {
  buildLayerNodePipeline({
    canvas,
    layer,
    layers,
  }: {
    canvas: CanvasConfig;
    layers: StateItems<LayerConfig>;
    layer: LayerConfig;
  }) {
    return this.createLayerNodePipeline([
      // First limit to canvas
      new LimitPositionsToCanvasHandler(canvas),
      // Then snap to grid if needed
      new GridSnapHandler(10),
      // Then handle magnetic snapping
      new MagneticHandler(5),
      // Finally handle layer collision
      new FindNearestPositionHandler(
        StateItemsController.getAll(layers),
        layer,
      ),
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
