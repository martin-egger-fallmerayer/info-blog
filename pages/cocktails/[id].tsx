import type { GetStaticPaths, GetStaticProps, NextPage } from "next";


import styles from "@styles/pages/Cocktail.module.scss";
import Header from "components/Header";
import { Cocktail } from "types/Cocktail";
import { RecipeIngredient } from "types/RecipeIngredient";
import { getAllCocktailsIds } from "@pages/api/cocktails";
import { getCocktailById } from "@pages/api/cocktails/[id]";
import { ParsedUrlQuery } from "querystring";
import Sidebar from "components/Sidebar";

type Props = {
  cocktail: Cocktail;
};

type Context = {
  params: [ParsedUrlQuery | undefined];
};

const Cocktail: NextPage<Props> = ({ cocktail }) => {
  return (
    <div className={styles.root}>
     <Sidebar />

      <main>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            {/* Title */}
            <div className={styles.titleContainer}>
              <h1>{cocktail._id}</h1>
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
            <img src={cocktail.img} alt={cocktail._id} />
            <p>{cocktail.tags.join(", ")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllCocktailsIds();
  const paths = ids.map((id: string) => {
    return { params: { id: id.toLowerCase() } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = String(context.params?.id);
  const cocktail = await getCocktailById(id);
  return {
    props: {
      cocktail,
    },
  };
};

export default Cocktail;
