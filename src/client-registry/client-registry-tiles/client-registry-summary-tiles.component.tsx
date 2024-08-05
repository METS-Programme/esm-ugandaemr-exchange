import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./client-registry-summary-tiles.scss";
import {
  AssignedExtension,
  useConnectedExtensions,
  Extension,
} from "@openmrs/esm-framework";
import { ComponentContext } from "@openmrs/esm-framework/src/internal";

const ClientRegistrySummaryTiles: React.FC = () => {
  const clientRegistryTileSlot = "client-registry-tiles-slot";

  const tilesExtensions = useConnectedExtensions(
    clientRegistryTileSlot
  ) as AssignedExtension[];

  return (
    <div className={styles.cardContainer}>
      {tilesExtensions
        .filter((extension) => Object.keys(extension.meta).length > 0)
        .map((extension) => {
          return (
            <ComponentContext.Provider
              key={extension.id}
              value={{
                featureName: "ClientRegistryTiles",
                moduleName: extension.moduleName,
                extension: {
                  extensionId: extension.id,
                  extensionSlotName: clientRegistryTileSlot,
                  extensionSlotModuleName: extension.moduleName,
                },
              }}
            >
              <Extension />
            </ComponentContext.Provider>
          );
        })}
    </div>
  );
};

export default ClientRegistrySummaryTiles;
