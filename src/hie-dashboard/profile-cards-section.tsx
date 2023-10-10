import React from "react";
import { ClickableTile } from "@carbon/react";
import { ArrowUp, ArrowDown } from "@carbon/react/icons";
import styles from "./styles/hie-components.scss";

const ProfileCard = ({
  id,
  profileName,
  incoming,
  outgoing,
  setSelectedTile,
  color,
}) => {
  return (
    <ClickableTile
      onClick={(e) => {
        e.preventDefault();
        setSelectedTile(profileName);
      }}
      className={styles.cardTile}
      style={{ backgroundColor: color }}
      id={id}
    >
      <p className={styles.header}>{profileName}</p>
      <section className={styles.section}>
        {incoming != undefined ? (
          <div className={styles.valueContainer}>
            <p className={styles.label}>
              {/* <span>Incoming</span> */}
              <ArrowDown size={15} />
            </p>
            <p className={styles.value}>{incoming}</p>
          </div>
        ) : (
          <div />
        )}
        <div className={styles.valueContainer}>
          <p className={styles.label}>
            {/* <span>Outgoing</span> */}
            <ArrowUp size={15} />
          </p>
          <p className={styles.value}>{outgoing}</p>
        </div>
      </section>
    </ClickableTile>
  );
};

const ProfileCardsSection = ({ setSelectedTile, profiles, activeCard }) => {
  return (
    <div className={styles.profileSection}>
      {Object.values(profiles).map((profile, n) => (
        <ProfileCard
          id={n}
          profileName={profile["name"]}
          incoming={profile["incomingCount"]}
          outgoing={profile["outgoingCount"]}
          setSelectedTile={setSelectedTile}
          color={activeCard === profile["name"] ? "#e0e0e0" : "#ffffff"}
        />
      ))}
    </div>
  );
};

export default ProfileCardsSection;
