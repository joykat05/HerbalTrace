/**
 * Button Component
 * @param {string} label
 * @param {function} onClick
 * @param {boolean} disabled
 */
export default function Button({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        font-prompt
        border-2 border-white
        px-4 py-2
        rounded-lg
        text-lg
        text-white
        bg-green-500/60
        backdrop-blur-md
        transition duration-300 ease-out
        hover:bg-white hover:text-green-400 hover:scale-110
        disabled:opacity-50
      "
    >
      {label}
    </button>
  );
}