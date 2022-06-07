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
  const { register, handleSubmit, reset } = useForm<EnterForm>();

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <Layout title="My Tutor">
      <div className="mt-16 px-4">
        <h3 className="text-center text-xl font-bold">My Tutor에 로그인하기</h3>
        <div className="mt-12">
          <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
            <input
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black"
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
            <input
              type="password"
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black"
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
            <button></button>
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
