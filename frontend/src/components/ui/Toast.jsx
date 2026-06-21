/**
 * Global Toast Function (self-rendering)
 * Usage: showToast("Message", "success")
 */
export function showToast(message, type = "info") {
  const toast = document.createElement("div");

  const colors = {
    success: "bg-green-600/80",
    error: "bg-red-500/80",
    info: "bg-blue-500/80",
  };

  toast.className = `
    fixed top-20 right-10
    ${colors[type]}
    text-white px-4 py-2 rounded-xl
    backdrop-blur-md shadow-lg font-prompt
    animate-slideDown z-50
    text-2xl
  `;

  toast.innerText = message;

  document.body.appendChild(toast);

  // remove after 3s
  setTimeout(() => {
    toast.classList.add("opacity-0", "transition", "duration-300");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}