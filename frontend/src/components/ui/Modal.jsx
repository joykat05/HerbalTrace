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
      bg-black/60
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
        
        animate-fadeIn
        shadow-[0px_0px_24px_5px_rgba(90,181,100,1)]
      ">
        {children}
      </div>
    </div>
  );
}