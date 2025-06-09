"use client";
import Image from "next/image";

// import Image from "next/image";
// import { State } from "../state";

export default function Footer(props) {
  // const { user } = State();

  // if (!user?.id) return null;
  return (
    <footer className="flex row-start-3 gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
        Learn more
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
        Go to nextjs.org →
      </a>
    </footer>
  );
}
