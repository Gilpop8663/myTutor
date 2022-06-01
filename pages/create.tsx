import Input from "@components/input";
import Layout from "@components/layout";
import React from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  email: string;
  password: string;
  password2: string;
  phone: number;
}

export default function create() {
  const { register, handleSubmit } = useForm<CreateForm>();
  return (
    <Layout title="My Tutor">
      <div className="px-4">
        <form action="" className="mt-16">
          <Input
            label="닉네임"
            name="name"
            type="text"
            required={true}
            register={register("name", { required: true })}
            kind="name"
          />
          <Input
            label="이메일"
            name="email"
            type="email"
            required={true}
            register={register("email", { required: true })}
            kind="text"
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            required={true}
            register={register("password", { required: true })}
            kind="text"
          />
          <Input
            label="비밀번호를 재입력해주세요"
            name="password2"
            type="password"
            required={true}
            register={register("password2", { required: true })}
            kind="text"
          />
          <Input
            label="휴대전화 ( -을 뺴고 입력해주세요)"
            name="phone"
            type="number"
            required={true}
            register={register("phone", { required: true })}
            kind="phone"
          />
          <p className="mt-12 w-full text-center text-sm font-medium">
            회원으로 가입하면{" "}
            <span className="cursor-pointer text-[#F2B71F]">서비스 약관</span>과{" "}
            <span className="cursor-pointer text-[#F2B71F]">
              개인정보 처리방침
            </span>
            을 읽고 이해한 것으로 간주됩니다.
          </p>
          <button className="mt-12 w-full rounded-lg bg-[#FF8A8A] py-3 font-semibold text-white shadow-sm">
            회원 가입 완료하기
          </button>
        </form>
      </div>
    </Layout>
  );
}
