// Teams for the Showcase page, from the "Paid Teams - Certification" tab of the
// 2026-2027 Sreenidhi Ignite registration sheet (as of 7 Nov 2026). The four 1st-place
// awards match IGNITE_DATA.event.winners in igniteData.ts.
// Parent emails and payment details stay in the sheet; only what's shown here goes on the site.
//
// To mark results, add to a team:
//   award: 1 | 2 | 3                      (place within its challenge)
//   mention: 'Best use of recycled materials'  (special mention, with the reason)
// Optional: project: 'Project name', link: 'https://...', linkLabel: 'Play the game'

export type ChallengeKey = 'game' | 'rube' | 'app' | 'cad';

export const CHALLENGES: Record<ChallengeKey, { event: string; name: string; level: 'Junior' | 'Senior' }> = {
  game: { event: 'Hackathon', name: 'Game Development', level: 'Junior' },
  rube: { event: 'Makeathon', name: 'Rube Goldberg Machine', level: 'Junior' },
  app: { event: 'Hackathon', name: 'App Development', level: 'Senior' },
  cad: { event: 'Makeathon', name: 'CAD Design', level: 'Senior' },
};

export interface ShowcaseTeam {
  name: string; // empty when the team didn't give one
  school: string;
  challenge?: ChallengeKey; // missing when the team didn't choose a category
  event: 'Hackathon' | 'Makeathon';
  members: string[];
  project?: string;
  link?: string;
  linkLabel?: string;
  award?: 1 | 2 | 3;
  mention?: string;
}

const SIS = 'Sreenidhi International School';
const BOMIS = 'Birla Open Minds International School, Bandlaguda Jagir';
const MGS = 'Manchester Global School';

