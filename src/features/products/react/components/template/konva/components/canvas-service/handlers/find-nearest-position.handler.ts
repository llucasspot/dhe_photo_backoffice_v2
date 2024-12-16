import { LayerNode } from '../canvas.service';

import { CanvasHandler } from './canvas.handler';

import { LayerConfig } from '#features/products/react';

export class FindNearestPositionHandler implements CanvasHandler {
  private layers: LayerConfig[];

  constructor(layers: LayerConfig[]) {
    this.layers = layers;
  }

  handler = (layerNode: LayerNode) => {
    const otherLayers = this.layers.filter((l) => l.id !== layerNode.id);

    let finalX: number | null = null;
    let finalY: number | null = null;

    otherLayers.forEach((otherLayer) => {
      // Check horizontal overlap
      const horizontalOverlap =
        layerNode.x < otherLayer.frontX + otherLayer.frontWidth &&
        layerNode.x + layerNode.width > otherLayer.frontX;
      // Check vertical overlap
      const verticalOverlap =
        layerNode.y < otherLayer.frontY + otherLayer.frontHeight &&
        layerNode.y + layerNode.height > otherLayer.frontY;

      if (horizontalOverlap && verticalOverlap) {
        // Calculate distances to each edge of the other layer
        const distToRight = Math.abs(
          otherLayer.frontX + otherLayer.frontWidth - layerNode.x,
        );
        const distToLeft = Math.abs(
          layerNode.x + layerNode.width - otherLayer.frontX,
        );
        const distToBottom = Math.abs(
          otherLayer.frontY + otherLayer.frontHeight - layerNode.y,
        );
        const distToTop = Math.abs(
          layerNode.y + layerNode.height - otherLayer.frontY,
        );

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
          finalX = otherLayer.frontX - layerNode.width;
        } else if (minDist === distToBottom) {
          finalY = otherLayer.frontY + otherLayer.frontHeight;
        } else if (minDist === distToTop) {
          finalY = otherLayer.frontY - layerNode.height;
        }
      }
    });

    if (finalX !== null && finalY !== null) {
      return LayerNode.build({ ...layerNode, x: finalX, y: finalY });
    }
    return layerNode;
  };
}
