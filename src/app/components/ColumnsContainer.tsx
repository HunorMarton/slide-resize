export function ColumnsContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return <div className="flex items-start gap-v-gap-slide">{children}</div>
}
