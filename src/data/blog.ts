// =====================================================
// 📝 HOW TO ADD A NEW BLOG POST:
// =====================================================
// 1. Go to https://github.com/jaddae012-dot/spring-co-ltd
// 2. Click on src → data → blog.ts
// 3. Click the pencil icon (✏️) to edit
// 4. Copy & paste the TEMPLATE below at the TOP of the blogPosts array
// 5. Fill in your details
// 6. Click "Commit changes" — your blog will be live in ~60 seconds!
//
// TEMPLATE (copy everything between the dashes):
// -----------------------------------------------
//   {
//     slug: "your-post-url-slug",
//     title: "Your Blog Post Title",
//     excerpt: "A short summary of your post (1-2 sentences).",
//     content: [
//       "First paragraph of your blog post.",
//       "Second paragraph of your blog post.",
//       "Add as many paragraphs as you want.",
//     ],
//     category: "Company News",
//     author: "SPRING.CO.LTD Team",
//     date: "2026-03-01",
//     readTime: "3 min read",
//     image: "🌟",
//     featured: false,
//   },
// -----------------------------------------------
// CATEGORY OPTIONS: "Company News" | "Agriculture" | "Logistics" |
//   "Education" | "Creative & Design" | "Cleaning Tips" | "Community"
// =====================================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "spring-co-ltd-launches-corporate-website",
    title: "SPRING.CO.LTD Launches New Corporate Website",
    excerpt:
      "We are thrilled to announce the launch of our brand-new corporate website, showcasing all six of our dynamic subsidiaries under one roof.",
    content: [
      "SPRING.CO.LTD is proud to unveil its new corporate website — a modern, comprehensive digital platform that brings together all six of our subsidiary companies in one place.",
      "The website features dedicated sections for each subsidiary: AGRITECH, SPRING STUDIO GH, FASTRIDER, PRIME COLLEGE, FAST CLEANERS, and SPRING CO-OPERATIVE UNION. Each subsidiary has its own pages with detailed information about services, programs, and contact options.",
      "This launch represents a significant milestone in our digital transformation journey. The site was built with cutting-edge technologies including Next.js, TypeScript, and Tailwind CSS, ensuring a fast, responsive, and accessible experience for all users.",
      "\"Our new website reflects our commitment to innovation and excellence,\" said the SPRING.CO.LTD team. \"We want our partners, customers, and stakeholders to have easy access to everything we offer across all our companies.\"",
      "The website also features an integrated contact system, allowing visitors to reach out to any of our subsidiaries directly. Whether you're looking to book a ride with FASTRIDER, enroll at PRIME COLLEGE, or explore agricultural solutions with AGRITECH, it's all just a click away.",
      "We invite you to explore the site and discover the full range of services and opportunities available through the SPRING.CO.LTD family of companies.",
    ],
    category: "Company News",
    author: "SPRING.CO.LTD Team",
    date: "2026-02-23",
    readTime: "3 min read",
    image: "🌐",
    featured: true,
  },
  {
    slug: "agritech-revolutionizing-farming-in-ghana",
    title: "How AGRITECH is Revolutionizing Farming in Ghana",
    excerpt:
      "Discover how our agricultural technology subsidiary is empowering farmers with modern tools, smart irrigation, and data-driven solutions.",
    content: [
      "Agriculture remains the backbone of Ghana's economy, employing nearly half of the workforce. Yet, many farmers still rely on traditional methods that limit their productivity. AGRITECH, a subsidiary of SPRING.CO.LTD, is on a mission to change that.",
      "Through the introduction of precision agriculture tools, smart irrigation systems, and crop monitoring technologies, AGRITECH is helping Ghanaian farmers increase their yields while reducing costs and environmental impact.",
      "Our team of agricultural engineers and data scientists work directly with farming communities across the country, providing hands-on training and support. We believe that technology should be accessible to every farmer, regardless of the size of their operation.",
      "One of our flagship programs is the Smart Farm Initiative, which equips smallholder farmers with affordable sensors and mobile apps that provide real-time data on soil moisture, weather patterns, and crop health.",
      "\"The results have been remarkable,\" says our AGRITECH operations lead. \"Farmers in our pilot program have seen yield increases of 30-40% in just one growing season.\"",
      "As we expand our reach, we remain committed to sustainable farming practices that protect the environment while feeding communities. AGRITECH is not just about technology — it's about building a food-secure future for Ghana and all of Africa.",
    ],
    category: "Agriculture",
    author: "AGRITECH Team",
    date: "2026-02-20",
    readTime: "4 min read",
    image: "🌾",
  },
  {
    slug: "fastrider-expands-delivery-network",
    title: "FASTRIDER Expands Delivery Network Across Greater Accra",
    excerpt:
      "FASTRIDER announces the expansion of its delivery services, now covering all major areas within Greater Accra for faster, more reliable deliveries.",
    content: [
      "FASTRIDER, the logistics and delivery arm of SPRING.CO.LTD, has officially expanded its delivery network to cover all major areas within the Greater Accra Region.",
      "This expansion means faster delivery times, more pickup locations, and improved service reliability for businesses and individuals across the city. Whether you're sending a package across town or receiving an order from your favorite store, FASTRIDER has you covered.",
      "The expansion includes the addition of 50 new riders, 3 new dispatch centers, and an upgraded real-time tracking system that allows customers to follow their deliveries from pickup to drop-off.",
      "\"Speed and reliability are at the core of what we do,\" says the FASTRIDER management team. \"This expansion allows us to serve more customers while maintaining the high service standards our clients expect.\"",
      "Businesses can also take advantage of FASTRIDER's corporate delivery partnerships, which offer dedicated riders, priority handling, and volume discounts for regular shipments.",
      "To book a delivery, visit our website or contact us directly. We're committed to connecting businesses and communities through fast, efficient logistics.",
    ],
    category: "Logistics",
    author: "FASTRIDER Team",
    date: "2026-02-18",
    readTime: "3 min read",
    image: "🚴",
  },
  {
    slug: "prime-college-opens-admissions-2026",
    title: "Prime College Opens Admissions for 2026 Academic Year",
    excerpt:
      "Prime College announces open admissions for 16+ programs across Business, IT, Creative Arts, and Vocational Training for the 2026 academic year.",
    content: [
      "Prime College, the educational institution under SPRING.CO.LTD, is excited to announce that admissions are now open for the 2026 academic year.",
      "With over 16 programs across four major categories — Business & Management, Information Technology, Creative Arts & Media, and Vocational Training — there's a program for every aspiring student and professional.",
      "Popular programs include Software Development, Business Administration, Graphic Design, and Electrical Engineering. All programs are designed with input from industry professionals to ensure graduates are job-ready.",
      "Prime College offers flexible learning modes including full-time, part-time, and online options, making education accessible for working professionals and students alike.",
      "\"We believe that quality education should be accessible to everyone,\" says the Prime College admissions team. \"Our programs are designed to equip students with real-world skills that employers are looking for.\"",
      "Prospective students can apply online through our website. The application process is straightforward: choose a program, fill out the form, submit your documents, and receive your admission letter. Scholarships and financial aid options are also available for qualifying students.",
    ],
    category: "Education",
    author: "Prime College Team",
    date: "2026-02-15",
    readTime: "3 min read",
    image: "🎓",
  },
  {
    slug: "spring-studio-gh-creative-excellence",
    title: "SPRING STUDIO GH: Redefining Creative Excellence in West Africa",
    excerpt:
      "From branding to digital media, SPRING STUDIO GH is delivering world-class creative solutions for businesses across Ghana and beyond.",
    content: [
      "In a world where visual identity can make or break a brand, SPRING STUDIO GH stands as a creative powerhouse delivering design, branding, and digital media solutions that rival the best in the world.",
      "As the creative arm of SPRING.CO.LTD, SPRING STUDIO GH has worked with businesses of all sizes — from startups looking for their first logo to established corporations needing a complete brand overhaul.",
      "Our services include brand identity design, website design, social media content creation, video production, UI/UX design, and print design. Every project is handled with meticulous attention to detail and a deep understanding of the client's vision.",
      "\"Creativity is not just about making things look good,\" says the SPRING STUDIO GH creative director. \"It's about telling stories, solving problems, and creating connections between brands and their audiences.\"",
      "Our portfolio includes work across various industries including tech, hospitality, education, and retail. We pride ourselves on delivering projects on time and exceeding client expectations.",
      "If you're looking to elevate your brand, SPRING STUDIO GH is ready to partner with you. Visit our portfolio page to see our work, and get in touch to discuss your next project.",
    ],
    category: "Creative & Design",
    author: "SPRING STUDIO GH Team",
    date: "2026-02-12",
    readTime: "3 min read",
    image: "🎨",
  },
  {
    slug: "fast-cleaners-professional-cleaning-tips",
    title: "5 Professional Cleaning Tips from FAST CLEANERS Experts",
    excerpt:
      "Our cleaning experts share their top 5 tips for maintaining a spotless home or office between professional cleaning sessions.",
    content: [
      "Keeping your space clean between professional cleaning sessions doesn't have to be overwhelming. Our FAST CLEANERS experts share their top tips for maintaining a spotless environment.",
      "1. **The 10-Minute Daily Tidy**: Spend just 10 minutes each day tidying up high-traffic areas like the kitchen, living room, and bathroom. This prevents clutter from building up and makes weekly cleaning much easier.",
      "2. **Clean as You Go**: The best cleaning habit is to address messes immediately. Wipe down the kitchen counter after cooking, clean spills right away, and put things back in their place after use.",
      "3. **Invest in Quality Cleaning Tools**: Good microfiber cloths, a reliable vacuum, and the right cleaning solutions make a huge difference. Cheap tools often spread dirt rather than remove it.",
      "4. **Focus on High-Touch Surfaces**: Door handles, light switches, remote controls, and phone screens harbor the most germs. Wipe these down daily with disinfectant for a healthier space.",
      "5. **Schedule Professional Deep Cleans**: Even with regular maintenance, scheduling a professional deep clean monthly or quarterly ensures that hidden dirt, dust, and bacteria are thoroughly eliminated. That's where FAST CLEANERS comes in — we handle the tough jobs so you don't have to.",
      "Ready for a professional clean? Book a session with FAST CLEANERS through our website and enjoy a spotless space without the hassle.",
    ],
    category: "Cleaning Tips",
    author: "FAST CLEANERS Team",
    date: "2026-02-10",
    readTime: "4 min read",
    image: "✨",
  },
  {
    slug: "spring-cooperative-financial-inclusion",
    title: "SPRING CO-OPERATIVE UNION: Empowering Communities Through Financial Inclusion",
    excerpt:
      "Learn how SPRING CO-OPERATIVE UNION is making financial services accessible to underserved communities through cooperative savings and investment programs.",
    content: [
      "Financial inclusion remains one of the biggest challenges facing communities across Ghana and West Africa. SPRING CO-OPERATIVE UNION, a subsidiary of SPRING.CO.LTD, is working to bridge this gap through cooperative-based financial services.",
      "Our model is simple but powerful: community members pool their resources through cooperative savings groups, which then provide access to loans, investments, and financial education that would otherwise be out of reach.",
      "Since our founding, we've helped hundreds of families build savings, access affordable credit, and invest in small businesses. Our members span farmers, traders, artisans, and young professionals.",
      "\"The cooperative model works because it's built on trust and community,\" explains the SPRING CO-OPERATIVE UNION leadership. \"When people come together to save and invest, they achieve things that would be impossible alone.\"",
      "Our programs include group savings accounts, micro-loans for small businesses, financial literacy workshops, and investment clubs. We also provide digital tools that make it easy for members to track their savings and loan repayments via mobile phone.",
      "Membership is open to all. If you're interested in joining a cooperative group in your community, visit our membership page or contact us for more information. Together, we can build financial security for everyone.",
    ],
    category: "Community",
    author: "SPRING CO-OPERATIVE Team",
    date: "2026-02-08",
    readTime: "4 min read",
    image: "🤝",
  },
];

export const blogCategories = [
  "All",
  "Company News",
  "Agriculture",
  "Logistics",
  "Education",
  "Creative & Design",
  "Cleaning Tips",
  "Community",
];
