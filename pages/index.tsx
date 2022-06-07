import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import Link from "next/link";
import Image from "next/image";
import mainImage from "../img/duck1.png";
import subImage from "../img/duck2.png";
import Head from "next/head";
import useUser from "@libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  return (
    <Layout
      title="My Tutor"
      isLogged={typeof user !== typeof undefined}
      hasTabBar
    >
      <Head>
        <title>마이튜터 - 홈</title>
      </Head>
      <div className="w-full">
        <Image
          className="h-64 w-full"
          alt="메인 이미지"
          src={mainImage}
        ></Image>
      </div>
      {/* <div className="mt-10 flex flex-col items-center justify-center">
        <span className="text-xl font-medium">
          1:1 과외 여기서 알아보고 성장하세요
        </span>
        <div className="relative mt-5 flex w-full items-center px-4">
          <input
            type="text"
            className="h-12 w-full rounded-full border-0 bg-[#FFA1A1] p-2 pl-6 text-sm text-black/80 shadow-md placeholder:text-sm placeholder:font-semibold placeholder:text-black/40 focus:border-0 focus:ring-0"
            placeholder="배우고 싶은 지식을 입력해보세요."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-8 h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}
      {/* </div> */}
      <div className="mt-8 w-full px-4">
        <div className="flex items-baseline">
          <h1 className="font-xl font-semibold">여기서 지금 시작해보세요 !</h1>
          <span className="ml-2 text-xs font-semibold text-red-500">
            Ready!!
          </span>
        </div>
        <span className="text-sm font-medium text-black/70">
          현업자로만 이루어진 검증된 친절한 과외 선생님 !!
        </span>
        <div className="mt-8 cursor-pointer">
          <Link href="/class/octane">
            <a>
              <div className="w-full rounded-2xl pb-6 ">
                <Image
                  alt="서브이미지"
                  className="w-full rounded-2xl"
                  src={subImage}
                ></Image>
              </div>
              <div className="mt-4 flex">
                <div className="mr-3 flex items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
                  C4D
                </div>
                <div className="mr-3 flex  items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
                  에프터 이펙트
                </div>
                <div className="mr-3 flex  items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
                  옥테인
                </div>
              </div>
              <div className="mt-6 flex  flex-col">
                <span className="text-2xl font-medium">
                  그래픽 디자이너 김다애
                </span>
                <p className="mt-4 text-sm font-medium">
                  에프터 이펙트의 기초과정부터 고급과정까지, 실무 및 자기만의
                  영상제작부터 편집까지 맞춤 과외방식으로 쉽고 빠르게 배우실 수
                  있습니다.
                </p>
                <h4 className="mt-6 text-2xl font-semibold text-red-500">
                  월 700,000원
                </h4>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
