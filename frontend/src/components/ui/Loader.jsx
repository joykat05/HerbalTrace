/**
 * Loader Component
 * @param {number} size - max icon size in px (scales down fluidly on smaller screens)
 */
export default function Loader({ size = 50 }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <span
        style={{ fontSize: `clamp(1.75rem, 6vw, ${size}px)` }}
        className="
        material-symbols-outlined
        text-pink-200
        animate-pulse
        transition duration-150 ease-in-out
        dark:brightness-50
        ">
          local_florist
        </span>
        <p
          style={{ fontSize: `clamp(0.85rem, 3vw, ${size / 2}px)` }}
          className="text-pink-200 font-prompt animate-pulse transition duration-150 ease-in-out dark:brightness-50">
          Loading...
        </p>
    </div>
  );
}