import { ReactNode, useState } from 'react';

import { AbsoluteModal } from '../absolute-modal';

import { ModalContext, ModalOpenOptions } from './modal.context';

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<{
    children: ReactNode;
    options: ModalOpenOptions;
  } | null>(null);

  const close = () => {
    setModalProps(null);
  };
  const open = (children: ReactNode, options: ModalOpenOptions) => {
    setModalProps({ children, options });
  };

  return (
    <ModalContext value={{ close, open }}>
      {children}
      <AbsoluteModal options={modalProps?.options}>
        {modalProps?.children}
      </AbsoluteModal>
    </ModalContext>
  );
}
