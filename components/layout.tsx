import React, { useState } from "react";
import Link from "next/link";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onOpenClick = () => {
    setIsOpen((prev) => !prev);
  };
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <div className="fixed top-0 flex h-12 w-full max-w-2xl items-center justify-center border-b bg-white  px-10 text-lg font-medium text-gray-800  md:h-24">
        <svg
          onClick={onOpenClick}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute  left-4 h-6 w-6 cursor-pointer md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {title ? (
          <span
            className={cls(
              canGoBack ? "mx-auto" : "",
              "text-lg font-semibold md:text-2xl"
            )}
          >
            {title}
          </span>
        ) : null}
      </div>
      <div className="w-66 fixed right-10 hidden h-24 max-w-2xl cursor-pointer items-center justify-between text-base font-semibold md:flex">
        {/* <div className="mx-3 transition-colors hover:text-red-500">
          마이페이지
        </div> */}
        <div className="mx-3 transition-colors hover:text-red-500">로그인</div>
        <div className="mx-3 transition-colors hover:text-red-500">
          회원가입
        </div>
      </div>
      <div
        className={cls(
          isOpen ? "translate-x-full  md:hidden" : "",
          "fixed -left-full top-0 z-10 h-full w-full bg-gray-100  p-6 transition-all"
        )}
      >
        <div className="flex  justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={onOpenClick}
            className=" h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="cursor-pointer text-xl font-semibold">My Tutor</div>
          <div></div>
        </div>
        <div className="mt-16 grid grid-cols-2 justify-center rounded-lg bg-gray-800 py-5 text-lg shadow-md">
          <div className="flex cursor-pointer justify-center  border-r text-white transition-colors hover:text-red-300">
            로그인
          </div>
          <div className="flex cursor-pointer justify-center  text-white transition-colors hover:text-red-300">
            회원가입
          </div>
        </div>
        {/* <div>마이페이지</div> */}
      </div>
      <div className={cls("pt-12 md:pt-24", hasTabBar ? "pb-24" : "")}>
        {children}
      </div>
    </div>
  );
}
