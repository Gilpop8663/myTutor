import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Input from "@components/input";
import ErrorMessage from "@components/error";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import firstPick from "../img/first.jpg";
import secondPick from "../img/second.jpg";
import thirdPick from "../img/third.jpg";

interface CreateForm {
  nickname: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  avatar: string;
  token: string;
}

interface NameResult {
  ok: boolean;
  message: string;
}

interface TokenResult {
  ok: boolean;
  message: string;
}

interface MutationResult {
  ok: boolean;
  message: string;
}

function Create() {
  const router = useRouter();
  const [create, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/create"); // 아이디 가입 및 확인 API
  const [sendToken, { loading: sendLoading, data: sendData }] =
    useMutation<TokenResult>("/api/users/sendToken"); // 인증번호 생성 및 확인 API
  const [nameCheck, { loading: nameLoading, data: nameData }] =
    useMutation<NameResult>("/api/users/nameCheck"); // 이름 중복 확인 API

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateForm>();
  const currentName = watch("nickname", "");
  const currentPhoneNum = watch("phone", "");
  const currentPassword = watch("password", "");
  const [isSend, setIsSend] = useState(false); // 인증번호 버튼 클릭 유무 확인 변수
  const [image, setImage] = useState("first"); // 프로필 이미지 변수

  const onImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 프로필 아바타 이미지 클릭 이벤트
    e.preventDefault();
    setImage(e.currentTarget.name);
  };

  const onValid = (value: CreateForm) => {
    // 회원정보 폼 제출
    if (loading) return;
    if (value.password !== value.password2) {
      return;
    }

    value = { ...value, avatar: image };
    create(value);
  };

  const onSendClick = () => {
    // 인증번호 클릭 이벤트
    setIsSend(true);
    sendToken({ phone: currentPhoneNum });
  };

  const onNameCheckClick = () => {
    // 이름 중복 확인 이벤트
    if (nameLoading) return;
    nameCheck({ nickname: currentName });
  };

  useEffect(() => {
    if (data?.ok) {
      // 회원가입이 정상적으로 되었다면 홈으로 이동
      router.push("/");
    }
  }, [data, router]);

  return (
    <Layout title="My Tutor">
      <div className="px-4">
        <form action="" onSubmit={handleSubmit(onValid)} className="mt-16">
          <Input
            label="닉네임"
            name="name"
            type="text"
            onClick={onNameCheckClick}
            required={true}
            register={register("nickname", {
              required: "닉네임을 입력해주세요",
              minLength: {
                value: 3,
                message: "최소 3글자 이상으로 입력해주세요",
              },
              pattern: {
                value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
                message: "옳지 않은 방식의 닉네임입니다",
              },
            })}
            kind="name"
          />
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
          {!nameData?.ok && (
            <ErrorMessage visible={typeof nameData?.message === typeof "s"}>
              <span>{nameData?.message}</span>
            </ErrorMessage>
          )}
          {nameData?.ok && (
            <div className="mt-4 flex items-center text-sm font-medium text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-2">{nameData.message}</span>
            </div>
          )}
          <Input
            label="이메일"
            name="email"
            type="email"
            required={true}
            register={register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "옳지 않은 방식의 이메일입니다",
              },
            })}
            kind="text"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Input
            label="비밀번호"
            name="password"
            type="password"
            required={true}
            register={register("password", {
              required: "비밀번호를 입력해야 합니다",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자리 이상 사용해야 합니다",
              },
            })}
            kind="text"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <Input
            label="비밀번호를 재입력해주세요"
            name="password2"
            type="password"
            required={true}
            register={register("password2", {
              required: "비밀번호를 입력해야 합니다",
              validate: (value) =>
                value === currentPassword || "비밀번호가 같지 않습니다",
            })}
            kind="text"
          />
          {errors.password2 && (
            <ErrorMessage>{errors.password2.message}</ErrorMessage>
          )}
          <Input
            label="휴대전화 ( -을 뺴고 입력해주세요)"
            name="phone"
            type="number"
            required={true}
            register={register("phone", {
              required: "휴대폰 번호를 입력해주세요",
              pattern: {
                value: /^01([0|1|6|7|8|9]?)+([0-9]{7,8})$/,
                message: "올바른 번호 형식이 아닙니다",
              },
            })}
            kind="phone"
            onClick={onSendClick}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          {isSend && (
            <Input
              register={register("token", {
                required: "인증번호를 입력해주세요",
                maxLength: {
                  value: 6,
                  message: "6자리를 입력해주세요",
                },
                minLength: {
                  value: 6,
                  message: "6자리를 입력해주세요",
                },
              })}
              label="인증번호"
              name="confirm"
              type="number"
              required={true}
              kind="text"
            />
          )}
          {errors.token && <ErrorMessage>{errors.token.message}</ErrorMessage>}
          {!data?.ok && (
            <ErrorMessage visible={typeof data?.message == typeof "s"}>
              <span>{data?.message}</span>
            </ErrorMessage>
          )}
          {!sendData?.ok && (
            <ErrorMessage visible={typeof sendData?.message == typeof "s"}>
              <span>{sendData?.message}</span>
            </ErrorMessage>
          )}
          <h3 className="pt-8 text-sm font-medium">
            사용할 프로필 이미지를 골라주세요
          </h3>
          <div className="flex items-center justify-between py-8 px-4">
            <button
              onClick={onImageClick}
              className={cls(
                image === "first" ? "ring-4 ring-blue-500" : "",
                "h-24 w-24 rounded-full "
              )}
              name="first"
            >
              <Image
                className="rounded-full"
                src={firstPick}
                width={100}
                height={100}
                alt="첫번째 이미지"
              />
            </button>
            <button
              onClick={onImageClick}
              className={cls(
                image === "second" ? "ring-4 ring-blue-500" : "",
                "h-24 w-24 rounded-full"
              )}
              name="second"
            >
              <Image
                className="rounded-full"
                src={secondPick}
                width={100}
                height={100}
                alt="두번째 이미지"
              />
            </button>
            <button
              onClick={onImageClick}
              className={cls(
                image === "third" ? "ring-4 ring-blue-500" : "",
                "h-24 w-24 rounded-full"
              )}
              name="third"
            >
              <Image
                className="rounded-full"
                src={thirdPick}
                width={100}
                height={100}
                alt="세번째 이미지"
              />
            </button>
          </div>
          <div className="mt-12 w-full text-center text-sm font-medium">
            회원으로 가입하면{" "}
            <Link href="/policies/conditions">
              <a target={"_blank"} className="cursor-pointer text-[#F2B71F]">
                서비스 약관
              </a>
            </Link>
            과{" "}
            <Link href="/policies/privacy">
              <a target={"_blank"} className="cursor-pointer text-[#F2B71F]">
                개인정보 처리방침
              </a>
            </Link>
            을 읽고 이해한 것으로 간주됩니다.
          </div>
          <button className="mt-12 mb-12 w-full rounded-lg bg-[#FF8A8A] py-3 font-semibold text-white shadow-sm">
            회원 가입 완료하기
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Create;
