import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import firstAvatar from "../../img/first.jpg";
import secondAvatar from "../../img/second.jpg";
import thirdAvatar from "../../img/third.jpg";
import Image from "next/image";

const Profile: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isLogged, { data, error }] = useMutation("/api/profiles/index");

  const userAvatar =
    user?.avatar === "first"
      ? firstAvatar
      : user?.avatar === "second"
      ? secondAvatar
      : thirdAvatar;

  return (
    <Layout title="My Tutor" hasTabBar>
      <div className="px-4">
        <div className="mt-4 flex items-center space-x-3">
          <div className="h-16 w-16 rounded-full bg-slate-500">
            <Image
              src={userAvatar}
              alt="유저 아바타"
              height={160}
              width={160}
              className="rounded-full"
            ></Image>
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-lg font-medium  text-gray-900">
              {user?.nickname}
            </span>
            {/* <Link href="/profile/edit">
              <a className="text-xs text-gray-400">프로필 수정하기 &rarr;</a>
            </Link> */}
          </div>
        </div>
        <div className="mt-16 flex justify-around">
          <Link href="/profile/lecture">
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEA1A1] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="mt-4 text-sm font-medium text-gray-700">
                강의 리스트
              </span>
            </a>
          </Link>
          <Link href="/profile/schedule">
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEA1A1] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                수업 일정
              </span>
            </a>
          </Link>
          <Link href="/profile/loved">
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEA1A1] text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                관심있는 수업
              </span>
            </a>
          </Link>
        </div>
      </div>
      <Link href="/notice">
        <a className="mt-24 flex items-center border-t border-black/50 px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <span className="ml-4 text-sm font-medium">공지사항</span>
        </a>
      </Link>
      {/* <div className="flex items-center border-t border-black/50 px-4 py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="ml-4 text-sm font-medium">로그아웃</span>
      </div> */}
    </Layout>
  );
};

export default Profile;
