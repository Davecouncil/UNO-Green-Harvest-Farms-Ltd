export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "rounded-full px-6 py-2.5 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#dcb458] hover:bg-[#c9a24d] text-black",
    secondary: "bg-[#2D7A0F] hover:bg-[#25650d] text-white",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-50",
    success: "bg-green-600 hover:bg-green-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}