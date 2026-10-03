import timBoulton from '../assets/images/team/tim-boulton.jpg';
import aprajitaRalli from '../assets/images/team/aprajita-ralli.jpg';
import ishitaBhattacharjee from '../assets/images/team/ishita-bhattacharjee.jpg';
import chaitraR from '../assets/images/team/chaitra-r.jpg';
import suhailKhan from '../assets/images/team/suhail-khan.jpg';
import devendharB from '../assets/images/team/devendhar-b.jpg';

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

export interface Person {
  name: string;
  role: string;
  grade?: string;
  quote?: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  mentoring?: string;
}

export interface StudentTeam {
  name: string;
  focus: string;
  icon: 'logistics' | 'finance' | 'participants' | 'technical' | 'media';
  // bio: a line or two on the student's expertise, shown in the popup when the tile is clicked
  members: { name: string; grade: string; photo?: string; bio?: string }[];
}

export const IGNITE_DATA = {
  event: {
    title: 'IGNITE 2026-27',
    subtitle: 'Hackathon & Makeathon',
    dates: '5-6 November 2026',
    school: 'Sreenidhi International School',
    tagline: 'Kindle the innovation within',
    prizeMoney: 'Up to ₹25,000',
    registrationFee: '₹6,750 per team',
    teamSize: '1–4 students',
    contactEmail: 'sisignite@sis.edu.in',
    instagram: 'https://www.instagram.com/sreenidhi_ignite',
    instagramHandle: '@sreenidhi_ignite',
    address: 'Aziznagar Village Rd, near TS Police Academy, Moinabad, Telangana 500075',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sreenidhi+International+School+Moinabad+Telangana+500075',
    definition: 'A platform where students transform ideas into interactive systems, creative solutions, and meaningful experiences.',
    about: "Organised by the Design Department, IGNITE 2026–27 is a two-day innovation marathon held on 5–6 November 2026 in the New Design Block at the SIS campus. It brings together students from different schools to think creatively, work as a team, and turn ideas into practical solutions for real-world problems. This year's challenges span Game Development, App Development, Rube Goldberg Machines, and CAD Design, all built around one theme: designing interactive systems that engage, challenge, and connect people.",
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
      question: 'How many students can be in a team?',
      answer: 'Teams can have a maximum of 4 students. You can also take part on your own as an individual.'
    },
    {
      question: 'Can students from different grades be in the same team?',
      answer: 'Yes, as long as everyone is in the same division. A Junior team can mix any grades from MYP 1–3 (Grades 6–8), and a Senior team can mix any grades from MYP 4–DP 2 (Grades 9–12). Junior and Senior students cannot be in the same team.'
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

  // Team page. Any name left as '' shows as "To be announced".
  committee: {
    // Shown side by side at the top. The quote is optional.
    // quote: add each leader's approved words here; it shows under the name. Empty shows nothing.
    leaders: [
      {
        name: 'Mr Tim Boulton',
        role: 'Head of School',
        quote: '',
        photo: timBoulton
      },
      {
        name: 'Mrs Aprajita Ralli',
        role: 'Secondary School Principal',
        quote: '',
        photo: aprajitaRalli
      }
    ] as Person[],
    // Event coordinators, shown together in one tile under the leaders (first on the left, second on the right).
    // photo: import the picture at the top of this file, as for the leaders.
    coordinators: [
      { name: 'Sriven Reddy Battalapalli', role: 'Makeathon Coordinator', grade: 'IBCP 1' },
      { name: 'Anvi Reddy Kolanu', role: 'Hackathon Coordinator', grade: 'IBDP 1' }
    ] as Person[],
    // Student organising committee. Add members as { name: '...', grade: '...' }.
    studentTeams: [
      {
        name: 'Logistics Managers',
        focus: 'Venue, materials, and setup',
        icon: 'logistics',
        members: [
          { name: 'Medha Reddy Gopireddy', grade: 'IBDP 1' },
          { name: 'Varunika Neerati', grade: 'IBDP 1' },
          { name: 'Vrithi Gouthareddy', grade: 'MYP 4' }
        ]
      },
      {
        name: 'Media Team',
        focus: 'Photos, social media, and promotion',
        icon: 'media',
        members: [
          { name: 'Risha Srivastava', grade: 'IBDP 1' },
          { name: 'Srinika Mukherjee', grade: 'IBDP 1' },
          { name: 'Akshara Saddi', grade: 'IBDP 1' },
          { name: 'Ridhi Murari', grade: 'IBDP 1' }
        ]
      },
      {
        name: 'Participant Registration & Relations',
        focus: 'Registrations and help for visiting teams',
        icon: 'participants',
        members: [
          { name: 'Adith Reddy Adla', grade: 'MYP 4' },
          { name: 'Aaryan Reddy Karra', grade: 'MYP 5' },
          { name: 'Lasya Kandikatla', grade: '' },
          { name: 'Ishanvi Reddy M', grade: 'MYP 5' }
        ]
      },
      {
        name: 'Tech Support Team',
        focus: 'Devices, setup, and tech help on the day',
        icon: 'technical',
        members: [
          { name: 'Jay Anand Krishna', grade: 'MYP 4' },
          { name: 'Aryan Akula', grade: 'MYP 5' },
          { name: 'Sree Vaibhav Reddy Kamireddi', grade: 'IBDP 1' }
        ]
      },
      {
        name: 'Sponsorship & Finance Team',
        focus: 'Sponsors, budget, and prizes',
        icon: 'finance',
        members: [
          { name: 'Kalidasu Ala', grade: 'MYP 5' },
          { name: 'Kanik Mutha', grade: 'MYP 4' },
          { name: 'Amogh Agarwal', grade: 'IBDP 1' }
        ]
      }
    ] as StudentTeam[],
    // Design Department. The first person is shown as the head, full width.
    // linkedin: full profile address (https://www.linkedin.com/in/...). bio and photo are optional too.
    // mentoring: the student team this teacher mentors. bio: leave a blank line (\n\n) between paragraphs.
    // quote: a sentence taken from the bio, shown on the card under the name.
    design: [
      {
        name: 'Mr Suhail Khan',
        role: 'Head of Department',
        mentoring: 'Finance Team',
        quote:
          'IGNITE is more than a competition. It helps students develop the curiosity to ask better questions, the confidence to share bold ideas, and the persistence to turn challenges into useful solutions.',
        bio:
          'As a Design educator, I see IGNITE as a chance for students to take an idea beyond the page and discover what it can become. Through designing, building, coding, testing, and refining, they experience the excitement of creating something of their own. They learn to listen to different perspectives, work as a team, and see an unexpected result as a reason to try again.' +
          '\n\n' +
          'IGNITE is more than a competition. It helps students develop the curiosity to ask better questions, the confidence to share bold ideas, and the persistence to turn challenges into useful solutions. Whether you love making things with your hands or creating something digital, bring your imagination and give it a go. What will you create?',
        linkedin: '',
        photo: suhailKhan
      },
      { name: 'Ms Sushma Goyal', role: 'Design Facilitator · HOD IT', mentoring: '', bio: '', linkedin: '' },
      {
        name: 'Ms Chaitra R',
        role: 'Design Facilitator',
        mentoring: 'Participant Registration & Relations',
        quote: 'For me, the real value of IGNITE is not simply what students create at the end, but how they grow through the experience.',
        bio:
          'As an MYP & DP Design educator, I value opportunities that allow students to step outside the boundaries of a classroom and take ownership of their ideas. IGNITE creates that space. It challenges students to trust their thinking, take creative risks, respond to constraints, and work with others to bring an idea to life.' +
          '\n\n' +
          'For me, the real value of IGNITE is not simply what students create at the end, but how they grow through the experience—as confident thinkers, courageous creators, and young people who realise that their ideas have the potential to make a difference.',
        linkedin: '',
        photo: chaitraR
      },
      {
        name: 'Ms Ishita Bhattacharjee',
        role: 'Design Facilitator',
        mentoring: 'Operations',
        quote: 'If you enjoy questioning, experimenting, making, and learning through challenges, IGNITE is the place to be!',
        bio:
          'As an MYP Design educator, I believe IGNITE is an opportunity for students to move beyond ideas and experience the real process of designing, making, testing, and improving. It encourages students to think creatively, collaborate with others, embrace failure, and turn meaningful problems into innovative solutions.' +
          '\n\n' +
          'IGNITE is not just about building a product—it is about developing the mindset, skills, and confidence to become thoughtful problem-solvers and creators. If you enjoy questioning, experimenting, making, and learning through challenges, IGNITE is the place to be!',
        linkedin: '',
        photo: ishitaBhattacharjee
      },
      {
        name: 'Mr Devendhar B',
        role: 'Design Facilitator',
        mentoring: 'Media & Tech Support',
        quote: 'When students see their own idea take shape, they start to believe that they can solve bigger problems.',
        bio:
          "As a Design educator, I see IGNITE as a festival of innovation, where creating, building, and making take the main seat. Every child's ideas and thoughts are given the scope to be built, so they become something more than just thoughts." +
          '\n\n' +
          'When students see their own idea take shape, they start to believe that they can solve bigger problems.',
        linkedin: '',
        photo: devendharB
      }
    ] as Person[]
  },

  // Add people as { name: '...', role: '...' }. While the list is empty its page says "announced soon".
  judges: [] as Person[],

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
