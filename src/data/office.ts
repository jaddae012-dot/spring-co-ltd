export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatar: string; // emoji or image URL
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string; // tailwind color class
  description: string;
  responsibilities: string[];
  head: TeamMember;
  team: TeamMember[];
  tools: { label: string; href: string; icon: string }[];
}

export const departments: Department[] = [
    {
      id: "rnd",
      name: "Research & Development",
      shortName: "R&D",
      icon: "🔬",
      color: "from-yellow-500 to-lime-600",
      description:
        "The R&D department drives innovation, new product development, and continuous improvement across all SPRING.CO.LTD subsidiaries.",
      responsibilities: [
        "Innovation strategy & planning",
        "New product and service development",
        "Process improvement & optimization",
        "Technology scouting & adoption",
        "Research partnerships & grants",
        "Knowledge management & training",
      ],
      head: {
        name: "BRIGHT YEBOAH",
        role: "Head of Research & Development",
        email: "rnd@springcoltd.com",
        avatar: "🔬",
      },
      team: [
        {
          name: "Innovation Lead",
          role: "Innovation Projects",
          email: "innovation@springcoltd.com",
          avatar: "💡",
        },
        {
          name: "Research Analyst",
          role: "Market & Technical Research",
          email: "research@springcoltd.com",
          avatar: "📊",
        },
      ],
      tools: [
        { label: "Company Blog", href: "/blog", icon: "📝" },
        { label: "Contact R&D", href: "/contact", icon: "📧" },
      ],
    },
  {
    id: "ceo-admin",
    name: "CEO & Administration",
    shortName: "Admin",
    icon: "🏛️",
    color: "from-amber-500 to-orange-600",
    description:
      "The executive office provides strategic direction, corporate governance, and overall leadership for SPRING.CO.LTD and all its subsidiaries.",
    responsibilities: [
      "Corporate strategy & vision",
      "Board & stakeholder relations",
      "Company-wide policy decisions",
      "Subsidiary oversight & performance",
      "Business development & expansion",
    ],
    head: {
      name: "JOSEPH ADDAE",
      role: "Chief Executive Officer",
      email: "jaddae012@gmail.com",
      avatar: "👔",
    },
    team: [
      {
        name: "Executive Assistant",
        role: "Executive Assistant to CEO",
        email: "admin@springcoltd.com",
        avatar: "📋",
      },
      {
        name: "Legal Advisor",
        role: "Corporate Legal Counsel",
        email: "legal@springcoltd.com",
        avatar: "⚖️",
      },
    ],
    tools: [
      { label: "Company Overview", href: "/about", icon: "📊" },
      { label: "Subsidiaries", href: "/subsidiaries", icon: "🏢" },
      { label: "Contact", href: "/contact", icon: "📞" },
    ],
  },
  {
    id: "hr",
    name: "Human Resources",
    shortName: "HR",
    icon: "👥",
    color: "from-blue-500 to-indigo-600",
    description:
      "The HR department manages talent acquisition, employee welfare, training, and organizational culture across all SPRING.CO.LTD companies.",
    responsibilities: [
      "Recruitment & talent acquisition",
      "Employee onboarding & training",
      "Performance management",
      "Compensation & benefits",
      "Workplace culture & welfare",
      "Labour compliance & policy",
    ],
    head: {
      name: "HR Director",
      role: "Head of Human Resources",
      email: "hr@springcoltd.com",
      avatar: "👥",
    },
    team: [
      {
        name: "Recruitment Officer",
        role: "Talent Acquisition Specialist",
        email: "careers@springcoltd.com",
        avatar: "🔍",
      },
      {
        name: "Training Coordinator",
        role: "Learning & Development",
        email: "training@springcoltd.com",
        avatar: "📚",
      },
    ],
    tools: [
      { label: "Careers Page", href: "/contact", icon: "💼" },
      { label: "Company Culture", href: "/about", icon: "🌟" },
    ],
  },
  {
    id: "finance",
    name: "Finance & Accounts",
    shortName: "Finance",
    icon: "💰",
    color: "from-green-500 to-emerald-600",
    description:
      "The Finance department oversees budgeting, accounting, financial reporting, and fiscal strategy to ensure sustainable growth across all business units.",
    responsibilities: [
      "Budgeting & financial planning",
      "Accounting & bookkeeping",
      "Financial reporting & audits",
      "Revenue & expense management",
      "Payroll & disbursements",
      "Investment & funding strategy",
    ],
    head: {
      name: "Finance Director",
      role: "Head of Finance & Accounts",
      email: "finance@springcoltd.com",
      avatar: "💰",
    },
    team: [
      {
        name: "Senior Accountant",
        role: "Accounts & Reporting",
        email: "accounts@springcoltd.com",
        avatar: "📒",
      },
      {
        name: "Payroll Officer",
        role: "Payroll & Disbursements",
        email: "payroll@springcoltd.com",
        avatar: "💳",
      },
    ],
    tools: [
      { label: "Subsidiaries", href: "/subsidiaries", icon: "🏢" },
      { label: "Contact Finance", href: "/contact", icon: "📧" },
    ],
  },
  {
    id: "pro",
    name: "Public Relations",
    shortName: "PRO",
    icon: "📢",
    color: "from-purple-500 to-violet-600",
    description:
      "The Public Relations office manages corporate communications, media relations, brand reputation, and public engagement for SPRING.CO.LTD.",
    responsibilities: [
      "Media relations & press",
      "Corporate communications",
      "Brand reputation management",
      "Event coordination & PR campaigns",
      "Crisis communication",
      "Community engagement",
    ],
    head: {
      name: "JOSHUA ANAMAN",
      role: "Head of Public Relations",
      email: "lordmando247@gmail.com",
      avatar: "📢",
    },
    team: [
      {
        name: "Communications Officer",
        role: "Corporate Communications",
        email: "comms@springcoltd.com",
        avatar: "✍️",
      },
      {
        name: "Events Coordinator",
        role: "Events & Campaigns",
        email: "events@springcoltd.com",
        avatar: "🎪",
      },
    ],
    tools: [
      { label: "Company Blog", href: "/blog", icon: "📝" },
      { label: "Brand Info", href: "/about", icon: "🏷️" },
      { label: "Contact PRO", href: "/contact", icon: "📧" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Unit",
    shortName: "Marketing",
    icon: "📈",
    color: "from-pink-500 to-rose-600",
    description:
      "The Marketing Unit drives customer acquisition, brand awareness, digital strategy, and market growth for all SPRING.CO.LTD subsidiaries.",
    responsibilities: [
      "Digital marketing & social media",
      "Brand strategy & campaigns",
      "Market research & analytics",
      "Content creation & advertising",
      "Customer engagement",
      "Growth strategy",
    ],
    head: {
      name: "Marketing Director",
      role: "Head of Marketing",
      email: "marketing@springcoltd.com",
      avatar: "📈",
    },
    team: [
      {
        name: "Digital Marketer",
        role: "Digital & Social Media",
        email: "digital@springcoltd.com",
        avatar: "📱",
      },
      {
        name: "Content Creator",
        role: "Content & Creative",
        email: "content@springcoltd.com",
        avatar: "🎨",
      },
    ],
    tools: [
      { label: "Company Blog", href: "/blog", icon: "📝" },
      { label: "Subsidiaries", href: "/subsidiaries", icon: "🏢" },
      { label: "Contact", href: "/contact", icon: "📧" },
    ],
  },
  {
    id: "operations-it",
    name: "Operations & IT",
    shortName: "Ops & IT",
    icon: "⚙️",
    color: "from-cyan-500 to-teal-600",
    description:
      "Operations & IT manages technology infrastructure, systems administration, internal tools, and operational processes across the organization.",
    responsibilities: [
      "IT infrastructure & systems",
      "Software & platform management",
      "Cybersecurity & data protection",
      "Internal tools & support",
      "Process optimization",
      "Technical project delivery",
    ],
    head: {
      name: "IT Director",
      role: "Head of Operations & IT",
      email: "it@springcoltd.com",
      avatar: "⚙️",
    },
    team: [
      {
        name: "Systems Admin",
        role: "Infrastructure & Systems",
        email: "sysadmin@springcoltd.com",
        avatar: "🖥️",
      },
      {
        name: "Developer",
        role: "Software Development",
        email: "dev@springcoltd.com",
        avatar: "💻",
      },
    ],
    tools: [
      { label: "Website", href: "/", icon: "🌐" },
      { label: "Blog CMS", href: "/blog", icon: "📝" },
      { label: "Contact IT", href: "/contact", icon: "📧" },
    ],
  },
];

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}
