import Layout from "@components/layout";
import React from "react";

function Notice() {
  return (
    <Layout title="My Tutor">
      <div className="flex justify-center py-5 px-6 text-center">
        22.06.02 현재 베타 서비스입니다.
      </div>
      <div className="text-center">
        문의 사항이 있으신 분들은 wolfye@naver.com 으로 연락바랍니다.
      </div>
    </Layout>
  );
}

export default Notice;
