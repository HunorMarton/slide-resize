import { SlideData } from '../types'

export const slides: SlideData[] = [
  {
    id: '00',
    title: 'Intro',
    columns: [
      {
        id: '00-1',
        type: 'A',
        components: [
          {
            id: '00-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '00-1-1-1',
                type: 'header',
                content: 'Hi Riccardo',
              },
              {
                id: '00-1-1-2',
                type: 'text',
                paragraphs: [
                  'This text is not getting bigger, because it uses the maximum font size.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '01',
    title: 'Requirements',
    columns: [
      {
        id: '01-1',
        type: 'A',
        components: [
          {
            id: '01-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '01-1-1-1',
                type: 'header',
                content: 'Requirements',
              },
              {
                id: '01-1-1-2',
                type: 'list',
                items: [
                  'Render slides where the content is organized in columns and each column has different components',
                  'Maximize the size of the components in each slide by adjusting font sizes and column widths',
                  'Components should have a consistent size and font size within a slide',
                  'Some components (e.g. headers) are consistent across slides',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '01-2',
        type: 'A',
        components: [
          {
            id: '01-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '01-2-1-1',
                type: 'header',
                content: 'Other considerations',
              },
              {
                id: '01-2-1-2',
                type: 'list',
                items: [
                  'Should be flexible enough to handle different content types',
                  'Slides should be resizable in a way that components keep their relative size',
                  `Should be reasonably fast with many components`,
                  'Use React',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '01-3',
        type: 'A',
        components: [
          {
            id: '01-3-1',
            type: 'text-block',
            blocks: [
              {
                id: '01-3-1-1',
                type: 'header',
                content: 'Possible future requirements',
              },
              {
                id: '01-3-1-2',
                type: 'list',
                items: [
                  'Edit the slide with drag and drop',
                  'Morph component size on content change',
                  'Visual hierarchy should be preserved. Column headers should not be larger than the page header',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '02',
    title: 'Understanding the problem',
    columns: [
      {
        id: '02-0',
        type: 'A',
        components: [
          {
            id: '02-0-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-0-1-1',
                type: 'header',
                content: 'Minimum viable product',
              },
              {
                id: '02-0-1-2',
                type: 'list',
                label: 'What is the MVP?',
                items: [
                  'What is the minimum set of components and what variables they have that we can adjust to solve the problem?',
                  'What are the performance expectations?',
                  'How do people expect it to behave?',
                ],
              },
              {
                id: '02-0-1-3',
                type: 'list',
                label: 'Simplifications',
                items: [
                  'The layout is given, we do not reorder or restructure it to optimize space even more',
                  'Focusing on columns only, taking the header size as a given',
                  'Browser compatibility is not a priority',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-1',
        type: 'A',
        components: [
          {
            id: '02-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-1-1-1',
                type: 'header',
                content: 'Understanding component types and constraints',
              },
              {
                id: '02-1-1-2',
                type: 'list',
                label: 'Components',
                items: [
                  `Some components are fluid in a way that decreasing their width increases their height (e.g. text)`,
                  `Some components use fixed aspect ratio and work the opposite way (e.g. images)`,
                ],
              },
              {
                id: '02-1-1-3',
                type: 'list',
                label: 'Constraints',
                items: [
                  'min/max font size, min/max column width, min/max line length',
                  'Is visual hierarchy a priority? E.g. should the page header use bigger font size than the column headers? Should we penalize drastically imbalanced font sizes?',
                  `What does 'the same type of components should have the same size' mean? Should they use the same font size, should they use the same width or should they use the same height as well?`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '02---',
    title: 'Slide deck implementation approaches',
    columns: [
      {
        id: '02-0',
        type: 'A',
        components: [
          {
            id: '02-0-1',
            type: 'table',
            blocks: [
              {
                id: '02-0-1-1',
                type: 'table',
                headers: ['', 'HTML', 'SVG', 'Canvas'],
                rows: [
                  {
                    id: '02-0-1-1-1',
                    cells: ['Plays well with React', 'Yes', 'Yes', 'No'],
                  },
                  {
                    id: '02-0-1-1-2',
                    cells: ['Wraps text', 'Yes', 'No', 'No'],
                  },
                  {
                    id: '02-0-1-1-3',
                    cells: ['Performance', 'Fast', 'Fast', 'Very fast'],
                  },
                  {
                    id: '02-0-1-1-4',
                    cells: [
                      'Other',
                      'Contenteditable only works with HTML elements',
                      'Uses absolute positioning and relative sizing out of the box.',
                      'Hard to implement',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '03',
    title: 'Server vs client side fitting',
    columns: [
      {
        id: '03-0',
        type: 'A',
        components: [
          {
            id: '03-0-1',
            type: 'text-block',
            blocks: [
              {
                id: '03-0-1-1',
                type: 'text',
                paragraphs: [
                  'As an expensive calculation, it would be ideal to fit content on the server side.',
                  'However given the unpredictable nature of text rendering, the best approach is to do it in the browser.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '03-1',
        type: 'B',
        components: [
          {
            id: '03-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '03-1-1-1',
                type: 'header',
                content: 'Server side',
              },
              {
                id: '03-1-1-2',
                type: 'list',
                label: 'Possible approaches',
                items: [
                  'Approximation based on character count and font heuristics can give a starting point, but it will be inaccurate',
                  'Headless browser like Puppeteer can be used to render the content but it is expensive',
                  `There might be font rendering engines that can be used on the server side, but it's still not guaranteed to match the browser's rendering`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '04',
    title: 'Declarative vs imperative',
    columns: [
      {
        id: '04-1',
        type: 'A',
        components: [
          {
            id: '04-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '04-1-1-1',
                type: 'text',
                paragraphs: [
                  `It's easier to think of the space optimization problem in an imperative manner.`,
                  `However, React's behavior is rather declarative.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '04-2',
        type: 'B',
        components: [
          {
            id: '04-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '04-2-1-1',
                type: 'header',
                content: 'Recreating the components with vanilla JS',
              },
              {
                id: '04-2-1-2',
                type: 'text',
                paragraphs: [
                  `We can use vanilla JS to recreate the components and do the calculations in a declarative manner.`,
                  `This solution is fast, rather straightforward and isolated from the React logic.`,
                  `However, recreating the components that already exist is rather cumbersome and will result in inaccuracies if the components are not in sync.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '04-3',
        type: 'B',
        components: [
          {
            id: '04-3-1',
            type: 'text-block',
            blocks: [
              {
                id: '04-3-1-1',
                type: 'header',
                content: `Render the components in isolation with React DOM`,
              },
              {
                id: '04-3-1-2',
                type: 'text',
                paragraphs: [
                  `We can use React DOM to render the components in a declarative manner.`,
                  `In this solution, we can avoid inconsistencies by reusing the same components that are used to display content in the slides.`,
                  `However, this solution is about 10x slower than the other solutions.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '04-4',
        type: 'B',
        components: [
          {
            id: '04-4-1',
            type: 'text-block',
            blocks: [
              {
                id: '04-4-1-1',
                type: 'header',
                content: `Render the components as part of the normal React cycles`,
              },
              {
                id: '04-4-1-2',
                type: 'text',
                paragraphs: [
                  `This is the solution we are currently using.`,
                  `It's the most complex solution, but it is performant enough, and using the same code to render and for measurements makes it easier to maintain.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '05',
    title: 'Avoid re-rendering React components',
    columns: [
      {
        id: '05-1',
        type: 'A',
        components: [
          {
            id: '05-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '05-1-1-1',
                type: 'header',
                content: 'Use refs and manipulate the DOM directly',
              },
              {
                id: '05-1-1-2',
                type: 'text',
                paragraphs: [
                  `We can use refs and manipulate the DOM directly to avoid re-rendering the components.`,
                  `Separate store logic into reactive and non-reactive parts for clarity.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '05-2',
        type: 'A',
        components: [
          {
            id: '05-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '05-2-1-1',
                type: 'header',
                content: 'Leverage CSS capabilities to change the components',
              },
              {
                id: '05-2-1-2',
                type: 'text',
                paragraphs: [
                  `Instead of passing on size and font variables as props (or in context) to the components, we can drive the style of the components with CSS.`,
                  `This way it's enough to change the CSS variables on the column level and the style of the components will be updated automatically.`,
                  `While it's not related to re-rendering, but using flex grow to change the size of the components also simplifies the logic.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '06',
    title: 'Behavior of the components',
    columns: [
      {
        id: '06-1',
        type: 'A',
        components: [
          {
            id: '06-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '06-1-1-1',
                type: 'header',
                content: 'Store',
              },
              {
                id: '06-1-1-2',
                type: 'text',
                paragraphs: [
                  `The store keeps track of the exact sizes, grow factor and font size of each column. For consistency it keeps track of font sizes and the grow factor per column type and the exact sizes per individual column.`,
                  `Once it gathered every measurement it calculates a score value based on the fill percentage of the columns. Then it generates a new version, picks the tallest column and increases the width of the column type. This will trigger the columns to re-calculate themselves.`,
                  `This process is repeated until the new score is not any better than the previous one or the maximum number of iterations is reached.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '06-2',
        type: 'A',
        components: [
          {
            id: '06-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '06-2-1-1',
                type: 'header',
                content: 'Slide component',
              },
              {
                id: '06-2-1-2',
                type: 'text',
                paragraphs: [
                  `The slide component is relatively simple. It renders the final columns once the measurements are done or a loading screen.`,
                  `In case the measurements are not done yet, it uses the column fitter components to do the calculations offscreen.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '06-3',
        type: 'A',
        components: [
          {
            id: '06-3-1',
            type: 'text-block',
            blocks: [
              {
                id: '06-3-1-1',
                type: 'header',
                content: 'Column fitter component',
              },
              {
                id: '06-3-1-2',
                type: 'text',
                paragraphs: [
                  `The column fitter component is responsible for the measurements of the columns. It get's the reference of the underlying DOM element and iteratively decreases the font size until the content fits in the available space.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '1',
    title: 'Slide 1',
    columns: [
      {
        id: '1',
        type: 'A',
        components: [
          {
            id: '1-1',
            type: 'text-block',
            blocks: [
              {
                id: '1-1-1',
                type: 'header',
                content: 'Jeffsum.',
              },
              {
                id: '1-1-2',
                type: 'text',
                paragraphs: [
                  `I gave it a cold? I gave it a virus. A computer virus. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Do you have any idea how long it takes those cups to decompose.`,
                  `Must go faster... go, go, go, go, go! They're using our own satellites against us. And the clock is ticking. Remind me to thank John for a lovely weekend. Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`,
                  `What do they got in there? King Kong? Just my luck, no ice. What do they got in there? King Kong? Hey, take a look at the earthlings. Goodbye! I gave it a cold? I gave it a virus. A computer virus. They're using our own satellites against us. And the clock is ticking.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '2',
        type: 'A',
        components: [
          {
            id: '2-1',
            type: 'text-block',
            blocks: [
              {
                id: '2-1-1',
                type: 'header',
                content:
                  'A little text placeholder generator of Jeff Goldblum awesomeness.',
              },
              {
                id: '2-1-2',
                type: 'text',
                paragraphs: [
                  `Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Checkmate... Hey, you know how I'm, like, always trying to save the planet? Here's my chance. Hey, take a look at the earthlings. Goodbye! Must go faster... go, go, go, go, go! This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows.`,
                  `Yes, Yes, without the oops! Do you have any idea how long it takes those cups to decompose. Life finds a way. You know what? It is beets. I've crashed into a beet truck. Hey, you know how I'm, like, always trying to save the planet? Here's my chance.`,
                  `They're using our own satellites against us. And the clock is ticking. You really think you can fly that thing? I was part of something special. Checkmate... My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!`,
                  `Do you have any idea how long it takes those cups to decompose. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine? My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '3',
        type: 'B',
        components: [
          {
            id: '3-1',
            type: 'text-block',
            blocks: [
              {
                id: '3-1-1',
                type: 'header',
                content: 'Very big text',
              },
            ],
          },
        ],
      },
    ],
  },
]
