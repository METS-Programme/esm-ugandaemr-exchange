import { ClickableTile } from "@carbon/react";
import React from "react";
import styles from "./exchange-menu-app-item.scss";
import { Db2DataSharingGroup } from "@carbon/react/icons";

const Item = () => {
  // items
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();

  return (
    <ClickableTile
      className={styles.customTile}
      id="menu-item"
      href={`${openmrsSpaBase}health-exchange`}
    >
      <div className="customTileTitle">{<Db2DataSharingGroup size={24} />}</div>
      <div>Health Exchange</div>
    </ClickableTile>
  );
};
export default Item;