export const SHOWCASE_TEAMS: ShowcaseTeam[] = [
  { name: 'The Coffee-Fueled Goobers', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Ayansh Reddy Gummadi', 'Pranav Reddy Kankala', 'Ayaan Qureshi', 'Medhansh Nagasai Chinta'] },
  { name: 'HT Devs', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Vansh Reddy Kotha Venkata', 'Arnav Manne', 'Krishiv Kaasam'] },
  { name: 'Ember', school: SIS, challenge: 'rube', event: 'Makeathon', members: ['Shishira', 'Aadyaa Reddy', 'Lekhya'] },
  { name: 'The Supreme Little Men', school: SIS, challenge: 'game', event: 'Hackathon', award: 1, members: ['Kayan Agarwal', 'Rishaan Maramreddy', 'Xerxees Zareer Kmaneck', 'Vishnu Sahas Gadiraju'], project: 'Antipollute', link: 'https://turbowarp.org/1409348599/fullscreen', linkLabel: 'Play the game' },
  { name: '', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Daanya Fatima', 'Pragnya Reddy Neerudu', 'Advika Agarwal'], link: 'https://scratch.mit.edu/projects/1410075389', linkLabel: 'Play the game' },
  { name: 'Lingampalli Lakers', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Prabhat Kolachina', 'Vikranth Reddy', 'Vishrut Shyam Kumar', 'Ayank Anand Krishna'], link: 'https://scratch.mit.edu/projects/1411412725', linkLabel: 'Play the game' },
  { name: 'Apex Titans', school: SIS, challenge: 'cad', event: 'Makeathon', members: ['Saras', 'Krishiv', 'Virat', 'K. Sai Charith Reddy'] },
  { name: 'Binary Brain', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Darsh Ganeriwal', 'Mansujal Javvadi', 'Arsh Ganeriwal', 'Jai'] },
  { name: 'The Undertakers', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Virat', 'Ivan', 'Aryan'] },
  { name: 'Ignite Squad', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Likhit Mamidipally', 'Drithvik Reddy Kattiki Reddy', 'Vansh Donthneni', 'Vedarjun Tipparaju'], link: 'https://www.roblox.com/games/81883599959962/Ignite-Game', linkLabel: 'Play on Roblox' },
  { name: 'Cheesy Guardians', school: SIS, challenge: 'rube', event: 'Makeathon', members: ['Shrigvith Reddy Muddam', 'Ronin', 'Avyukth Reddy Kommidi', 'Chitral'] },
  { name: 'The Unemployed', school: SIS, challenge: 'rube', event: 'Makeathon', award: 1, members: ['Joshua Shamurailatpam', 'Shatmanyu Chilakapati', 'Senna Gollapudi', 'ShriNirvin Reddy'] },
  { name: 'Aditi and Aarav', school: 'DRS International School', challenge: 'cad', event: 'Makeathon', members: ['Aditi Soma', 'Aarav Srivastav'] },
  { name: '', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Mokshagna', 'Vihaan Reddy Pindi', 'Ridhaansh Chordia', 'Adhvik Reddy Suskandla'] },
  { name: 'DASK', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Avnesh', 'Dhruva Bojja', 'Kayaan Jain', 'Sarvagna'] },
  { name: 'Potato Party', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Mira Greeshma Shahir', 'Aadhya Naidu Vadlamudi', 'Kaira Mutha', 'Avantika Vinayak Singh'] },
  { name: 'NovaMinds', school: BOMIS, challenge: 'game', event: 'Hackathon', members: ['Hanshith Reddy B', 'Turpu Rusheel Reddy', 'Vishvajith K', 'Mandala Bhargavaditya'] },
  { name: 'Techno Sparks', school: BOMIS, challenge: 'rube', event: 'Makeathon', members: ['Chowdary Sai Sri Pavitra Sayuri', 'Ruthvika Chowdary Jasthi', 'Lavanya Paikaray', 'Hanishka Goyal'] },
  { name: "MG's", school: MGS, challenge: 'app', event: 'Hackathon', award: 1, members: ['Asish Kakloori Reddy', 'Vrishin Nehar Sai Kolli', 'Dhruva Reddy Kundur', 'Sai Vachan Chigullapalli'] },
  { name: 'Oneiropolos', school: MGS, challenge: 'app', event: 'Hackathon', members: ['Revanth Kumar Narra', 'Akshay Thella', 'Anuraag Patel Manchanpally', 'Snithik Reddy Vangati'] },
  { name: 'The Filler Episodes', school: MGS, challenge: 'app', event: 'Hackathon', members: ['Havish Madham', 'Yashmit Reddy Sripati', 'Venkat Ram Kiran Pinapatruni'] },
  { name: 'Capybara Designers', school: MGS, challenge: 'cad', event: 'Makeathon', award: 1, members: ['Srithan Reddy Dasireddy', 'Adhwika Reddy Boothkur', 'Yukti Sri Edula', 'Ashrith Reddy Pannala'], link: 'https://drive.google.com/drive/folders/1EaAPTHiMI_gX7ndRH9WkFytXLBQ1BUss?usp=sharing', linkLabel: 'See the designs' },
  { name: 'The Maze Maverics', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Yashaswini Jha'] },
  { name: '', school: SIS, challenge: 'game', event: 'Hackathon', members: ['Chakrahari Jairam', 'Reyansh Rao J', 'Vihaan Naredla', 'Akhil Krishnasai'] },
  { name: 'BOBs Squad', school: MGS, challenge: 'cad', event: 'Makeathon', members: ['Surya Tej Bhatt Kurapati', 'Rehan Imran Payak', 'Aman Reddy Chamala', 'Dev Tejani'], link: 'https://drive.google.com/file/d/1wqiQKHdCHPrCV63RLCmlzMKgb_paVQrH/view?usp=drive_link', linkLabel: 'See the design' },
  { name: 'Venty', school: SIS, challenge: 'app', event: 'Hackathon', members: ['Riaan Mura', 'Vayun', 'Karthik', 'Nived'], link: 'https://ventful4.netlify.app/', linkLabel: 'Open the app' },
];
