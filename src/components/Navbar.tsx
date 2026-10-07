import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="logo">CoSpace</Link>
      <nav aria-label="Main">
        <ul>
          <li><Link href="/">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
}