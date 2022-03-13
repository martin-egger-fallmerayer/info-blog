import React from "react";
import styles from "@styles/components/cards/SmallResultCard.module.scss";

type Props = {
  label: string;
  img: string;
};

const SmallResultCard = ({ label, img }: Props) => {
  return (
    <div className={styles.card}>
      <img src={img} alt={label} />
      <div className={styles.labelContainer}>
          {label}
      </div>
    </div>
  );
};

export default SmallResultCard;
