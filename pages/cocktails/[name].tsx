import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";

import styles from "@styles/pages/Cocktail.module.scss";
import Header from "components/Header";
import { Cocktail } from "types/Cocktail";
import { RecipeIngredient } from "types/RecipeIngredient";

type Props = {
  cocktail: Cocktail;
};

const Cocktail: NextPage<Props> = ({ cocktail }) => {
  return (
    <div className={styles.root}>
      <aside className={styles.sideBar}>
        <Image src={BbSvg} alt="" />
        <div className={styles.socialMediaContainer}>
          <Image src={InstagramSvg} alt="" />
          <Image src={TwitterSvg} alt=""/>
          <Image src={WhatsappSvg} alt=""/>
        </div>
      </aside>

      <main>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            {/* Title */}
            <div className={styles.titleContainer}>
              <h1>{cocktail.name}</h1>
              <h2>{cocktail.type}</h2>
            </div>

            {/* Recipe + Garnish */}
            <div className={styles.recipeContainer}>
              {cocktail.ingredients.map((ingredient: RecipeIngredient) => (
                <div className={styles.recipeLine} key={ingredient.name}>
                  {/* Conditional measurement */}
                  {ingredient.measurement !== 0 && (
                    <p>{ingredient.measurement}</p>
                  )}
                  {/* Conditional unit */}
                  {ingredient.unit !== "" && <p>{ingredient.unit}</p>}
                  {/* Obligatory name */}
                  <p>{ingredient.name}</p>
                </div>
              ))}
              {/* Conditional garnish */}
              {cocktail.garnish !== "" && (
                <p className={styles.garnish}>Garnish: {cocktail.garnish}</p>
              )}
            </div>

            {/* Conditional instructions */}
            {cocktail.instructions !== "" && (
              <div className={styles.instructions}>
                <h3>Instructions</h3>
                <p>{cocktail.instructions}</p>
              </div>
            )}

            {/* Conditional info */}
            {cocktail.info !== "" && (
              <div className={styles.instructions}>
                <h3>Info</h3>
                <p>{cocktail.info}</p>
              </div>
            )}
          </div>
          <div className={styles.right}>
            <img src={cocktail.img} alt={cocktail.name} />
            <p>{cocktail.tags.join(", ")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:8080/cocktails/names");
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
    "http://localhost:8080/cocktails/" + context.params?.name
  ); // ?: possibly undefined
  const cocktail = await res.json();
  return {
    props: {
      cocktail,
    },
  };
};

export default Cocktail;
