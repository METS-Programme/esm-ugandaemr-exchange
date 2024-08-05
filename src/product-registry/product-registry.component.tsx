import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./product-registry-illustration.component";
import { useTranslation } from "react-i18next";

const ProductRegistry: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={t("productRegistry", `Product Registry`)}
      />
    </>
  );
};

export default ProductRegistry;
