import type { NextPage } from "next";


import styles from "@styles/pages/MyBar.module.scss";
import Header from "components/Header";
import { useRouter } from "next/router";
import Sidebar from "components/Sidebar";

const MyBar: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <Sidebar/>

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.getStarted}>
            <h1>Tell us what you have and<br/> we tell you what you can make</h1>
            <p>Simply add your ingredients to your bar and start mixing!</p>
            <input
              type="button"
              value="GET STARTED"
              onClick={(_) => router.push("/mybar/setup")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyBar;
