import React from "react";
import { HIEHeader } from "./hie-header.component";
import HIEDashboard from "./hie-profiles-section.component";

const Home: React.FC = () => {
  return (
    <>
      <HIEHeader />
      <HIEDashboard />
    </>
  );
};

export default Home;
