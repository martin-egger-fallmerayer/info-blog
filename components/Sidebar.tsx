import React from "react";
import styles from "@styles/components/Sidebar.module.scss";
import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

const Sidebar = () => {
  return (
    <aside className={styles.sideBar}>
      <Image src={BbSvg} alt="" />

      <div className={styles.socialMediaContainer}>
        <Image src={InstagramSvg} alt="" />
        <Image src={TwitterSvg} alt="" />
        <Image src={WhatsappSvg} alt="" />
      </div>
    </aside>
  );
};

export default Sidebar;
