import React from "react";
import Image from "next/image";
import Layout from "@components/layout";
import mainImage from "../../img/c4d.png";
import useUser from "@libs/client/useUser";

function Octane() {
  const { user, isLoading } = useUser();

  return (
    <Layout title="My Tutor" canGoBack>
      <Image src={mainImage} alt="커리큘럼"></Image>
    </Layout>
  );
}

export default Octane;
