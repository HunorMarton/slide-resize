import { Slide } from './components/Slide'
import { slides } from './lib/data2'

export default function Home() {
  console.log('render page', slides.length)
  return (
    <div>
      <main className="m-5">
        {slides.map((slide) => (
          <div key={slide.id}>
            <Slide slide={slide} />
          </div>
        ))}
      </main>
    </div>
  )
}
