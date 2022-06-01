import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import React, { useState } from "react";

function Lecture() {
  const [category, setCategory] = useState("ing");
  const onCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.name);
  };
  return (
    <Layout title="강의 리스트" large>
      <div className="mt-4 grid grid-cols-2">
        <button
          className={cls(
            category === "ing" ? "border-black" : "text-black/50",
            "flex justify-center border-b pb-2 text-base"
          )}
          name="ing"
          onClick={onCategoryClick}
        >
          수업중
        </button>
        <button
          onClick={onCategoryClick}
          className={cls(
            category === "finish" ? "border-black" : " text-black/50",
            "flex justify-center border-b pb-2 text-base"
          )}
          name="finish"
        >
          완료한 수업
        </button>
      </div>
      {category === "ing" ? (
        <div>
          <div className="flex px-4 py-4">
            <div className="h-28 w-28 rounded-lg bg-red-500 shadow-sm"></div>
            <div className="ml-4 flex flex-col font-medium">
              <h3 className="mb-4 text-base">김다애 모션디자이너</h3>
              <h6 className="mb-4 text-xs">
                현업에서 사용하는 C4D UV 메테리얼 만드는 과외
              </h6>
              <span className="mb-1 text-xs text-black/50">
                매주 월요일 오후 7시
              </span>
              <span className="text-xs text-black/50">22.04.23 ~ 22.05.23</span>
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center border-t border-b py-3 text-xs font-medium">
            수업 입장하기
            <span className="ml-2 text-black/50">(10분전부터 입장 가능)</span>
          </div>
        </div>
      ) : null}
      {category === "finish" ? (
        <div>
          <div className="flex px-4 py-4">
            <div className="h-28 w-28 rounded-lg bg-red-500 shadow-sm"></div>
            <div className="ml-4 flex flex-col font-medium">
              <h3 className="mb-8 text-base">김다애 모션디자이너</h3>
              <h6 className="mb-4 text-xs">
                현업에서 사용하는 C4D UV 메테리얼 만드는 과외
              </h6>

              <span className="text-xs text-black/50">22.05.23 완료</span>
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center border-t border-b py-3 text-xs font-medium">
            수업 노트 복습하기
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

export default Lecture;
