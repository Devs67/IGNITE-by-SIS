export interface ChallengePathway {
  id: string;
  num: string;
  division: 'Junior' | 'Senior';
  type: 'Hackathon' | 'Makeathon';
  title: string;
  subtitle: string;
  gradeLevel: string;
  tools: string;
  quote: string;
  directions: {
    label: string;
    description: string;
  }[];
}

export const IGNITE_DATA = {
  event: {
    title: 'IGNITE 2026-27',
    subtitle: 'Hackathon & Makeathon',
    dates: '15-16 October 2026',
    school: 'Sreenidhi International School',
    tagline: 'Kindle the innovation within',
    prizeMoney: 'Up to ₹25,000',
    registrationFee: '₹6,750 per team',
    contactEmail: 'sisignite@sis.edu.in',
    instagram: 'https://www.instagram.com/sreenidhi_ignite',
    instagramHandle: '@sreenidhi_ignite',
    address: 'Aziznagar Village Rd, near TS Police Academy, Moinabad, Telangana 500075',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sreenidhi+International+School+Moinabad+Telangana+500075',
    definition: 'A platform where students transform ideas into interactive systems, creative solutions, and meaningful experiences.',
    about: "Organised by the Design Department, IGNITE 2026–27 is a two-day innovation marathon held on 15–16 October 2026 in the New Design Block at the SIS campus. It brings together students from different schools to think creatively, work as a team, and turn ideas into practical solutions for real-world problems. This year's challenges span Game Development, App Development, Rube Goldberg Machines, and CAD Design, all built around one theme: designing interactive systems that engage, challenge, and connect people.",
    finalCall: 'Turn your ideas into something that engages, challenges, and connects. Step into IGNITE and kindle the innovation within.',
    vision: 'To make IGNITE a place where every student sees themselves as an innovator: confident enough to take an idea from a first sketch to a working game, app, machine, or product design.',
    mission: 'To inspire and empower young innovators through hands-on challenges in coding and making, building creativity, critical thinking, and teamwork as they design solutions that engage, challenge, and connect people.'
  },

  faqs: [
    {
      question: 'Who can participate?',
      answer: 'IGNITE is open to students from MYP 1 to DP 2 (Grades 6 to 12). Participants compete in two divisions: Junior (MYP 1–3, Grades 6–8) and Senior (MYP 4–DP 2, Grades 9–12). Each division has both a Hackathon and a Makeathon challenge.'
    },
    {
      question: 'Do I need programming experience to participate?',
      answer: 'It depends on your challenge. The Junior Hackathon uses Scratch or code.org, so beginners are welcome. The Senior Hackathon (App Development) expects basic programming knowledge. The Makeathons need no coding: juniors build a Rube Goldberg machine by hand, and seniors should be comfortable with the basics of Fusion 360 or Blender.'
    },
    {
      question: 'What kind of projects can I create?',
      answer: 'Juniors build a game that is fun, teaches a skill, or shifts how players see an issue, or a Rube Goldberg machine that completes a simple task through a chain reaction. Seniors build an app that solves a personal, community, or process problem, or use CAD to improve or redesign an everyday object.'
    },
    {
      question: 'Are there mentors available?',
      answer: 'Yes. Faculty from the Design Department will be on hand throughout the event to guide teams, answer questions, and help you keep moving when you get stuck.'
    },
    {
      question: 'What materials do I need to bring?',
      answer: 'Hackathon and CAD teams should bring laptops and chargers, with the required software installed. Junior Makeathon teams should bring recycled or everyday household materials for their machine, as bought parts are not allowed.'
    },
    {
      question: 'Is transportation provided?',
      answer: 'Transportation is not provided. Participating schools and students are responsible for their own travel to and from the SIS campus.'
    },
    {
      question: 'Are the food stalls free?',
      answer: 'No. Meals are not included in the registration fee. Food stalls on campus are open to everyone and are paid.'
    },
    {
      question: 'How much is the registration fee, and what does it include?',
      answer: 'Registration is ₹6,750 per team. It covers participation on both days of the event, event materials, and a certificate of participation. Meals are not included. Payment details and instructions are shared after you register.'
    },
    {
      question: 'Is there prize money?',
      answer: 'Yes. Winning teams can take home prizes worth up to ₹25,000.'
    },
    {
      question: 'Is there an emergency evacuation plan?',
      answer: 'Yes. The SIS campus follows a documented emergency evacuation plan. Exits are clearly marked, and staff and volunteers will guide everyone to safety if needed.'
    },
    {
      question: 'Can I continue working on my project at home?',
      answer: 'You are encouraged to research, plan, and prepare ideas before IGNITE, but all building, coding, and prototyping must happen at the event. This keeps the competition fair for every team.'
    },
    {
      question: 'Is there a specific dress code?',
      answer: 'Participants should wear their school uniform. Makeathon teams should wear closed-toe shoes for safety.'
    },
    {
      question: 'Who do I contact with questions?',
      answer: 'For any questions about registration, event categories, rules, or taking part, use the question form below, email us at sisignite@sis.edu.in, or message us on Instagram at @sreenidhi_ignite.'
    }
  ],

  accreditations: [
    { label: 'IB Continuum', sub: 'Continuum de l\'IB' },
    { label: 'NEASC Accredited', sub: 'New England Association' },
    { label: 'CIS Accredited', sub: 'Council of International Schools' },
    { label: 'Google for Education', sub: 'Reference School' }
  ],

  eventTypes: [
    {
      type: 'Hackathon',
      theme: 'Code. Collaborate. Create impact.',
      description: 'Build smart digital solutions to solve real-world challenges.',
      detail: 'Teams turn a problem into a working digital product. Juniors build games in Scratch or code.org, and seniors develop apps. Over two days they brainstorm, code, test, and present a working prototype. It is competitive, but the best results come from teams that think fast and build together.',
      category: 'Junior & Senior',
      gradeLevel: 'MYP 1–DP 2'
    },
    {
      type: 'Makeathon',
      theme: 'Design. Build. Bring ideas to life.',
      description: 'Create tangible prototypes that inspire and make a difference.',
      detail: 'Teams design and build something physical. Juniors construct a Rube Goldberg machine from recycled, everyday materials, and seniors use Fusion 360 or Blender to redesign an everyday object. The focus is hands-on engineering, creative problem-solving, and rapid prototyping for real-life problems.',
      category: 'Junior & Senior',
      gradeLevel: 'MYP 1–DP 2'
    }
  ],

  overarchingTheme: {
    statement: 'Designers transform ideas into interactive systems that engage, challenge, and connect people.',
    pillars: [
      {
        id: 'engage',
        title: 'ENGAGE',
        description: 'Spark curiosity and draw users in.'
      },
      {
        id: 'challenge',
        title: 'CHALLENGE',
        description: 'Tackle real problems and push boundaries.'
      },
      {
        id: 'connect',
        title: 'CONNECT',
        description: 'Build meaningful experiences together.'
      }
    ]
  },

  pathways: [
    {
      id: 'junior-hackathon',
      num: '01',
      division: 'Junior',
      type: 'Hackathon',
      title: 'Junior Hackathon',
      subtitle: 'Game Development',
      gradeLevel: 'MYP 1–3',
      tools: 'Scratch / code.org',
      quote: 'Games are built on rules — and the same rules that make a game fun can also be used to teach a skill or change how a player thinks about something.',
      directions: [
        {
          label: 'Fun',
          description: 'design rules and challenges that make the game genuinely enjoyable to play'
        },
        {
          label: 'Teach',
          description: 'design a game where winning requires learning or practicing a real skill or concept'
        },
        {
          label: 'Shift',
          description: 'design a game that changes how the player sees an issue by making them experience it (fairness, environment, friendship, choices)'
        }
      ]
    },
    {
      id: 'junior-makeathon',
      num: '02',
      division: 'Junior',
      type: 'Makeathon',
      title: 'Junior Makeathon',
      subtitle: 'Rube Goldberg Machine',
      gradeLevel: 'MYP 1–3',
      tools: 'Recycled & Everyday Household Materials',
      quote: 'A Rube Goldberg machine turns one simple task into a chain reaction — and the choices you make about steps, materials, and energy transfer decide whether it works, and how cleverly.',
      directions: [
        {
          label: 'Task',
          description: 'choose the simple everyday action your machine will complete (turn off a light, pour water, ring a bell, pop a balloon)'
        },
        {
          label: 'Chain',
          description: "hit a minimum number of steps / simple machines (levers, pulleys, ramps, dominoes) so it's a genuine chain reaction, not a shortcut"
        },
        {
          label: 'Materials',
          description: 'build using only recycled or everyday household materials, not bought parts'
        }
      ]
    },
    {
      id: 'senior-hackathon',
      num: '03',
      division: 'Senior',
      type: 'Hackathon',
      title: 'Senior Hackathon',
      subtitle: 'App Development',
      gradeLevel: 'MYP 4–DP 2',
      tools: 'App Development Platforms',
      quote: 'An app can be built to solve a personal problem, connect a community, or make a system run more efficiently.',
      directions: [
        {
          label: 'Yourself',
          description: 'solve a personal productivity or life problem'
        },
        {
          label: 'Others',
          description: 'build for community or social connection'
        },
        {
          label: 'Scale',
          description: 'improve a process, business, or institution'
        }
      ]
    },
    {
      id: 'senior-makeathon',
      num: '04',
      division: 'Senior',
      type: 'Makeathon',
      title: 'Senior Makeathon',
      subtitle: 'CAD Design',
      gradeLevel: 'MYP 4–DP 2',
      tools: 'Fusion 360, Blender',
      quote: 'A well-designed object doesn’t just work — it decides who it works for, and a good designer can choose to widen that circle.',
      directions: [
        {
          label: 'Solve',
          description: 'fix something broken or inefficient'
        },
        {
          label: 'Enhance',
          description: "improve an everyday object’s form or function"
        },
        {
          label: 'Extend',
          description: "redesign something so it now works for someone it didn’t before"
        }
      ]
    }
  ] as ChallengePathway[],

  journey: [
    { num: '01', title: 'Identify' },
    { num: '02', title: 'Ideate' },
    { num: '03', title: 'Design' },
    { num: '04', title: 'Create' },
    { num: '05', title: 'Test' },
    { num: '06', title: 'Present' }
  ],

  checklists: {
    hackathon: {
      title: 'Hackathon',
      before: [
        {
          heading: 'Understand the challenge',
          detail: 'Study the problem and user needs'
        },
        {
          heading: 'Prepare ideas and plan',
          detail: 'Explore concepts and outline solutions'
        },
        {
          heading: 'Get ready to build',
          detail: 'Organize tools, skills, and team roles'
        }
      ],
      at: [
        {
          heading: 'Create and code',
          detail: 'Build your solution with focus'
        },
        {
          heading: 'Test and improve',
          detail: 'Debug, refine, and enhance your solution'
        },
        {
          heading: 'Present with impact',
          detail: 'Showcase your solution and learnings'
        }
      ]
    },
    makeathon: {
      title: 'Makeathon',
      before: [
        {
          heading: 'Understand the challenge',
          detail: 'Study the problem and user needs'
        },
        {
          heading: 'Prepare ideas and plan',
          detail: 'Explore concepts and design possibilities'
        },
        {
          heading: 'Get ready to build',
          detail: 'Organize materials, tools, and team roles'
        }
      ],
      at: [
        {
          heading: 'Create and build',
          detail: 'Make your prototype with precision'
        },
        {
          heading: 'Test and improve',
          detail: 'Validate, refine, and strengthen your design'
        },
        {
          heading: 'Present with impact',
          detail: 'Demonstrate your prototype and insights'
        }
      ]
    }
  }
};
