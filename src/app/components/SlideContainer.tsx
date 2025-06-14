export function SlideContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="@container aspect-video overflow-y-hidden my-4">
      <div className="flex items-start p-[2cqw] gap-[2cqw] h-full bg-white rounded-[2cqw]">
        {children}
      </div>
    </div>
  )
}
