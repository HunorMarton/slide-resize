export function Offscreen({
  children,
  width,
}: {
  children: React.ReactNode
  width: number
}) {
  return (
    <div
      className="absolute -top-1000 -left-1000 invisible pointer-events-none whitespace-normal"
      style={{ width: width }}
    >
      {children}
    </div>
  )
}
