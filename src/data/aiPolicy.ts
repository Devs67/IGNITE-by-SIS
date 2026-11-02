// The IGNITE 2026–27 AI Usage Policy, from the AI Usage Policy document in Figma.
// Keep the wording in step with that document.

export type PolicyBlock =
  // A plain paragraph
  | { kind: 'text'; text: string }
  // A numbered clause, with an optional bold lead-in and bullet list
  | { kind: 'clause'; num: string; lead?: string; text: string; list?: string[] }
  // A boxed rule: permitted use (ticks), prohibited use (crosses) or a category's requirements
  | {
      kind: 'rule';
      tone: 'permitted' | 'prohibited' | 'category';
      num: string;
      title: string;
      meta?: string;
      paragraphs?: string[];
      listLabel?: string;
      list?: string[];
      notes?: string[];
    }
  // An intro line followed by bullets
  | { kind: 'list'; intro: string; items: string[] }
  // A highlighted statement
  | { kind: 'callout'; text: string };

export interface PolicySection {
  num: string;
  title: string;
  blocks: PolicyBlock[];
}

export const AI_POLICY = {
  title: 'Artificial Intelligence (AI) Usage Policy',
  applicableTo: 'All registered participants and teams',
  issuedBy: ['IGNITE Organising Committee', 'Sreenidhi International School', 'IGNITE 2026–27 — Hackathon and Makeathon'],
  sections: [
    {
      num: '1',
      title: 'Purpose',
      blocks: [
        { kind: 'text', text: 'This policy establishes the conditions under which artificial intelligence (AI) tools may be used during IGNITE 2026–27. It aims to maintain academic integrity, fairness, originality, and responsible technology use throughout the Hackathon and Makeathon.' },
        { kind: 'text', text: 'AI tools may support participants during research, planning, programming, designing, and problem-solving. However, their use must not replace the participants’ own thinking, technical ability, decision-making, or understanding of the work submitted for evaluation.' },
        { kind: 'text', text: 'All participants are expected to develop solutions that reflect their team’s contribution and demonstrate a clear understanding of the concepts, methods, and technologies used.' }
      ]
    },
    {
      num: '2',
      title: 'Scope and Applicability',
      blocks: [
        { kind: 'clause', num: '2.1', text: 'This policy applies to every participant registered for IGNITE 2026–27, irrespective of age group, competition category, team size, or development platform.' },
        { kind: 'clause', num: '2.2', text: 'The policy covers the use of generative AI, AI-powered coding assistants, automated design tools, AI-based research tools, image generators, chatbots, and other systems capable of generating or modifying text, code, images, models, or other project components.' },
        {
          kind: 'clause',
          num: '2.3',
          text: 'The policy applies to all stages of the competition, including:',
          list: [
            'Research and ideation.',
            'Project planning and development.',
            'Coding and debugging.',
            'Visual design and CAD modelling.',
            'Testing and refinement.',
            'Documentation and presentations.',
            'Final submissions and judging.'
          ]
        },
        { kind: 'clause', num: '2.4', text: 'Participants remain responsible for their submissions regardless of whether particular elements were created independently, with AI assistance, or using third-party tools.' },
        { kind: 'clause', num: '2.5', text: 'Where additional instructions are issued for a particular competition category, participants must comply with both those instructions and this policy.' }
      ]
    },
    {
      num: '3',
      title: 'General Principles',
      blocks: [
        { kind: 'text', text: 'All AI use at IGNITE must comply with the following principles.' },
        { kind: 'clause', num: '3.1', lead: 'Originality:', text: 'The final submission must reflect meaningful work and decision-making by the participating team.' },
        { kind: 'clause', num: '3.2', lead: 'Understanding:', text: 'Participants must understand the functionality, structure, and purpose of the work they present.' },
        { kind: 'clause', num: '3.3', lead: 'Fairness:', text: 'AI tools must not be used to obtain an unfair advantage over other participants or to bypass competition requirements.' },
        { kind: 'clause', num: '3.4', lead: 'Accountability:', text: 'Participants are responsible for the accuracy, safety, suitability, and integrity of their final submissions.' },
        { kind: 'clause', num: '3.5', lead: 'Responsible use:', text: 'AI must be used in a manner that respects privacy, intellectual property, and the rights of others.' }
      ]
    },
    {
      num: '4',
      title: 'Permitted Use of AI',
      blocks: [
        { kind: 'text', text: 'Participants may use AI tools for the following purposes, provided that their use complies with the remaining provisions of this policy.' },
        {
          kind: 'rule',
          tone: 'permitted',
          num: '4.1',
          title: 'Research and Ideation',
          listLabel: 'Participants may use AI to:',
          list: [
            'Explore possible project ideas and approaches.',
            'Understand the problem or design challenge.',
            'Identify relevant concepts, technologies, and methods.',
            'Compare potential solutions.',
            'Generate questions to guide further research.'
          ],
          notes: ['AI-generated information must be evaluated rather than accepted without verification.']
        },
        {
          kind: 'rule',
          tone: 'permitted',
          num: '4.2',
          title: 'Programming and Technical Assistance',
          listLabel: 'Participants may use AI to:',
          list: [
            'Understand programming concepts, functions, and algorithms.',
            'Identify and troubleshoot errors.',
            'Obtain explanations of unfamiliar code.',
            'Explore alternative approaches to a technical problem.',
            'Improve code readability and organisation.',
            'Receive guidance on testing and debugging.'
          ],
          notes: ['Participants must be able to explain the relevant code and demonstrate how it contributes to their project.']
        },
        {
          kind: 'rule',
          tone: 'permitted',
          num: '4.3',
          title: 'Design and User Interface Development',
          listLabel: 'Participants may use AI to:',
          list: [
            'Explore possible interface layouts.',
            'Generate preliminary visual concepts.',
            'Evaluate different design approaches.',
            'Obtain feedback on accessibility and usability.',
            'Identify potential improvements to an existing design.'
          ],
          notes: ['The team must make its own design decisions and ensure that the final product satisfies the requirements of its category.']
        },
        {
          kind: 'rule',
          tone: 'permitted',
          num: '4.4',
          title: 'CAD and Physical Product Development',
          listLabel: 'Participants may use AI to:',
          list: [
            'Understand modelling techniques and design principles.',
            'Explore alternative product concepts.',
            'Troubleshoot modelling difficulties.',
            'Obtain explanations of technical specifications.',
            'Evaluate potential improvements to a design.'
          ],
          notes: ['AI assistance must not replace the team’s required design, modelling, construction, testing, or practical contribution.']
        },
        {
          kind: 'rule',
          tone: 'permitted',
          num: '4.5',
          title: 'Documentation and Presentation',
          paragraphs: [
            'AI may be used to obtain feedback on grammar, improve clarity, organise notes, and understand technical terminology.',
            'Participants remain responsible for the accuracy of all statements, explanations, testing records, and claims included in their documentation and presentations.'
          ]
        }
      ]
    },
    {
      num: '5',
      title: 'Prohibited Use of AI',
      blocks: [
        { kind: 'text', text: 'The following practices are prohibited during IGNITE.' },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.1',
          title: 'Substitution of Participant Work',
          paragraphs: [
            'Participants must not submit a complete AI-generated solution as their own work without meaningful development, modification, or contribution.',
            'This includes presenting a generated game, application, CAD model, or other project as evidence of skills that the team has not demonstrated.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.2',
          title: 'Misrepresented Work',
          paragraphs: [
            'Participants must not falsely claim that AI-generated work was created entirely by the team.',
            'They must not provide misleading information about the extent of their contribution.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.3',
          title: 'Misrepresentation of Technical Understanding',
          paragraphs: [
            'Participants must not knowingly present code, models, features, or technical solutions that they cannot reasonably explain or demonstrate.',
            'The use of AI assistance is not itself a violation. However, participants must not misrepresent their understanding or contribution.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.4',
          title: 'Unauthorised Assistance During Judging',
          paragraphs: [
            'Participants must not use AI to generate answers during a judging interaction when judges have asked them to respond independently.',
            'If judges instruct participants to explain, modify, or demonstrate their work without AI assistance, those instructions must be followed.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.5',
          title: 'Plagiarism and Unauthorised Copying',
          paragraphs: [
            'AI must not be used to reproduce another team’s work, obtain another participant’s files without permission, or disguise copied work as original.',
            'Participants must also comply with applicable intellectual property requirements when using third-party code, images, models, or other resources.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.6',
          title: 'Fabrication of Evidence',
          listLabel: 'Participants must not use AI to fabricate:',
          list: [
            'Testing results or performance measurements.',
            'User feedback or survey findings.',
            'Claims about functionality that has not been demonstrated.',
            'Evidence of development or experimentation.',
            'References, sources, or technical information presented as verified when they are not.'
          ]
        },
        {
          kind: 'rule',
          tone: 'prohibited',
          num: '5.7',
          title: 'Interference with Other Participants',
          paragraphs: ['AI tools must not be used to access another team’s work without authorisation, interfere with another team’s systems, or undermine the fair conduct of the competition.']
        }
      ]
    },
    {
      num: '6',
      title: 'Category-Specific Requirements',
      blocks: [
        { kind: 'text', text: 'The following requirements apply in addition to the general provisions of this policy.' },
        {
          kind: 'rule',
          tone: 'category',
          num: '6.1',
          title: 'Junior Hackathon – Game Development',
          meta: 'Platforms: Scratch and Code.org',
          paragraphs: ['Participants may use AI to understand programming concepts, explore game mechanics, troubleshoot errors, and develop initial ideas.'],
          listLabel: 'However:',
          list: [
            'The team must make the principal decisions concerning its game’s rules, mechanics, structure, and intended user experience.',
            'Participants must understand the programming blocks, logic, and features used in their game.',
            'AI-generated code or assets must not be presented as entirely original team work.',
            'Participants must be able to demonstrate the game’s functionality and explain how key features operate.'
          ]
        },
        {
          kind: 'rule',
          tone: 'category',
          num: '6.2',
          title: 'Junior Makeathon – Rube Goldberg Machine',
          meta: 'Materials: Any materials',
          paragraphs: ['AI may be used to explore mechanical principles, investigate possible sequences of actions, and understand the operation of simple machines.'],
          listLabel: 'However:',
          list: [
            'The physical construction and testing must be carried out by the participants.',
            'The team must make its own decisions about the arrangement and operation of the machine.',
            'AI-generated diagrams or suggestions must not be treated as proof that a design will work.',
            'Participants must demonstrate their own understanding of how the machine operates.'
          ],
          notes: ['The use of AI must not replace the practical construction and experimentation required for the challenge.']
        },
        {
          kind: 'rule',
          tone: 'category',
          num: '6.3',
          title: 'Senior Hackathon – Mobile and Web Application Development',
          paragraphs: ['Participants may use AI to assist with programming, debugging, interface development, and technical research.'],
          listLabel: 'However:',
          list: [
            'The team must retain meaningful responsibility for the application’s architecture, features, and implementation.',
            'Participants must understand the code and systems that form the basis of their submission.',
            'AI-generated code must be reviewed and tested before it is incorporated into the application.',
            'Teams must not claim that proposed or AI-generated features are functional unless they have been implemented and verified.',
            'Participants must be able to explain their application’s purpose, functionality, and major technical decisions.'
          ]
        },
        {
          kind: 'rule',
          tone: 'category',
          num: '6.4',
          title: 'Senior Makeathon – CAD Modelling',
          paragraphs: ['Participants may use AI to explore product concepts, understand CAD techniques, and troubleshoot modelling challenges.'],
          listLabel: 'However:',
          list: [
            'Participants must carry out the required design and modelling work.',
            'The final model must reflect the team’s design decisions and meaningful technical contribution.',
            'Teams must understand the model’s intended function and be able to explain important design features.',
            'AI-generated models or components must not be represented as independently created work.',
            'Participants must assess the feasibility of their designs rather than relying solely on AI-generated suggestions.'
          ]
        }
      ]
    },
    {
      num: '7',
      title: 'Judging and Verification',
      blocks: [
        { kind: 'clause', num: '7.1', text: 'Judges may ask participants questions about their projects to establish their understanding, originality, and contribution.' },
        {
          kind: 'clause',
          num: '7.2',
          text: 'Verification may include:',
          list: [
            'Explaining selected sections of code.',
            'Demonstrating a feature or design decision.',
            'Describing how a problem was identified and resolved.',
            'Explaining changes made during development.',
            'Clarifying the use of AI-generated content or components.',
            'Demonstrating the operation of a physical prototype.'
          ]
        },
        { kind: 'clause', num: '7.3', text: 'Participants must answer questions honestly. They are not expected to know every technical concept, but they must be able to explain the work for which their team claims credit.' },
        { kind: 'clause', num: '7.4', text: 'The use of AI alone is not grounds for disqualification. Judging decisions must consider the applicable category requirements, the team’s demonstrated contribution, and the evidence available.' },
        { kind: 'clause', num: '7.5', text: 'If a concern arises, judges may refer the matter to the IGNITE Organising Committee for review.' }
      ]
    },
    {
      num: '8',
      title: 'Privacy, Security, and Intellectual Property',
      blocks: [
        { kind: 'clause', num: '8.1', text: 'Participants must not enter passwords, private personal information, confidential school information, or sensitive data into AI platforms.' },
        { kind: 'clause', num: '8.2', text: 'Participants must not upload another person’s private information or unpublished work without appropriate permission.' },
        { kind: 'clause', num: '8.3', text: 'Participants must comply with the applicable age requirements, terms of service, and school rules governing the use of AI platforms.' },
        { kind: 'clause', num: '8.4', text: 'AI-generated information, code, images, and designs must be reviewed for accuracy, suitability, and potential intellectual property concerns.' },
        { kind: 'clause', num: '8.5', text: 'Participants must not use AI to generate harmful, discriminatory, abusive, or otherwise inappropriate content for their submissions.' },
        { kind: 'clause', num: '8.6', text: 'Teams are responsible for ensuring that any external resources incorporated into their projects are used appropriately and acknowledged where required.' }
      ]
    },
    {
      num: '9',
      title: 'Violations and Consequences',
      blocks: [
        { kind: 'clause', num: '9.1', text: 'Any suspected violation of this policy may be referred to the IGNITE Organising Committee for review.' },
        { kind: 'clause', num: '9.2', text: 'The committee will consider the nature and seriousness of the concern, the relevant evidence, the applicable competition rules, and the participant’s explanation.' },
        {
          kind: 'clause',
          num: '9.3',
          text: 'Depending on the circumstances, possible responses may include:',
          list: [
            'Requesting clarification or further explanation.',
            'Asking the team to demonstrate or explain the disputed work.',
            'Referring the matter to the judges for consideration in the evaluation.',
            'Applying a proportionate scoring penalty where authorised by the competition rules.',
            'Disqualifying a submission in cases of serious or substantiated misconduct, where permitted by the applicable rules.'
          ]
        },
        { kind: 'clause', num: '9.4', text: 'No penalty should be imposed solely because a participant has used AI for a permitted purpose.' },
        { kind: 'clause', num: '9.5', text: 'Participants must cooperate with reasonable requests for clarification relating to compliance with this policy.' },
        { kind: 'clause', num: '9.6', text: 'Any disciplinary decision must be made by the authorised organisers in accordance with the competition rules and applicable school procedures.' }
      ]
    },
    {
      num: '10',
      title: 'Responsibilities of Participants',
      blocks: [
        {
          kind: 'list',
          intro: 'Every participant is responsible for:',
          items: [
            'Reading and following this policy.',
            'Using AI tools only for permitted purposes.',
            'Ensuring that submitted work reflects meaningful team contribution.',
            'Understanding and verifying the work presented for evaluation.',
            'Respecting the privacy and intellectual property of others.',
            'Following additional instructions issued by the organisers and judges.'
          ]
        },
        { kind: 'text', text: 'Each team is collectively responsible for ensuring that its final submission complies with this policy.' }
      ]
    },
    {
      num: '11',
      title: 'Administration and Interpretation',
      blocks: [
        { kind: 'clause', num: '11.1', text: 'The IGNITE Organising Committee is responsible for administering this policy during the competition.' },
        { kind: 'clause', num: '11.2', text: 'Questions concerning the interpretation or application of this policy must be referred to the organising committee.' },
        { kind: 'clause', num: '11.3', text: 'The committee may issue additional instructions where necessary to address the requirements of a particular competition category.' },
        { kind: 'clause', num: '11.4', text: 'Any amendments must be communicated to participants through the official competition channels.' },
        { kind: 'clause', num: '11.5', text: 'This policy must be read alongside the applicable IGNITE competition rules, submission requirements, and judging criteria.' }
      ]
    },
    {
      num: '12',
      title: 'Participant Acknowledgement',
      blocks: [
        { kind: 'callout', text: 'By participating in IGNITE 2026–27, each participant agrees to comply with this Artificial Intelligence Usage Policy and acknowledges that they remain responsible for the originality, accuracy, integrity, and understanding of their submitted work.' }
      ]
    }
  ] as PolicySection[]
};
