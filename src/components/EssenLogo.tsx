const EssenLogo = ({ size = 32, variant = "color" }: { size?: number; variant?: "color" | "white" }) => {
  const purple = variant === "white" ? "#ffffff" : "#763df2";
  const teal = variant === "white" ? "rgba(255,255,255,0.7)" : "#38dcab";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back hexagon (teal) */}
      <path
        d="M65 20 L85 32 L85 56 L65 68 L45 56 L45 32 Z"
        fill={teal}
      />
      {/* Front hexagon (purple) */}
      <path
        d="M35 32 L55 20 L75 32 L75 56 L55 68 L35 56 Z"
        fill={purple}
        opacity={variant === "white" ? 1 : 0.95}
      />
      {/* Inner circle stroke */}
      <ellipse cx="52" cy="48" rx="14" ry="14" stroke={variant === "white" ? "#ffffff" : "#ffffff"} strokeWidth="2.5" fill="none" opacity="0.6" />
    </svg>
  );
};

export default EssenLogo;
