import Slide01Opening from "@/components/slides/Slide01Opening";
import Slide02WhatIs from "@/components/slides/Slide02WhatIs";
import Slide03HowItWorks from "@/components/slides/Slide03HowItWorks";
import Slide04CoreTech from "@/components/slides/Slide04CoreTech";
import Slide05Evolution from "@/components/slides/Slide05Evolution";
import Slide06Ecosystem from "@/components/slides/Slide06Ecosystem";
import Slide07WhatCanYouBuild from "@/components/slides/Slide07WhatCanYouBuild";
import Slide08AI from "@/components/slides/Slide08AI";
import Slide09Future from "@/components/slides/Slide09Future";
import Slide10AIReplace from "@/components/slides/Slide10AIReplace";
import Slide11Roadmap from "@/components/slides/Slide11Roadmap";
import Slide12Careers from "@/components/slides/Slide12Careers";
import SlideQuiz from "@/components/slides/SlideQuiz";
import SlideQA from "@/components/slides/SlideQA";
import Slide13Final from "@/components/slides/Slide13Final";
import type { SlideDef } from "@/lib/types";

/**
 * The deck, in presentation order. Add, remove or reorder entries here and the
 * progress bar, overview grid, navigation menu and notes panel all follow.
 */
export const slides: SlideDef[] = [
  {
    id: "opening",
    title: "Opening",
    section: "Intro",
    component: Slide01Opening,
    notes: [
      "Welcome everyone and introduce yourself: Sir Zaid Rauf, Web Developer at We Tech House.",
      "Open with a question: \"Who has used a website today?\" Everyone has. Today they learn who builds them, and how they can too.",
      "Point at the globe: the internet is millions of connected computers, and every one of those pages was built by a developer.",
      "Promise for the session: by the end they will know what web development is, how to start in 2026, and where it can lead.",
    ],
  },
  {
    id: "what-is-web-dev",
    title: "What Is Web Development?",
    section: "Foundations",
    component: Slide02WhatIs,
    notes: [
      "One-line definition: web development is creating websites and web applications that people use through the internet.",
      "The three tracks cycle automatically. Click one to stop the cycle and explore it.",
      "Frontend is what users see and touch. Backend is the logic, data and processing behind it. Full stack means working on both.",
      "Use a restaurant analogy: the dining room is the frontend, the kitchen is the backend, and a full stack developer can work in both.",
    ],
  },
  {
    id: "how-a-website-works",
    title: "How Does a Website Work?",
    section: "Foundations",
    component: Slide03HowItWorks,
    notes: [
      "Walk the journey when someone types a URL: User, Browser, DNS, Server, Database, Response, Website.",
      "DNS is the internet's phonebook: it turns a name into the address of a server. (This comes back in the quiz.)",
      "The frontend talks to the backend through APIs: the browser sends a request, the server replies with data.",
      "Pause the animation or click any icon to jump to a step if students have questions.",
    ],
  },
  {
    id: "core-technologies",
    title: "The Three Core Technologies",
    section: "Foundations",
    component: Slide04CoreTech,
    notes: [
      "HTML is the structure, CSS is the design, JavaScript is the logic and interactivity.",
      "This is the live playground: switch tabs, edit the code, and the preview on the right updates.",
      "Try the one-click tweak first, then change a colour or some text by hand so students see code become output immediately.",
      "Reset restores the original example if an experiment goes sideways.",
    ],
  },
  {
    id: "evolution",
    title: "Evolution of Web Development",
    section: "Foundations",
    component: Slide05Evolution,
    notes: [
      "Web 1.0: static pages you could only read. Web 2.0: interactive sites and social media. Web 3.0: decentralisation and emerging technologies. Modern web: AI-powered, intelligent, real-time applications.",
      "Click each era to compare. The point: the web keeps changing, so the ability to keep learning matters more than any single tool.",
      "Be honest that Web 3.0 is still evolving and people disagree on how much of it will become mainstream.",
    ],
  },
  {
    id: "ecosystem",
    title: "Modern Development Ecosystem",
    section: "Ecosystem",
    component: Slide06Ecosystem,
    notes: [
      "This is the toolbox of a modern developer. Tap a group to explore the tools inside it.",
      "Frontend: HTML, CSS, JavaScript, TypeScript, React, Next.js. Backend: Node.js, Express, APIs, authentication.",
      "Databases: MongoDB, PostgreSQL, Firebase, Supabase. Tools: Git and GitHub, VS Code, Postman, Figma. Cloud: AWS, Vercel, Netlify.",
      "Reassure beginners: nobody learns all of this at once. The roadmap later shows the order.",
    ],
  },
  {
    id: "what-can-you-build",
    title: "What Can You Build?",
    section: "Ecosystem",
    component: Slide07WhatCanYouBuild,
    notes: [
      "Web development is not limited to simple websites.",
      "E-commerce, social platforms, AI-powered apps, SaaS products, learning platforms, dashboards, mobile-friendly web apps, booking and management systems.",
      "Ask the room: \"Which of these would you like to build?\" Take two or three answers and connect them to skills they will learn.",
    ],
  },
  {
    id: "ai-in-web-dev",
    title: "The Power of AI",
    section: "AI & Future",
    component: Slide08AI,
    notes: [
      "AI is changing development: coding assistants, code generation, debugging, chatbots, agents, generative AI apps and AI APIs.",
      "Click a prompt in the AI concept panel to watch an application take shape.",
      "Key message: AI helps you write code faster, but programming fundamentals, problem-solving, architecture and security are still essential.",
      "A developer who cannot judge AI's output cannot safely ship it.",
    ],
  },
  {
    id: "future",
    title: "The Future (2026–2035)",
    section: "AI & Future",
    component: Slide09Future,
    notes: [
      "The timeline plays automatically. Pause it or click a year to stop on it.",
      "Separate what is already in use (serverless, WebAssembly, edge computing, real-time apps, security and privacy) from what is emerging or still a possibility (AI agents, voice interfaces, WebGPU, spatial computing).",
      "These are reasonable predictions, not guarantees. Technology rarely follows a straight line.",
      "The skill that carries through every one of these changes is the ability to keep learning.",
    ],
  },
  {
    id: "will-ai-replace",
    title: "Will AI Replace Web Developers?",
    section: "AI & Future",
    component: Slide10AIReplace,
    notes: [
      "Ask the question and let it hang for a moment. Take a quick show of hands before revealing.",
      "The answer: AI will change how developers work, but people who understand technology, solve problems and adapt to new tools will remain valuable.",
      "AI is a tool, not a replacement for thinking. Learn to work with it. Problem-solving matters more than memorising syntax. Creativity and understanding user needs matter.",
      "Use the AI vs Human comparison to show what each side is good at.",
    ],
  },
  {
    id: "roadmap",
    title: "Your 2026 Roadmap",
    section: "Career",
    component: Slide11Roadmap,
    notes: [
      "Ten steps: HTML and CSS, JavaScript, Git and GitHub, React, Next.js, Node and Express, databases, APIs and authentication, deployment and cloud, then AI integration and real projects.",
      "Press \"Walk the journey\" to animate through the steps, or click any step to jump to it.",
      "Stress that this is a journey of months of steady practice, not days. Build something small at every step.",
    ],
  },
  {
    id: "careers",
    title: "Career Opportunities",
    section: "Career",
    component: Slide12Careers,
    notes: [
      "Seven paths: frontend, backend, full stack, software engineer, freelance developer, SaaS founder, AI application developer.",
      "Click the routes below to cover remote jobs, freelancing, startups and entrepreneurship.",
      "Be realistic: no promises about salary or income. Results depend on skills, projects, consistency and the market.",
      "Remote work and freelancing reward people who can show real projects and communicate clearly.",
    ],
  },
  {
    id: "quiz",
    title: "Live Quiz",
    section: "Finale",
    component: SlideQuiz,
    notes: [
      "Three quick questions from today's talk. Read each aloud, give the audience a few seconds, then count hands for each option.",
      "Tap the option the room votes for (or press 1 to 4). The right answer lights up with a short explanation.",
      "Answers: Q1 is HTML (option B). Q2 is DNS (option C). Q3 is \"As a tool I guide, check and learn from\" (option A).",
      "\"Reveal answer\" shows the answer without recording a vote. \"Play again\" resets the quiz.",
    ],
  },
  {
    id: "qa",
    title: "Questions & Answers",
    section: "Finale",
    component: SlideQA,
    notes: [
      "Invite questions. If the room is quiet, tap one of the starter questions to get things moving.",
      "You can also type an audience question and press Enter to put it on screen. Press Esc to hand the arrow keys back to the slides.",
      "Starter answers: begin with HTML, CSS and JavaScript. A degree helps but is not required; projects prove skill. Find clients by building a portfolio and solving real problems for local businesses. Job-ready timelines vary with practice, so avoid promising a number. Learn React first, since Next.js builds on it.",
      "Typed questions disappear when you leave the slide.",
    ],
  },
  {
    id: "final",
    title: "Final Message",
    section: "Finale",
    component: Slide13Final,
    notes: [
      "Deliver the line slowly: \"Don't just use technology. Learn to build it.\"",
      "Six actions: start learning, build real projects, practice consistently, learn problem-solving, stay updated, use AI as an advantage.",
      "Challenge them to pick one action to start this week.",
      "Thank the audience and We Tech House. THANK YOU! appears after a short pause.",
    ],
  },
];
