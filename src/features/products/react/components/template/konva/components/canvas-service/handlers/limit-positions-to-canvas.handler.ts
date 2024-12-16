import { LayerNode } from '../canvas.service';

import { CanvasHandler } from './canvas.handler';

import { CanvasConfig } from '#features/products/react';

export class LimitPositionsToCanvasHandler implements CanvasHandler {
  canvas: CanvasConfig;

  constructor(canvas: CanvasConfig) {
    this.canvas = canvas;
  }

  handler = (layerNode: LayerNode) => {
    return LayerNode.build({
      ...layerNode,
      x: Math.max(
        0,
        Math.min(layerNode.x, this.canvas.frontWidth - layerNode.width),
      ),
      y: Math.max(
        0,
        Math.min(layerNode.y, this.canvas.frontHeight - layerNode.height),
      ),
    });
  };
}
