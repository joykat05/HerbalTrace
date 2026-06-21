/**
 * Modal Component
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {React.ReactNode} children
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="
      fixed inset-0
      bg-black/40
      flex items-center justify-center
      z-50
    ">
      <div className="
        bg-green-400/30
        backdrop-blur-lg
        p-6
        rounded-2xl
        text-white
        w-[90%] max-w-md
        shadow-xl
        animate-fadeIn
      ">
        {children}

        <button
          onClick={onClose}
          className="
            mt-4
            border border-white
            px-3 py-1
            rounded-lg
            hover:bg-white hover:text-green-400
            transition
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}