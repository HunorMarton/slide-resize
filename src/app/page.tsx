import { Slide } from './components/Slide'
import { slides } from './lib/data'

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
