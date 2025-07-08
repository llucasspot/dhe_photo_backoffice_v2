import { LayerNode } from '../canvas.service';

import { CanvasHandler } from './canvas.handler';

export class GridSnapHandler implements CanvasHandler {
  gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
  }

  handler = (positions: LayerNode) =>
    LayerNode.build({
      ...positions,
      x: Math.round(positions.x / this.gridSize) * this.gridSize,
      y: Math.round(positions.y / this.gridSize) * this.gridSize,
    });
}
