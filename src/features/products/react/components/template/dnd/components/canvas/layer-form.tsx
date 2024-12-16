import React, { useState } from 'react';

import { NewLayerDimensions } from '#features/products/react';

type LayerFormProps = {
  onAddLayer: (dimensions: NewLayerDimensions) => void;
};

export const LayerForm: React.FC<LayerFormProps> = ({ onAddLayer }) => {
  const [dimensions, setDimensions] = useState<NewLayerDimensions>({
    height: 100,
    width: 100,
  });
  const [useConstraints, setUseConstraints] = useState(false);
  const [constraints, setConstraints] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });

  const handleSubmit = () => {
    onAddLayer({
      ...dimensions,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Layer Width (px)
          </label>
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) =>
              setDimensions({
                ...dimensions,
                width: parseInt(e.target.value) || 0,
              })
            }
            min="50"
            max="500"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Layer Height (px)
          </label>
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) =>
              setDimensions({
                ...dimensions,
                height: parseInt(e.target.value) || 0,
              })
            }
            min="50"
            max="500"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="useConstraints"
            checked={useConstraints}
            onChange={(e) => setUseConstraints(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="useConstraints"
            className="ml-2 block text-sm text-gray-900"
          >
            Add Movement Constraints
          </label>
        </div>

        {useConstraints && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Min X
                </label>
                <input
                  type="number"
                  value={constraints.minX}
                  onChange={(e) =>
                    setConstraints({
                      ...constraints,
                      minX: parseInt(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Max X
                </label>
                <input
                  type="number"
                  value={constraints.maxX}
                  onChange={(e) =>
                    setConstraints({
                      ...constraints,
                      maxX: parseInt(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Min Y
                </label>
                <input
                  type="number"
                  value={constraints.minY}
                  onChange={(e) =>
                    setConstraints({
                      ...constraints,
                      minY: parseInt(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Max Y
                </label>
                <input
                  type="number"
                  value={constraints.maxY}
                  onChange={(e) =>
                    setConstraints({
                      ...constraints,
                      maxY: parseInt(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Layer
      </div>
    </div>
  );
};
