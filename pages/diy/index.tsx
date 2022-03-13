import type { NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

import styles from "@styles/pages/Diy.module.scss";
import Header from "components/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <aside className={styles.sideBar}>
        <Image src={BbSvg} alt="" />
        <div className={styles.socialMediaContainer}>
          <Image src={InstagramSvg} alt=""/>
          <Image src={TwitterSvg} alt=""/>
          <Image src={WhatsappSvg} alt=""/>
        </div>
      </aside>

      <main>
        <Header/>

        <div className={styles.mainContent}>
          <div className={styles.resultContainer}>
            <div className={styles.topLine}>
              <p>[n] results</p>
              <div className={styles.filterInput}>
                <input type="text" placeholder="Filter by name..." />
              </div>
            </div>
            <div className={styles.resultCardContainer}>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
              <div className={styles.card}>[NAME]</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
