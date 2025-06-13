import { createContext, ReactNode } from 'react';

export type ModalOpenOptions = {
  title: string;
  subtitle: string;
};

type ModalContextType = {
  open: (children: ReactNode, options: ModalOpenOptions) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
