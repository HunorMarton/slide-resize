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
                  `Yes, I know it wasn't a coding challenge, but the good news is that this demo doesn't actually solve the problem`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '00-1',
    title: 'because',
    columns: [
      {
        id: '00-1-1',
        type: 'A',
        components: [
          {
            id: '00-1-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '00-1-1-1-1',
                type: 'text',
                paragraphs: [
                  'the original challenge required component level consistency across columns',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '00-1-2',
        type: 'A',
        components: [
          {
            id: '00-1-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '00-1-2-1-1',
                type: 'text',
                paragraphs: [
                  'and what this demo is capable of doing is column type consistency',
                ],
              },
            ],
          },
        ],
      },
      {
        id: '00-1-3',
        type: 'B',
        components: [
          {
            id: '00-1-3-1',
            type: 'text-block',
            blocks: [
              {
                id: '00-1-3-1-1',
                type: 'header',
                content: `here we go`,
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
                  `How do people expect it to behave?`,
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
    id: '02-1',
    title: 'Space optimization algorithms',
    columns: [
      {
        id: '02-1-1',
        type: 'A',
        components: [
          {
            id: '02-1-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-1-1-1-1',
                type: 'header',
                content: 'Heuristics-based approaches',
              },
              {
                id: '02-1-1-1-2',
                type: 'list',
                items: [
                  `Iterative processes that follow certain patterns that might not result in the optimal solution.`,
                  `Fast, easy to implement, and can be used to get a good enough solution.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-1-2',
        type: 'A',
        components: [
          {
            id: '02-1-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-1-2-1-1',
                type: 'header',
                content: 'Constraint satisfaction problem',
              },
              {
                id: '02-1-2-1-2',
                type: 'list',
                items: [
                  `Frames the problem in a more mathematical way. Can deal with large amount of constraints.`,
                  `cassowary.js is a library that could be used to solve the problem.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-1-3',
        type: 'A',
        components: [
          {
            id: '02-1-3-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-1-3-1-1',
                type: 'header',
                content: 'Linear Programming',
              },
              {
                id: '02-1-3-1-2',
                type: 'list',
                items: [
                  `If the constraints could be expressed as a linear equation, it could be solved with linear programming.`,
                  `Font size changes can't be described as a linear equation, therefore it could only used for approximations.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-1-4',
        type: 'A',
        components: [
          {
            id: '02-1-4-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-1-4-1-1',
                type: 'header',
                content: 'Evolutionary Algorithms',
              },
              {
                id: '02-1-4-1-2',
                type: 'list',
                items: [
                  `Evolutionary algorithms are a type of optimization algorithm that is inspired by the process of natural selection.`,
                  `Can handle complex, non-linear constraints and explore a vast solution space.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '02-2',
    title: 'Heuristics-based approaches',
    columns: [
      {
        id: '02-2-0',
        type: 'A',
        components: [
          {
            id: '02-2-0-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-2-0-1-1',
                type: 'text',
                paragraphs: [
                  `An iterative process that has the following steps.`,
                  `First, we change one or more variables.`,
                  `We check if the constraints are satisfied.`,
                  `If they are, we measure how good the solution is with some score function.`,
                  `We keep on iterating until we reach a score that is good enough.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-2-1',
        type: 'B',
        components: [
          {
            id: '02-2-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-2-1-1-1',
                type: 'header',
                content: 'The variables and constraints',
              },
              {
                id: '02-2-1-1-2',
                type: 'list',
                label: 'Variables',
                items: [
                  `Each component has a base font size (other sizing parameters are derived from it).`,
                  `Each column has a width, however they might be tightly coupled to other columns.`,
                ],
              },
              {
                id: '02-2-1-1-3',
                type: 'list',
                label: 'Constraints',
                items: [
                  `Components in different columns make the columns having the same width.`,
                  `Content should not overflow the columns.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-2-2',
        type: 'B',
        components: [
          {
            id: '02-2-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-2-2-1-1',
                type: 'header',
                content: 'The problem',
              },
              {
                id: '02-2-2-1-2',
                type: 'list',
                items: [
                  `If the solution space is large with multiple dimensions it's not obvious how to navigate it.`,
                  `Should we change the font size of a component or the width of a column? Which component or column should we change?`,
                  `Do constraints have weights or different priorities?`,
                  `Reducing the solution space by simplifying the options or the granularity of the options is a good way to make the problem easier to solve.`,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '02-3',
    title: 'Solution to a simplified problem',
    columns: [
      {
        id: '02-3-1',
        type: 'A',
        components: [
          {
            id: '02-3-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-3-1-1-1',
                type: 'text',
                paragraphs: [
                  `This demo simplifies the problem by simplifying the solution space.`,
                  `In this demo consistency is only required between columns of the same type.`,
                  `If we only use one component in each column, then both approaches should reach the same result.`,
                ],
              },
            ],
          },
        ],
      },
      {
        id: '02-3-2',
        type: 'B',
        components: [
          {
            id: '02-3-2-1',
            type: 'text-block',
            blocks: [
              {
                id: '02-3-2-1-1',
                type: 'list',
                label: 'Steps this algorithm follows:',
                items: [
                  `Start with maximum font size in each column and equal column widths.`,
                  `Decrease font size in each column until the content fits into the column.`,
                  `If multiple columns use the same column type then use the smallest font size.`,
                  `Calculate a score based on the fill percentage of the columns.`,
                  `Pick the tallest column and increase its width.`,
                  `Repeat until the score is not any better than the previous one or the maximum number of iterations is reached.`,
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
    title: 'React implementation',
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
                id: '06-2-1-0',
                type: 'header',
                content: 'Slide component',
              },
              {
                id: '06-2-1-0-1',
                type: 'text',
                paragraphs: [
                  `If the arrangement is not yet final, it renders the intermediate columns off screen for measurements with the SlideFitter component.`,
                  `Renders the final columns once the measurements are done.`,
                ],
              },
              {
                id: '06-2-1-1',
                type: 'header',
                content: 'SlideFitter Component',
              },
              {
                id: '06-2-1-2',
                type: 'text',
                paragraphs: [
                  `Uses forwardRefs to gather the refs of each column and uses them to manipulate the CSS variables on them and calculate the size of each column.`,
                  `Iteratively calculates the maximum font size for each column, while satisfying the constraints.`,
                  `Once the measurements are done, updates the store with the new values.`,
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
                content: 'Column component',
              },
              {
                id: '06-3-1-2',
                type: 'text',
                paragraphs: [
                  `The column component sets the initial value of the --font-size CSS variable for its children and uses the flex grow property to size the components.`,
                  `It passes it's ref to the SlideFitter component so that it can manipulate the CSS variable.`,
                ],
              },
              {
                id: '06-3-1-3',
                type: 'header',
                content: 'Other display components',
              },
              {
                id: '06-3-1-4',
                type: 'text',
                paragraphs: [
                  `Components fill the available space vertically and size themselves based on the CSS variables provided by their column.`,
                  `Using CSS variables is a powerful way to avoid re-rendering the components.`,
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
                  `This is a significant performance boost, and enables us to use imperative code.`,
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
                  `This way it's enough to change the CSS variables on the slide or column level and the style of the components will be updated automatically.`,
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
                  `Gather refs to each column and manipulate them in a useEffect hook in an imperative way.`,
                  `Using the same code to render and for measurements makes it easier to maintain.`,
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
    id: '15',
    title: 'Optimization possibilities',
    columns: [
      {
        id: '15-1',
        type: 'A',
        components: [
          {
            id: '15-1-1',
            type: 'text-block',
            blocks: [
              {
                id: '15-1-1-1',
                type: 'list',
                items: [
                  `Using binary search for scaling instead of gradual scaling.`,
                  `Using predefined variants to reduce the problem space.`,
                  `Prioritize calculations on visible content only, in case the content is streaming do it as early as possible.`,
                  `Use approximation as a starting point for the algorithm.`,
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
