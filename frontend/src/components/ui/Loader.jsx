/**
 * Loader Component
 * @param {number} size
 */
export default function Loader({ size = 40 }) {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ width: size, height: size }}
        className="
          border-4
          border-white/30
          border-t-green-400
          rounded-full
          animate-spin
        "
      />
    </div>
  );
}