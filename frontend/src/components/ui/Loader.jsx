/**
 * Loader Component
 * @param {number} size
 */
export default function Loader({ size = 50 }) {
  return (
    <div className="flex justify-center items-center">
      <span
        style={{ fontSize : size }}
        className="
        material-symbols-outlined
        text-pink-200
        animate-pulse
        transition duration-150 ease-in-out
        dark:brightness-50
        ">
          local_florist
        </span>
        <p className="text-pink-200 font-prompt animate-pulse transition duration-150 ease-in-out dark:brightness-50" style={{ fontSize : size/2 }}>Loading...</p>

    </div>
  );
}