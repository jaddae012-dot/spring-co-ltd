export interface Subsidiary {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: string;
  logo?: string;
  color: string;
  gradient: string;
  services: string[];
  established: string;
  /** Route to the subsidiary's mini-site */
  route: string;
}

/** Map subsidiary id → mini-site route */
export const subsidiaryRoutes: Record<string, string> = {
  agritech: "/agritech",
  "sparrow-studio-gh": "/sparrow-studio",
  fastrider: "/fastrider",
  "prime-college": "/prime-college",
  "fast-cleaners": "/fast-cleaners",
  "spring-cooperative-union": "/spring-cooperative",
};

export const subsidiaries: Subsidiary[] = [
  {
    id: "agritech",
    name: "AGRITECH",
    shortName: "Agritech",
    description:
      "Pioneering agricultural technology solutions for modern farming and sustainable food production across Africa.",
    longDescription:
      "AGRITECH is at the forefront of agricultural innovation, leveraging cutting-edge technology to transform farming practices. We provide smart farming solutions, precision agriculture tools, and agricultural consultancy services to farmers and agribusinesses. Our mission is to enhance food security and promote sustainable agriculture through technology-driven approaches.",
    icon: "🌾",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-600",
    services: [
      "Smart Farming Solutions",
      "Precision Agriculture",
      "Agricultural Consultancy",
      "Farm Management Systems",
      "Crop Monitoring Technology",
      "Supply Chain Optimization",
    ],
    established: "2023",
    route: "/agritech",
  },
  {
    id: "sparrow-studio-gh",
    name: "SPRING STUDIO GH",
    shortName: "SPRING STUDIO",
    description:
      "A creative powerhouse delivering world-class design, branding, and digital media solutions.",
    longDescription:
      "SPRING STUDIO GH is a premier creative agency specializing in brand identity, graphic design, UI/UX design, photography, videography, and digital marketing. We bring brands to life through compelling visual storytelling and innovative design strategies. Our team of talented creatives works with businesses of all sizes to create memorable brand experiences.",
    icon: "🎨",
    color: "#a855f7",
    gradient: "from-purple-500 to-violet-600",
    services: [
      "Brand Identity & Design",
      "UI/UX Design",
      "Photography & Videography",
      "Digital Marketing",
      "Motion Graphics",
      "Print & Packaging Design",
    ],
    established: "2023",
    route: "/sparrow-studio",
  },
  {
    id: "fastrider",
    name: "FASTRIDER",
    shortName: "FastRider",
    description:
      "Fast, reliable, and efficient logistics and delivery services connecting businesses and communities.",
    longDescription:
      "FASTRIDER is a logistics and delivery company committed to providing fast, safe, and reliable transportation services. From last-mile delivery to courier services and fleet management, we ensure your packages reach their destination on time. Our technology-driven approach enables real-time tracking and optimized routing for maximum efficiency.",
    icon: "🚀",
    logo: "/logos/fastrider.png",
    color: "#b91c1c",
    gradient: "from-red-700 to-red-900",
    services: [
      "Last-Mile Delivery",
      "Courier Services",
      "Fleet Management",
      "Real-Time Tracking",
      "Express Delivery",
      "Logistics Consulting",
    ],
    established: "2024",
    route: "/fastrider",
  },
  {
    id: "prime-college",
    name: "PRIME COLLEGE",
    shortName: "Prime College",
    description:
      "Excellence in education — empowering the next generation with knowledge, skills, and values.",
    longDescription:
      "PRIME COLLEGE is an educational institution dedicated to providing quality education and professional training. We offer a range of academic programs, vocational training, and professional development courses designed to equip students with the skills needed to thrive in today's competitive world. Our commitment to excellence in education makes us a leader in the sector.",
    icon: "🎓",
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    services: [
      "Academic Programs",
      "Vocational Training",
      "Professional Development",
      "E-Learning Platform",
      "Career Counseling",
      "Research & Innovation",
    ],
    established: "2024",
    route: "/prime-college",
  },
  {
    id: "fast-cleaners",
    name: "FAST CLEANERS",
    shortName: "Fast Cleaners",
    description:
      "Professional cleaning services delivering spotless results for homes, offices, and commercial spaces.",
    longDescription:
      "FAST CLEANERS provides top-tier professional cleaning services for residential, commercial, and industrial clients. Our trained team uses eco-friendly products and modern equipment to deliver exceptional cleaning results. From routine office cleaning to deep cleaning and specialized services, we ensure every space sparkles.",
    icon: "✨",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
    services: [
      "Residential Cleaning",
      "Commercial Cleaning",
      "Deep Cleaning",
      "Industrial Cleaning",
      "Carpet & Upholstery Cleaning",
      "Post-Construction Cleanup",
    ],
    established: "2024",
    route: "/fast-cleaners",
  },
  {
    id: "spring-cooperative-union",
    name: "SPRING CO-OPERATIVE UNION",
    shortName: "Spring Co-op",
    description:
      "Empowering communities through cooperative savings, investments, and financial inclusion.",
    longDescription:
      "SPRING CO-OPERATIVE UNION is a financial cooperative dedicated to empowering members through savings, loans, and investment opportunities. We believe in the power of collective growth and financial inclusion. Our cooperative model ensures that every member has a voice and benefits from shared prosperity, building stronger communities together.",
    icon: "🤝",
    color: "#eab308",
    gradient: "from-yellow-500 to-amber-600",
    services: [
      "Savings Accounts",
      "Micro Loans",
      "Investment Advisory",
      "Financial Literacy Programs",
      "Group Insurance",
      "Community Development Projects",
    ],
    established: "2025",
    route: "/spring-cooperative",
  },
];
