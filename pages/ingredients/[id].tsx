import type { GetStaticPaths, GetStaticProps, NextPage } from "next";



import styles from "@styles/pages/Ingredient.module.scss";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { getIngredientById } from "@pages/api/ingredients/[id]";
import { getAllIngredientIds } from "@pages/api/ingredients";
import { Ingredient } from '@prisma/client'

type Props = {
  ingredient: Ingredient;
};

const Ingredient: NextPage<Props> = ({ ingredient }) => {
  
  console.dir(ingredient)
  
  return (
    <div className={styles.root}>
      <Sidebar/>

      <main>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            {/* Title */}
            <div className={styles.titleContainer}>
              <h1>{ingredient.name}</h1>
              <h2>
                {ingredient.categoryName} • {ingredient.subcategoryName}
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
  const ids = await getAllIngredientIds()
  const paths = ids.map((id: string) => {
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps = async (context) => {
  const id = String(context.params?.id);
  const ingredient = await getIngredientById(id)
  return {
    props: {
      ingredient,
    },
  };
};

export default Ingredient;
