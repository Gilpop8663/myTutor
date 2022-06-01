import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

const Loved: NextPage = () => {
  return (
    <Layout title="관심있는 수업">
      <div>
        <div className="flex px-4 py-4">
          <div className="h-28 w-28 rounded-lg bg-red-500 shadow-sm"></div>
          <div className="ml-4 flex flex-col font-medium">
            <h3 className="mb-8 text-base">김다애 모션디자이너</h3>
            <h6 className="mb-4 text-xs">
              현업에서 사용하는 C4D UV 메테리얼 만드는 과외
            </h6>
          </div>
        </div>
        <div className="flex cursor-pointer items-center justify-center border-t border-b py-3 text-xs font-medium">
          커리큘럼 보러가기
        </div>
      </div>
    </Layout>
  );
};

export default Loved;
