export function SlideContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="@container relative aspect-video my-4">
      <div className="flex flex-col p-padding-slide gap-h-gap-slide h-full bg-white rounded-[2cqw] shadow-lg">
        {children}
      </div>
    </div>
  )
}
