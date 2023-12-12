import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@carbon/react";

interface ToolsPromptProps {
  close: void;
}

const ToolsPrompt: React.FC<ToolsPromptProps> = ({ close }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="cds--modal-header">
        <h3 className="cds--modal-header__heading">HMIS Reports</h3>
      </div>
      <div className="cds--modal-content"></div>
      <div className="cds--modal-footer">
        <Button kind="primary" onClick={close}>
          {t("close", "Close")}
        </Button>
      </div>
    </>
  );
};

export default ToolsPrompt;
