import { Plus } from 'lucide-react';

import { useTemplate } from '../../context';
import { LayerConfig } from '../../types';

import { StateItemsController } from '#core/react';
import { useI18n } from '#i18n/react';

export function LayerPanel() {
  const { layers } = useTemplate();
  const { t } = useI18n();

  return (
    <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg border-l">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{t('products.template.layers.title')}</h3>
          <button
            type="button"
            onClick={() => {
              StateItemsController.add(layers, new LayerConfig());
            }}
            className="p-1.5 hover:bg-gray-100 rounded-md"
            title={t('products.template.layers.addLayer')}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="p-2 space-y-1">
        {StateItemsController.getAll(layers).map((layer, index) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            index={index}
            onDelete={() => StateItemsController.remove(layers, layer.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LayerItem({
  layer,
  index,
  onDelete,
}: {
  layer: LayerConfig;
  index: number;
  onDelete: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md group">
      <div className="flex-1">
        <div className="text-sm font-medium">
          {t('products.template.layers.layer')} {index + 1}
        </div>
        <div className="text-xs text-gray-500">
          {t('products.template.layers.dimensions.x')} : {layer.x}
        </div>
        <div className="text-xs text-gray-500">
          {t('products.template.layers.dimensions.y')} : {layer.y}
        </div>
        <div className="text-xs text-gray-500">
          {t('products.template.layers.dimensions.height')} : {layer.height}
        </div>
        <div className="text-xs text-gray-500">
          {t('products.template.layers.dimensions.width')} : {layer.width}
        </div>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
      >
        <span className="sr-only">{t('products.template.layers.delete')}</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
  );
}
