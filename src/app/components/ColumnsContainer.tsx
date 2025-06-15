export function ColumnsContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="flex items-start gap-v-gap-slide hover:outline hover:outline-gray-500/50 hover:outline-dashed h-full">
      {children}
    </div>
  )
}
