import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="container not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>Nothing here. Yet.</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link className="button" href="/">
        Back to home <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
