import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Layout from "@components/layout";

interface EnterForm {
  email?: string;
  phone?: string;
  password: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  return (
    <Layout title="My Tutor">
      <div className="mt-16 px-4">
        <h3 className="text-center text-xl font-bold">My Tutor에 로그인하기</h3>
        <div className="mt-12">
          <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
            <input
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black"
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              className="my-3 flex justify-center rounded-md border-gray-500 py-4 placeholder:text-center placeholder:text-lg placeholder:font-semibold placeholder:text-black"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", { required: true })}
            />
          </form>
        </div>
        <div className="mt-12 flex w-full items-center justify-center">
          <div className="w-full border-b border-black"></div>
          <div className="absolute mx-auto bg-white p-4 text-lg font-semibold">
            또는
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Enter;
