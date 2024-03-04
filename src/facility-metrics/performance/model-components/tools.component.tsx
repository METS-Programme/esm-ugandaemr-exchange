import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@carbon/react";
import DataList from "../../../components/data-table/data-table.component";
import { Tools, ToolsHeaders } from "./model-constants";

interface ToolsPromptProps {
  close: void;
}

const ToolsPrompt: React.FC<ToolsPromptProps> = ({ close }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="cds--modal-header">
        <h3 className="cds--modal-header__heading">HMIS Tools</h3>
      </div>

      <div className="cds--modal-content">
        <DataList columns={ToolsHeaders} data={Tools} />
      </div>

      <div className="cds--modal-footer">
        <Button kind="primary" onClick={close}>
          {t("close", "Close")}
        </Button>
      </div>
    </>
  );
};

export default ToolsPrompt;
