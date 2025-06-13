import { Slide } from '../components/Slide1'
import { slides } from '../lib/data2'

export default function Home() {
  return (
    <div>
      <main>
        {slides.map((slide) => (
          <div key={slide.id}>
            <Slide slide={slide} />
          </div>
        ))}
      </main>
    </div>
  )
}
