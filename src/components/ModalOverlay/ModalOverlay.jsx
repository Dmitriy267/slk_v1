import './ModalOverlay.sass';

export const ModalOverlay = ({ closePopup, children }) => {
  return (
    <div tabIndex={-1} className="modal__overlay_visible" onClick={() => closePopup()}>
      {children}
    </div>
  );
};
