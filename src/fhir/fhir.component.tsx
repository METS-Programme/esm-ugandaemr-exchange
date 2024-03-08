import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./fhir-illustration.component";
import fhirStyles from "./fhir.scss";
import { Button } from "@carbon/react";
import { Add, Edit, View } from "@carbon/react/icons";
import { useGetFhirProfiles } from "./fhir.resource";
import { fhirTableHeaders } from "../constants";
import { EmptyStateComponent } from "../components/empty-state/empty-state.component";
import FhirProfileDataList from "./fhir-detail-data-table.component";

const Fhir: React.FC = () => {
  const { fhirProfiles } = useGetFhirProfiles();

  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`FHIR Profiles`}
      />

      <div className={fhirStyles.createIcon}>
        <Button size="md" kind="primary">
          <Add />
          <span> Create profile</span>
        </Button>
      </div>

      {fhirProfiles.length > 0 ? (
        <div className={fhirStyles.fhirContainer}>
          <FhirProfileDataList data={fhirProfiles} columns={fhirTableHeaders} />
        </div>
      ) : (
        <EmptyStateComponent
          title={`Use the create button to add new profiles`}
        />
      )}
    </>
  );
};

export default Fhir;
