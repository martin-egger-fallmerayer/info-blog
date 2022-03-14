import type { NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

import styles from "@styles/pages/Cocktails.module.scss";
import Header from "components/Header";
import { Cocktail } from "types/Cocktail";
import SmallResultCard from "components/cards/SmallResultCard";
import Link from "next/link";

type Props = {
  cocktails: Array<Cocktail>;
};

const Home: NextPage<Props> = ({ cocktails }) => {
  return (
    <div className={styles.root}>
      <aside className={styles.sideBar}>
        <Image src={BbSvg} alt=""/>
        <div className={styles.socialMediaContainer}>
          <Image src={InstagramSvg} alt=""/>
          <Image src={TwitterSvg} alt=""/>
          <Image src={WhatsappSvg} alt=""/>
        </div>
      </aside>

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.resultContainer}>
            <div className={styles.topLine}>
              <p>{cocktails.length} results</p>
              <div className={styles.filterInput}>
                <input type="text" placeholder="Filter by name..." />
              </div>
            </div>
            <div className={styles.resultCardContainer}>
              {cocktails.map((cocktail) => (
                <Link href={"/cocktails/" + cocktail.name.toLowerCase()} key={cocktail.name}>
                  <a>
                    <SmallResultCard label={cocktail.name} img={cocktail.img} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/cocktails");
  const cocktails = await res.json();
  return {
    props: {
      cocktails,
    },
  };
}

export default Home;
