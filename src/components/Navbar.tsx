"use client";

const links = [
  { href: "#letter", label: "💌 Letter" },
  { href: "#reasons", label: "🌸 Reasons" },
  { href: "#queen", label: "👑 My Queen" },
  { href: "#photos", label: "🎓 Memories" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 flex items-center gap-6 shadow-md">
      <span className="font-display text-rose-500 text-lg">J ❤️ A</span>
      <div className="hidden sm:flex gap-4">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="font-body text-sm text-gray-500 hover:text-rose-500 transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
