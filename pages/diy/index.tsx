import type { NextPage } from "next";



import styles from "@styles/pages/Diy.module.scss";
import Header from "components/Header";
import Sidebar from "components/Sidebar";

const Diy: NextPage = () => {
  return (
    <div className={styles.root}>
      <Sidebar />

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

export default Diy;