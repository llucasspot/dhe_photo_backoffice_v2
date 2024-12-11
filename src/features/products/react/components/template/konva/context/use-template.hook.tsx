import { useContext } from 'react';

import { TemplateContext } from './template.context.ts';

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}
