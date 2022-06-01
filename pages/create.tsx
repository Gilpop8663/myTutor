import Input from "@components/input";
import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  email: string;
  password: string;
  password2: string;
  phone: number;
}

function Create() {
  const { register, handleSubmit } = useForm<CreateForm>();
  const [image, setImage] = useState("first");
  const onImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e.currentTarget.name);
    e.preventDefault();
    setImage(e.currentTarget.name);
  };
  const onValid = () => {
    console.log("hi");
  };
  return (
    <Layout title="My Tutor">
      <div className="px-4">
        <form action="" onSubmit={handleSubmit(onValid)} className="mt-16">
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

          <h3 className="pt-8 text-sm font-medium">
            사용할 프로필 이미지를 골라주세요
          </h3>
          <div className="flex items-center justify-between py-8 px-4">
            <button
              onClick={onImageClick}
              className={cls(
                image === "first" ? "ring-2 ring-blue-500" : "",
                "h-24 w-24 rounded-full bg-red-500"
              )}
              name="first"
            />
            <button
              onClick={onImageClick}
              className={cls(
                image === "second" ? "ring-2 ring-blue-500" : "",
                "h-24 w-24 rounded-full bg-red-500"
              )}
              name="second"
            />
            <button
              onClick={onImageClick}
              className={cls(
                image === "third" ? "ring-2 ring-blue-500" : "",
                "h-24 w-24 rounded-full bg-red-500"
              )}
              name="third"
            />
          </div>
          <p className="mt-12 w-full text-center text-sm font-medium">
            회원으로 가입하면{" "}
            <a
              href="/policies/conditions"
              target={"_blank"}
              className="cursor-pointer text-[#F2B71F]"
            >
              서비스 약관
            </a>
            과{" "}
            <a
              href="/policies/privacy"
              target={"_blank"}
              className="cursor-pointer text-[#F2B71F]"
            >
              개인정보 처리방침
            </a>
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

export default Create;
