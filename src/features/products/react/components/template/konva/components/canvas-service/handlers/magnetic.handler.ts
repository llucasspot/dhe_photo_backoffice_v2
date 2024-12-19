import { LayerNode } from '../canvas.service';

import { CanvasHandler } from './canvas.handler';

export class MagneticHandler implements CanvasHandler {
  private magnetStrength: number;

  constructor(magnetStrength: number) {
    this.magnetStrength = magnetStrength;
  }

  handler = (positions: LayerNode) => {
    // Snap to horizontal or vertical alignments with other layers
    // when within magnetStrength pixels
    // Implementation depends on your needs
    return LayerNode.build(positions);
  };

  log() {
    console.log('MagneticHandler : ', this.magnetStrength);
  }
}
