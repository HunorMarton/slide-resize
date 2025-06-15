export function DebuggerValue({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center min-w-[5cqw]">
      <div className="text-[1.5cqw]">{value}</div>
      <div className="text-[1cqw]">{label}</div>
    </div>
  )
}
