import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Layout from "@components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import ErrorMessage from "@components/error";

interface EnterForm {
  email?: string;
  phone?: string;
  password: string;
}

interface EnterMutation {
  ok: boolean;
  message: string;
}

const Enter: NextPage = () => {
  const router = useRouter();
  const [enter, { loading, data, error }] =
    useMutation<EnterMutation>("/api/users/enter");
  const onValid = (value: EnterForm) => {
    if (loading) return;
    enter(value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterForm>();

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <Layout title="My Tutor">
      <Head>
        <title>마이튜터 - 로그인</title>
      </Head>
      <div className="mt-16 px-4">
        <h3 className="text-center text-xl font-bold">My Tutor에 로그인하기</h3>
        <div className="mt-12">
          <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
            <input
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black focus:border-gray-500  focus:ring-0"
              type="email"
              required={true}
              placeholder="이메일 주소를 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "옳지 않은 방식의 이메일입니다",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <input
              type="password"
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black focus:border-gray-500  focus:ring-0"
              required={true}
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해야 합니다",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자리 이상 사용해야 합니다",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {!data?.ok && (
              <ErrorMessage visible={typeof data?.message === typeof "s"}>
                <span>{data?.message}</span>
              </ErrorMessage>
            )}
            <button className="my-3 flex w-1/2 justify-center  self-center rounded-md border border-gray-500 py-4 text-center text-lg font-semibold transition hover:bg-blue-200">
              로그인
            </button>
          </form>
        </div>
        {/* <div className="mt-12 flex w-full items-center justify-center">
          <div className="w-full border-b border-black"></div>
          <div className="absolute mx-auto bg-white p-4 text-lg font-semibold">
            또는
          </div>
        </div>
        <div className="mt-20 flex w-full cursor-pointer items-center justify-center rounded-full border border-black p-4 text-lg font-semibold shadow-sm">
          구글로 로그인하기
        </div>
        <div className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-full border border-black p-4 text-lg font-semibold shadow-sm">
          카카오로 로그인하기
        </div> */}
        <div className="mt-20 flex justify-center">
          <span className="text-lg font-medium text-black/50">
            계정이 없으신가요?
          </span>
          <Link href="/create">
            <a className="ml-6 cursor-pointer text-lg font-semibold text-blue-500">
              가입하기
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Enter;
