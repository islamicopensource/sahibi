"use client";
import Image from "next/image";
import { State } from "../state";
// import SvgIcon from "./svg-icon";
import Link from "next/link";
const liCls = "";
const linkCls = "block px-2 py-1 underline underline-offset-8";

export default function Navigation(props) {
  const { user } = State();
  const loginLink = user.loading ? (
    ""
  ) : (
    <li className={liCls}>
      <Link href="/login" className={linkCls}>
        تسجيل الدخول
      </Link>
    </li>
  );

  return (
    <header className="relative min-h-14">
      <nav className="z-[7] fixed w-full flex h-14 px-1 sm:px-2 md:px-4 top-0 card border no-select">
        <ul className="flex-auto flex items-center gap-3 no-select">
          {user?.id ? (
            <li className="w-7">
              <Link href="/logout" className="block">
                {/* <SvgIcon name="logout" /> */}
              </Link>
            </li>
          ) : (
            loginLink
          )}
          <li className="w-3"></li>
          <li className={liCls}>
            <Link href="/application" className={linkCls}>
              طلب توظيف
            </Link>
          </li>
          <li className={liCls}>
            <Link href="/survey" className={linkCls}>
              استبيان
            </Link>
          </li>
        </ul>
        <div className="w-24 mx-auto flex justify-center items-center">
          <p className="text-center text-sm">{"title"}</p>
          <div className="w-16">
            {/* <Image src="/logo-only.png" width="100" height="100" alt="logo" /> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
