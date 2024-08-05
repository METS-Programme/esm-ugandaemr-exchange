import React from "react";
import { Tile } from "@carbon/react";
import styles from "./client-registry-tile.scss";
interface ClientRegistryTileProps {
  label: string;
  value: number;
  headerLabel: string;
  children?: React.ReactNode;
}

const ClientRegistryTile: React.FC<ClientRegistryTileProps> = ({
  label,
  value,
  headerLabel,
  children,
}) => {
  return (
    <Tile className={styles.tileContainer} light={true}>
      <div className={styles.tileHeader}>
        <div className={styles.headerLabelContainer}>
          <label className={styles.headerLabel}>{headerLabel}</label>
          {children}
        </div>
        <div></div>
      </div>
      <div>
        <label className={styles.totalsLabel}>{label}</label>
        <p className={styles.totalsValue}>{value}</p>
      </div>
    </Tile>
  );
};

export default ClientRegistryTile;
