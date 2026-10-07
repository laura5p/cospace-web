"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="side-nav">
      <Link href="/" className="side-nav__logo">CoSpace</Link>
      <nav aria-label="Main">
        <ul>
          <li>
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}