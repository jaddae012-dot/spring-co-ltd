# SPRING.CO.LTD — Corporate Website

> Building Tomorrow's Enterprises Today

A modern corporate website for **SPRING.CO.LTD**, a dynamic multinational conglomerate headquartered in Accra, Ghana. Built with Next.js 16, TypeScript, and Tailwind CSS.

---

## 🏢 About

SPRING.CO.LTD is a multinational holding company that nurtures and grows diverse businesses across Africa. Our subsidiaries span multiple industries including agriculture, creative services, logistics, education, professional cleaning, and community finance.

### Subsidiary Companies

| Company | Industry |
|---------|----------|
| **AGRITECH** | Agricultural Technology |
| **SPRING STUDIO GH** | Creative & Design Services |
| **FASTRIDER** | Logistics & Delivery |
| **PRIME COLLEGE** | Education & Training |
| **FAST CLEANERS** | Professional Cleaning |
| **SPRING CO-OPERATIVE UNION** | Financial Cooperative |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Bundler:** Turbopack

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── subsidiaries/
│       ├── page.tsx        # All subsidiaries listing
│       └── [id]/
│           └── page.tsx    # Individual subsidiary page
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer
└── data/
    ├── company.ts          # Company info (mission, vision, values)
    └── subsidiaries.ts     # Subsidiary company data
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📄 Pages

- **/** — Homepage with hero, company overview, subsidiaries grid, and values
- **/about** — Company story, mission, vision, and core values
- **/subsidiaries** — Full listing of all subsidiary companies
- **/subsidiaries/[id]** — Individual subsidiary detail pages
- **/contact** — Contact form and company information

---

## 📝 License

© 2026 SPRING.CO.LTD. All rights reserved.
