import type { NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

import styles from "@styles/pages/Ingredients.module.scss";
import Header from "components/Header";
import { Ingredient } from "types/Ingredient";
import SmallResultCard from "components/cards/SmallResultCard";
import Link from "next/link";

type Props = {
  ingredients: Array<Ingredient>;
};

const Ingredients: NextPage<Props> = ({ ingredients }) => {
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
              <p>[n] results</p>
              <div className={styles.filterInput}>
                <input type="text" placeholder="Filter by name..." />
              </div>
            </div>
            <div className={styles.resultCardContainer}>
              {ingredients.map((ingredient) => (
                <Link href={"/ingredients/" + ingredient.name.toLowerCase()} key={ingredient.name}>
                  <a>
                    <SmallResultCard
                      label={ingredient.name}
                      img={ingredient.img}
                    />
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
  const res = await fetch("http://localhost:8080/ingredients");
  const ingredients = await res.json();
  return {
    props: {
      ingredients,
    },
  };
}

export default Ingredients;
