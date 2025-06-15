export function SlideContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="@container aspect-video overflow-y-hidden my-4">
      <div className="flex flex-col p-[4cqw] gap-[3cqw] h-full bg-white rounded-[2cqw] shadow-lg">
        {children}
      </div>
    </div>
  )
}
