import React from "react";
import Image from "next/image";
import Layout from "@components/layout";
import mainImage from "../../img/c4d.png";

function Octane() {
  return (
    <Layout title="My Tutor">
      <Image src={mainImage} alt="커리큘럼"></Image>
    </Layout>
  );
}

export default Octane;
