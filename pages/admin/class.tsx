import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "@components/layout";
import Input from "@components/input";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import ErrorMessage from "@components/error";
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import { TutorClass } from "@prisma/client";

interface ClassUploadResponse {
  name: string;
  summary: string;
  price: number;
  tag1?: string;
  tag2?: string;
  tag3?: string;
}

interface UploadClassMutation {
  ok: boolean;
  tutorClass: TutorClass;
}

function ClassUpload() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassUploadResponse>();

  const [uploadClass, { data, loading }] =
    useMutation<UploadClassMutation>("/api/classes");

  const onValid = (value: ClassUploadResponse) => {
    if (loading) return;
    uploadClass(value);
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/classes/${data.tutorClass.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="My Tutor">
      <form className="px-4" action="" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("name", {
            required: "강의 제목을 입력해야 합니다",
            minLength: {
              value: 5,
              message: "최소 5글자 이상 작성해야 합니다",
            },
            maxLength: {
              value: 50,
              message: "50글자 이하로 작성해야 합니다",
            },
          })}
          label="강의 제목"
          type="text"
          name="name"
          required
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <TextArea
          register={register("summary", {
            required: "강의 요약 설명을 입력해야 합니다",
            minLength: {
              value: 10,
              message: "최소 10글자 이상 작성해야 합니다",
            },
            maxLength: {
              value: 200,
              message: "200글자 이하로 작성해야 합니다",
            },
          })}
          label="강의 요약 설명"
          type="text"
          name="summary"
          required
        />
        {errors.summary && (
          <ErrorMessage>{errors.summary.message}</ErrorMessage>
        )}
        <Input
          register={register("price", {
            required: "가격을 입력해야 합니다",
          })}
          label="가격"
          type="number"
          name="price"
          required
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        <div className="mb-5 grid grid-cols-3 gap-4">
          <div>
            <Input
              register={register("tag1", {
                minLength: {
                  value: 2,
                  message: "3글자 이상 적어주세요",
                },
                maxLength: {
                  value: 10,
                  message: "10글자 이하로 적어주세요",
                },
              })}
              label="태그 1"
              type="text"
              name="tag1"
              required={false}
            />
            {errors.tag1 && <ErrorMessage>{errors.tag1.message}</ErrorMessage>}
          </div>
          <div>
            <Input
              register={register("tag2", {
                minLength: {
                  value: 2,
                  message: "3글자 이상 적어주세요",
                },
                maxLength: {
                  value: 10,
                  message: "10글자 이하로 적어주세요",
                },
              })}
              label="태그 2"
              type="text"
              name="tag2"
              required={false}
            />
            {errors.tag2 && <ErrorMessage>{errors.tag2.message}</ErrorMessage>}
          </div>
          <div>
            <Input
              register={register("tag3", {
                minLength: {
                  value: 2,
                  message: "3글자 이상 적어주세요",
                },
                maxLength: {
                  value: 10,
                  message: "10글자 이하로 적어주세요",
                },
              })}
              label="태그 3"
              type="text"
              name="tag3"
              required={false}
            />
            {errors.tag3 && <ErrorMessage>{errors.tag3.message}</ErrorMessage>}
          </div>
        </div>
        <Button text={loading ? "로딩중" : "업로드"}></Button>
      </form>
      <div></div>
    </Layout>
  );
}

export default ClassUpload;
