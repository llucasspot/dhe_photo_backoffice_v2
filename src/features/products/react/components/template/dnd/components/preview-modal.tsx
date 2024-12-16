import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { LayerConfig } from '../../types';

import { CanvasConfig } from '#features/products/react';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  canvas: CanvasConfig;
  layers: LayerConfig[];
  previewImage: string;
};

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  canvas,
  layers,
  previewImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Template Preview</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div
            className="relative mx-auto"
            style={{
              height: `${canvas.frontHeight}px`,
              width: `${canvas.frontWidth}px`,
              backgroundColor: '#f3f4f6',
            }}
          >
            {layers.map((layer) => (
              <div
                key={layer.id}
                className="absolute border-2 border-blue-500 overflow-hidden"
                style={{
                  height: `${layer.frontHeight}px`,
                  width: `${layer.frontWidth}px`,
                  left: `${layer.frontX}px`,
                  top: `${layer.frontY}px`,
                }}
              >
                <img
                  src={previewImage}
                  alt={`Layer ${layer.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
