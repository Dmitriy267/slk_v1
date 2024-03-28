import { useEffect } from 'react';
import './modal.sass';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal');

export const Modal = ({ closePopup, children }) => {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay closePopup={closePopup}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__heading">
          <div className="closeIconContainer"></div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
