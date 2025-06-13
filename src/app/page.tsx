import { Slide as Slide1 } from './components/Slide1'
import { Slide as Slide2 } from './components/Slide2'
import { Slide as Slide3 } from './components/Slide3'
import { slides } from './lib/data'

export default function Home() {
  return (
    <div>
      <main>
        {slides.map((slide) => (
          <div key={slide.id}>
            <Slide1 slide={slide} />
            <Slide2 slide={slide} />
            <Slide3 slide={slide} />
          </div>
        ))}
      </main>
    </div>
  )
}
