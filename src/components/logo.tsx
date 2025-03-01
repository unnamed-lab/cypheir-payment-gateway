import Image from "next/image"

export function Logo({
  className = "",
  size = "default",
}: { className?: string; size?: "default" | "small" | "large" }) {
  const sizes = {
    small: { width: 24, height: 24 },
    default: { width: 32, height: 32 },
    large: { width: 48, height: 48 },
  }

  const { width, height } = sizes[size]

  return (
    <Image
      src="/logo-icon.png"
      alt="Cypheir Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

