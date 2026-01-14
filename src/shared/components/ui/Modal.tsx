import './index.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Contenedor del modal */}
      <div
        className={`relative w-full ${sizes[size]} animate-scaleIn rounded-lg bg-white shadow-lg max-h-[88vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 mx-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          {/* ÚNICA forma de cerrar */}
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-5">
          <div className="overflow-y-auto max-h-[70vh] pr-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
