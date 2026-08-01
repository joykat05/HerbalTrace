const ICONS = {
  success: "check_circle",
  error: "error",
  info: "info",
  warning: "warning",
};

const COLORS = {
  success: "bg-green-600/90 border-green-400/30",
  error: "bg-red-500/90 border-red-400/30",
  info: "bg-blue-500/90 border-blue-400/30",
  warning: "bg-amber-500/90 border-amber-400/30",
};

let activeToasts = 0;

/**
 * Global Toast Function (self-rendering)
 * Usage: showToast("Message", "warning")
 */
export function showToast(message, type = "info", duration = 4000) {
  const toast = document.createElement("div");
  const offset = 80 + activeToasts * 64; // stack multiple toasts
  activeToasts++;

  toast.className = `
    fixed right-10
    ${COLORS[type]}
    text-white px-4 py-3 rounded-xl
    backdrop-blur-md shadow-lg font-prompt border
    animate-slideDown z-50
    flex items-center gap-2
    text-lg
  `;
  toast.style.top = `${offset}px`;

  const icon = document.createElement("span");
  icon.className = "material-symbols-outlined";
  icon.innerText = ICONS[type] || ICONS.info;

  const text = document.createElement("span");
  text.innerText = message; // innerText, not innerHTML — safe from injected batch/plant names

  toast.appendChild(icon);
  toast.appendChild(text);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "transition", "duration-300");
    setTimeout(() => {
      toast.remove();
      activeToasts--;
    }, 300);
  }, duration);
}