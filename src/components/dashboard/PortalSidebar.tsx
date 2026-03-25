interface PortalItem {
  label: string;
  icon: string;
  active?: boolean;
}

function MenuBlock({ items }: { items: PortalItem[] }) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/85 p-3">
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
              item.active
                ? "bg-blue-700/50 text-slate-100 border border-blue-500/50"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="w-4 text-slate-400">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

const learningItems: PortalItem[] = [
  { label: "Overview", icon: "≡", active: true },
  { label: "Syllabus", icon: "▤" },
  { label: "Lessons", icon: "▥" },
  { label: "Calendar", icon: "◷" },
  { label: "Announcements", icon: "◉" },
  { label: "Resources", icon: "▣" },
  { label: "Discussions", icon: "◍" },
  { label: "Assignments", icon: "✓" },
  { label: "Tests & Quizzes", icon: "☑" },
  { label: "Gradebook", icon: "▦" },
  { label: "Drop Box", icon: "⤓" },
  { label: "Chat Room", icon: "◌" },
  { label: "Email Archive", icon: "✉" },
  { label: "Site Info", icon: "⚙" },
];

const profileItems: PortalItem[] = [
  { label: "Profile", icon: "◫" },
  { label: "Membership", icon: "◎" },
  { label: "Worksite Setup", icon: "⚒" },
  { label: "Preferences", icon: "⚙" },
  { label: "Account", icon: "◔" },
  { label: "My Dashboard", icon: "◍" },
];

export default function PortalSidebar() {
  const menuItems = [...learningItems, ...profileItems];

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <MenuBlock items={menuItems} />
    </aside>
  );
}
