export interface ReportChapter {
  number: string;
  title: string;
  content: string;
}

export const businessProfileChapters: ReportChapter[] = [
  {
    number: "Chapter 1",
    title: "Abstract",
    content:
      "SPRING CO. LTD is a diversified business group established to structure multiple enterprise units under one strategic vision. This profile presents the company as a professional, multi-sector organization with a subsidiary-based operating model, a clear mission, and a future-focused growth direction. The document is prepared as a formal internal profile for leadership review, partnership discussions, and executive presentation.",
  },
  {
    number: "Chapter 2",
    title: "Introduction",
    content:
      "The purpose of this profile is to present a concise but detailed overview of SPRING CO. LTD in a format similar to a research paper. The company operates across several business areas, including agriculture, creative services, mobility, education, cleaning, and cooperative financial inclusion. Its corporate identity is built on professionalism, structured execution, and long-term value creation.",
  },
  {
    number: "Chapter 3",
    title: "Company Background",
    content:
      "SPRING CO. LTD was founded in 2023 and is headquartered in Accra, Ghana. The organization was developed to serve as a corporate umbrella for diverse business units that contribute to growth, service delivery, and community impact. By combining multiple units under one brand, the company maintains strategic direction while allowing each subsidiary to operate with specialized focus.",
  },
  {
    number: "Chapter 4",
    title: "Business Model Analysis",
    content:
      "The business model of SPRING CO. LTD is based on a group structure. Under this model, each subsidiary plays a distinct role within the wider corporate system. This approach creates operational clarity, reduces dependence on a single market, and supports sustainable growth. The parent company provides leadership, oversight, and strategic alignment, while the subsidiaries deliver focused services and market-specific value.",
  },
  {
    number: "Chapter 5",
    title: "Organizational Structure",
    content:
      "The company is organized around central leadership and subsidiary-level execution. This structure supports accountability, service quality, and coordination across all business units. It also positions the company for stronger internal governance, better performance management, and a scalable business architecture suitable for expansion and partnership engagement.",
  },
  {
    number: "Chapter 6",
    title: "Subsidiary Profile",
    content:
      "SPRING CO. LTD operates through AGRITECH, SPRING STUDIO GH, FASTRIDER, PRIME COLLEGE, FAST CLEANERS, and SPRING CO-OPERATIVE UNION. Each unit contributes to the company’s wider corporate purpose by serving a defined sector or service need. Together, these subsidiaries form a diversified group that supports innovation, customer service, education, mobility, cleaning, and cooperative growth.",
  },
  {
    number: "Chapter 7",
    title: "Mission and Vision",
    content: "To build and nurture world-class companies that drive innovation, create value, and positively impact communities across Africa and beyond. To be Africa’s most trusted and impactful multinational holding company, recognized for excellence, innovation, and sustainable growth.",
  },
  {
    number: "Chapter 8",
    title: "Core Values",
    content:
      "The company’s operating values include innovation, integrity, excellence, community, sustainability, and collaboration. These values guide decision-making, service delivery, brand positioning, and long-term planning across the group.",
  },
  {
    number: "Chapter 9",
    title: "Future Outlook",
    content:
      "The future direction of SPRING CO. LTD is centered on strengthening its business units, improving digital systems, expanding its market reach, and building a stronger corporate identity. The company aims to grow as a reliable and scalable enterprise group capable of serving clients, communities, and partners with excellence.",
  },
  {
    number: "Chapter 10",
    title: "Conclusion",
    content:
      "SPRING CO. LTD represents a structured, professional, and forward-looking business group. Its subsidiary model, clear corporate identity, and future-oriented strategy make it suitable for formal business presentation, partnership development, contract engagement, and long-term expansion.",
  },
];

export const businessProfileSubsidiaryRows = [
  ["AGRITECH", "Agriculture innovation and agribusiness support"],
  ["SPRING STUDIO GH", "Creative services, branding, and media support"],
  ["FASTRIDER", "Mobility and delivery services"],
  ["PRIME COLLEGE", "Education and student development"],
  ["FAST CLEANERS", "Professional cleaning services"],
  ["SPRING CO-OPERATIVE UNION", "Savings and cooperative financial inclusion"],
] as const;

export const businessProfileJourneySteps = [
  {
    title: "How it began",
    detail:
      "SPRING CO. LTD was established in 2023 as a structured group brand built to connect multiple service areas under one corporate identity.",
  },
  {
    title: "What has been built so far",
    detail:
      "The website now carries the public company identity, the subsidiary network, and the private business profile that supports formal presentation.",
  },
  {
    title: "Where the project is now",
    detail:
      "The project is at the stage of formal documentation, internal record-keeping, and structured presentation for leadership and partner use.",
  },
  {
    title: "Where it is heading next",
    detail:
      "The next stage is to maintain accurate notes, improve the company profile, and build proposal-ready documents from the same master record.",
  },
] as const;

export const businessProfileSummary =
  "A formal research-paper style company profile for SPRING CO. LTD with chapter structure, a project journey, current status, subsidiary table, contact details, and secretary-style activity record.";
