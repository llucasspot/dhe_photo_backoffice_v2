import { createContext, ReactNode } from 'react';

import { I18nKey } from '#i18n/domain';

export type ModalOpenOptions = {
  title: I18nKey;
  subtitle: I18nKey;
};

type ModalContextType = {
  open: (children: ReactNode, options: ModalOpenOptions) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
