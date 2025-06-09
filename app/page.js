import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Home page</h1>
      <p>Hello from the home page</p>

      <Link href="/test">Test page</Link>
    </div>
  );
}
