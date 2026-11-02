// Judging rubrics for the four challenges, from the Judging Rubrics sheets in Figma.
// Text wrapped in **double asterisks** is shown in bold.

export interface Rubric {
  id: string;
  title: string;
  subtitle: string;
  // Optional rule shown as a red strip under the header
  disclaimer?: string;
  context: { label: string; text: string }[];
  // One row per criterion; levels run from 4 (Excellent) down to 1 (Beginning)
  criteria: { title: string; question: string; levels: [string, string, string, string] }[];
  howToJudge: string[];
  bands: { range: string; label: string }[];
}

export const RUBRIC_LEVELS = ['4 · Excellent', '3 · Good', '2 · Developing', '1 · Beginning'];

const HACKATHON_BANDS = [
  { range: '22–24', label: 'Outstanding' },
  { range: '17–21', label: 'Strong' },
  { range: '12–16', label: 'Competent' },
  { range: '6–11', label: 'Needs Work' }
];

const MAKEATHON_BANDS = [
  { range: '18–20', label: 'Outstanding' },
  { range: '14–17', label: 'Strong' },
  { range: '10–13', label: 'Competent' },
  { range: '5–9', label: 'Needs Work' }
];

const howToJudge = (count: number, max: number, fourth: string) => [
  `Score each of the **${count} criteria from 1 to 4** using the descriptors above.`,
  'Pick the box that **best matches** what you saw. One level per row, don’t average.',
  `Add the ${count} scores. **Maximum is ${max}.** Use the grade bands to get the final grade.`,
  fourth,
  'Judge the **work shown**, not how confident the speaker is (except Presentation).'
];

const JUDGE_DIRECTION = 'Judge against the **direction the team chose**. No penalty for a direction they didn’t pick.';

