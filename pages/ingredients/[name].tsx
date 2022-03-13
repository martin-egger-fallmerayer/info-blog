import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

import styles from "@styles/pages/Ingredient.module.scss";
import Header from "components/Header";
import { Ingredient } from "types/Ingredient";
import { API_BASE } from "constants/api";

type Props = {
  ingredient: Ingredient;
};

const Ingredient: NextPage<Props> = ({ ingredient }) => {
  return (
    <div className={styles.root}>
      <aside className={styles.sideBar}>
        <Image src={BbSvg} alt=""/>
        <div className={styles.socialMediaContainer}>
          <Image src={InstagramSvg} alt=""/>
          <Image src={TwitterSvg} alt="" />
          <Image src={WhatsappSvg} alt=""/>
        </div>
      </aside>

      <main>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            {/* Title */}
            <div className={styles.titleContainer}>
              <h1>{ingredient.name}</h1>
              <h2>
                {ingredient.category} • {ingredient.subcategory}
              </h2>
            </div>

            {/* Conditional ABV */}
            {ingredient.alcoholic && (
              <p className={styles.abv}>ABV: {ingredient.abv}%</p>
            )}

            <div className={styles.description}>
              <h3>Description</h3>
              <p>{ingredient.description}</p>
            </div>
          </div>
          <div className={styles.right}>
            <img src={ingredient.img} alt={ingredient.name} />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(API_BASE + "/ingredients/names");
  const names = await res.json();
  const paths = names.map((name: string) => {
    return { params: { name: name.toLowerCase() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    API_BASE + "/ingredients/" + context.params?.name
  ); // ?: possibly undefined
  const ingredient = await res.json();
  return {
    props: {
      ingredient,
    },
  };
};

export default Ingredient;
