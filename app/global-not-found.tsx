import "./globals.css";
import Link from "next/link";

export const metadata = { title: "404 — Mori" };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="container not-found">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p lang="zh-CN">页面不存在。</p>
          <div className="project-actions">
            <Link className="button" href="/">
              English home →
            </Link>
            <Link className="button" href="/zh" lang="zh-CN">
              中文主页 →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
