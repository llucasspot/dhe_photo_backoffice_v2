import { LayerNode } from '../canvas.service';

import { CanvasHandler } from './canvas.handler';

import { LayerConfig } from '#features/products/react';

export class FindNearestPositionHandler implements CanvasHandler {
  private layers: LayerConfig[];
  private layer: LayerConfig;

  constructor(layers: LayerConfig[], layer: LayerConfig) {
    this.layers = layers;
    this.layer = layer;
  }

  handler = (layerNode: LayerNode) => {
    const { x, y } = layerNode;

    const layer = this.layer;

    const otherLayers = this.layers.filter((l) => l.id !== layer.id);
    let finalX = x;
    let finalY = y;

    otherLayers.forEach((otherLayer) => {
      // Check horizontal overlap
      const horizontalOverlap =
        x < otherLayer.frontX + otherLayer.frontWidth &&
        x + layer.frontWidth > otherLayer.frontX;
      // Check vertical overlap
      const verticalOverlap =
        y < otherLayer.frontY + otherLayer.frontHeight &&
        y + layer.frontHeight > otherLayer.frontY;

      if (horizontalOverlap && verticalOverlap) {
        // Calculate distances to each edge of the other layer
        const distToRight = Math.abs(
          otherLayer.frontX + otherLayer.frontWidth - x,
        );
        const distToLeft = Math.abs(x + layer.frontWidth - otherLayer.frontX);
        const distToBottom = Math.abs(
          otherLayer.frontY + otherLayer.frontHeight - y,
        );
        const distToTop = Math.abs(y + layer.frontHeight - otherLayer.frontY);

        // Find the smallest distance
        const minDist = Math.min(
          distToRight,
          distToLeft,
          distToBottom,
          distToTop,
        );

        // Snap to the nearest edge
        if (minDist === distToRight) {
          finalX = otherLayer.frontX + otherLayer.frontWidth;
        } else if (minDist === distToLeft) {
          finalX = otherLayer.frontX - layer.frontWidth;
        } else if (minDist === distToBottom) {
          finalY = otherLayer.frontY + otherLayer.frontHeight;
        } else if (minDist === distToTop) {
          finalY = otherLayer.frontY - layer.frontHeight;
        }
      }
    });

    return LayerNode.build({ ...layerNode, x: finalX, y: finalY });
  };
}