export const RUBRICS: Rubric[] = [
  {
    id: 'junior-hackathon',
    title: 'Junior Hackathon',
    subtitle: 'Game Development · Scratch / Code.org',
    context: [
      {
        label: 'Statement of inquiry',
        text: '“Games are built on rules, and the same rules that make a game fun can also be used to teach a skill or change how a player thinks about something.”'
      },
      {
        label: 'Directions (judge against the one the team chose)',
        text: '**Fun** = design rules and challenges that make the game genuinely enjoyable. **Teach** = winning requires learning or practicing a real skill. **Shift** = the player experiences an issue and sees it differently.'
      }
    ],
    criteria: [
      {
        title: 'Rules & Game Design',
        question: 'Are the rules clear, fair and well built?',
        levels: [
          'Rules are clear, fair, and create real challenge. Player knows what to do without help.',
          'Rules are clear and mostly fair. Minor confusion.',
          'Rules exist but are confusing, unfair, or too easy or too hard.',
          'No clear rules or goal.'
        ]
      },
      {
        title: 'Direction Achieved',
        question: 'Does the game do what its chosen direction says?',
        levels: [
          'Direction is obvious and strong. **Fun:** very enjoyable. **Teach:** you must learn the skill to win. **Shift:** you truly feel the issue.',
          'Direction is clear and works, but could be stronger.',
          'Direction attempted but weak (e.g. a “teach” game you can win without learning).',
          'Direction is unclear or not present.'
        ]
      },
      {
        title: 'Playability & Challenge',
        question: 'Is it enjoyable and well balanced?',
        levels: [
          'Judges want to keep playing. Difficulty builds smoothly. Has levels, scoring or feedback.',
          'Fun to play with decent challenge. Some parts repetitive.',
          'Playable but boring, too easy, or too frustrating.',
          'Hard to play or finish.'
        ]
      },
      {
        title: 'Build Quality',
        question: 'Does it work? Effort and skill in Scratch / Code.org.',
        levels: [
          'Runs smoothly with no bugs. Good use of sprites, sounds, variables or logic.',
          'Works with 1-2 small bugs. Good effort.',
          'Several bugs or unfinished parts, but the main game runs.',
          'Does not run or is mostly incomplete.'
        ]
      },
      {
        title: 'Presentation & Explanation',
        question: 'Can the team explain their game?',
        levels: [
          'Clearly explains rules, chosen direction and design choices. Answers questions well.',
          'Explains the game well. Some questions unanswered.',
          'Explanation is short or unclear.',
          'Cannot explain the game.'
        ]
      },
      {
        title: 'AI Usage Policy',
        question: 'Did the team follow the AI do’s and don’ts?',
        levels: [
          'Follows all AI do’s and don’ts. Team made the game themselves.',
          'Follows the AI do’s and don’ts with one minor slip.',
          'Breaks some AI don’ts. Parts of the game rely on AI.',
          'Ignores the AI policy. AI made most of the game.'
        ]
      }
    ],
    howToJudge: howToJudge(6, 24, JUDGE_DIRECTION),
    bands: HACKATHON_BANDS
  },
  {
    id: 'junior-makeathon',
    title: 'Junior Makeathon',
    subtitle: 'Rube Goldberg Machine',
    context: [
      {
        label: 'Overarching IGNITE theme',
        text: '“Designers transform ideas into interactive systems that engage, challenge, and connect people.”'
      },
      {
        label: 'The challenge',
        text: 'Build a **Rube Goldberg machine** using any materials: a chain reaction where one step triggers the next to finish a simple task.'
      }
    ],
    criteria: [
      {
        title: 'Chain Reaction',
        question: 'Do the steps connect and run start to finish?',
        levels: [
          'Runs start to finish with every step triggering the next. Many different steps. Ends with a clear final task.',
          'Runs start to finish with 1 small stumble or manual nudge. Good number of steps.',
          'Runs part way. Several steps fail to trigger the next, or very few steps.',
          'Does not run, or steps are not connected.'
        ]
      },
      {
        title: 'Use of Materials',
        question: 'Are materials chosen smartly for their job?',
        levels: [
          'Every material is chosen for a clear reason and used in a clever way (e.g. a tube as a ramp). Team can explain each choice.',
          'Materials suit their job. Most choices make sense.',
          'Some materials work, others are a poor fit. Little thought to why each was used.',
          'Materials do not suit their job or no thought shown.'
        ]
      },
      {
        title: 'Creativity & Design',
        question: 'Original ideas and variety of steps.',
        levels: [
          'Original and fun to watch. Uses a variety of ideas (ramps, levers, pulleys, dominoes, rolling, falling, etc.).',
          'Some original steps. Decent variety.',
          'Mostly one type of step repeated, or copied from common examples.',
          'No creativity shown.'
        ]
      },
      {
        title: 'Build Quality & Reliability',
        question: 'Neat, sturdy and repeatable?',
        levels: [
          'Sturdy and neat. Runs the same way each time it is reset.',
          'Mostly sturdy. Works again after a small fix.',
          'Fragile or messy. Only works with lots of adjusting.',
          'Falls apart or cannot be reset.'
        ]
      },
      {
        title: 'Presentation & Explanation',
        question: 'Can the team explain how it works?',
        levels: [
          'Clearly explains each step, how energy passes from one to the next, and why they chose their materials. Answers questions well.',
          'Explains most steps well. Some questions unanswered.',
          'Explanation is short or unclear.',
          'Cannot explain the machine.'
        ]
      }
    ],
    howToJudge: howToJudge(5, 20, 'Watch the machine **run start to finish**. If possible, give the team a second attempt.'),
    bands: MAKEATHON_BANDS
  },
  {
    id: 'senior-hackathon',
    title: 'Senior Hackathon',
    subtitle: 'App Development',
    disclaimer: 'Block-based coding platforms (such as Scratch, Code.org, MIT App Inventor or Thunkable) cannot be used in the Senior Hackathon.',
    context: [
      {
        label: 'Statement of inquiry',
        text: '“An app can be built to solve a personal problem, connect a community, or make a system run more efficiently.”'
      },
      {
        label: 'Directions (judge against the one the team chose)',
        text: '**Yourself** = solve a personal productivity or life problem. **Others** = build for community or social connection. **Scale** = improve a process, business or institution.'
      }
    ],
    criteria: [
      {
        title: 'Problem & Target User',
        question: 'Real problem for a clear user?',
        levels: [
          'Specific, real problem with a clearly defined user. Evidence of need (survey, interviews, or personal experience explained).',
          'Clear problem and user. Limited evidence.',
          'Problem is vague or the user is “everyone”.',
          'No clear problem or user.'
        ]
      },
      {
        title: 'Direction Achieved',
        question: 'Does the app deliver on Yourself, Others or Scale?',
        levels: [
          'Clearly solves the problem for its direction. **Yourself:** saves real time or effort. **Others:** genuinely connects people. **Scale:** improves a real process in a measurable way.',
          'Direction is clear and works. Impact not fully shown.',
          'Relates to the direction but impact is weak or unclear.',
          'App does not match its direction.'
        ]
      },
      {
        title: 'Functionality & Technical Skill',
        question: 'Does it work? How hard was it to build?',
        levels: [
          'Core features work smoothly in a live demo. Strong technical skill (data storage, logic, integration).',
          'Core features work. 1-2 bugs. Good technical effort.',
          'Some features work, with several bugs or basic skill only.',
          'App does not run or is mostly a mockup.'
        ]
      },
      {
        title: 'User Experience & Design',
        question: 'Easy and pleasant to use?',
        levels: [
          'Clean, intuitive, consistent. A new user could use it with no help.',
          'Easy to use with minor layout or flow issues.',
          'Usable but confusing or cluttered.',
          'Hard to use or no thought to design.'
        ]
      },
      {
        title: 'Demo & Presentation',
        question: 'Live demo and explanation.',
        levels: [
          'Confident live demo showing the problem, solution and impact. Answers questions well.',
          'Good demo and explanation. Some questions unanswered.',
          'Demo is rushed or unclear.',
          'No working demo or cannot explain the app.'
        ]
      },
      {
        title: 'AI Usage Policy',
        question: 'Did the team follow the AI do’s and don’ts?',
        levels: [
          'Follows all AI do’s and don’ts. Team wrote and owns the code.',
          'Follows the AI do’s and don’ts with one minor slip.',
          'Breaks some AI don’ts. Parts of the app rely on AI.',
          'Ignores the AI policy. App is mostly AI-generated.'
        ]
      }
    ],
    howToJudge: howToJudge(6, 24, JUDGE_DIRECTION),
    bands: HACKATHON_BANDS
  },
  {
    id: 'senior-makeathon',
    title: 'Senior Makeathon',
    subtitle: 'CAD Design · Fusion 360 / SketchUp',
    context: [
      {
        label: 'Statement of inquiry',
        text: '“A well-designed object doesn’t just work. It decides who it works for, and a good designer can choose to widen that circle.”'
      },
      {
        label: 'Directions (judge against the one the team chose)',
        text: '**Solve** = fix something broken or inefficient. **Enhance** = improve an everyday object’s form or function. **Extend** = make it work for someone it didn’t before.'
      }
    ],
    criteria: [
      {
        title: 'Problem & User Understanding',
        question: 'Who is it for and what do they need?',
        levels: [
          'Specific user and need clearly identified, backed by research, measurements or user input.',
          'Clear user and need. Limited research.',
          'User or need is vague.',
          'No clear user or need.'
        ]
      },
      {
        title: 'Direction Achieved',
        question: 'Does it Solve, Enhance or Extend? Does it widen the circle?',
        levels: [
          'Design clearly delivers its direction. Team explains exactly who the object works for and who it now includes.',
          'Direction is clear and works. Some choices not explained.',
          'Direction attempted but the improvement is small or unclear.',
          'Design does not address its direction.'
        ]
      },
      {
        title: 'CAD Skill & Accuracy',
        question: 'Quality of the 3D model.',
        levels: [
          'Accurate, clean model with correct dimensions and strong use of tools (sketches, constraints, features, assemblies). Looks professional.',
          'Good model with minor errors. Dimensions mostly correct.',
          'Basic model. Noticeable errors or very simple modelling.',
          'Model is incomplete or inaccurate.'
        ]
      },
      {
        title: 'Feasibility & Practicality',
        question: 'Could it actually be made and used?',
        levels: [
          'Realistic to manufacture or 3D print. Materials, sizes and tolerances considered.',
          'Mostly realistic. A few gaps (e.g. material not stated).',
          'Hard to make or use. Little thought about real-world use.',
          'Not realistic or not considered.'
        ]
      },
      {
        title: 'Presentation & Communication',
        question: 'Renders, drawings and explanation.',
        levels: [
          'Clear renders or drawings, annotated dimensions, confident explanation of design decisions.',
          'Good visuals and explanation. Some gaps.',
          'Limited visuals or unclear explanation.',
          'Little or no communication of the design.'
        ]
      }
    ],
    howToJudge: howToJudge(5, 20, JUDGE_DIRECTION),
    bands: MAKEATHON_BANDS
  }
];
