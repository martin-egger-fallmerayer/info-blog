import type { NextPage } from "next";

import styles from "@styles/pages/MyBar.module.scss";
import Header from "components/Header";
import { Category } from "../../types/Category";
import { setCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { Ingredient } from "../../types/Ingredient";
import { useRouter } from "next/router";
import Sidebar from "components/Sidebar";

type Props = {
  categories: Category[];
};

const Setup: NextPage<Props> = ({ categories }) => {
  const router = useRouter();

  const [myIngredients, setMyIngredients] = useState<string[]>([]);

  const handleMybar = (ingredientId: string, target: EventTarget) => {
    // Remove
    if (myIngredients.includes(ingredientId)) {
      setMyIngredients(
        myIngredients.filter((currentId) => currentId != ingredientId)
      );
      target.classList.replace(styles.pSelected, styles.pNotSelected);
    }

    // Add
    else {
      setMyIngredients([...myIngredients, ingredientId]);
      target.classList.replace(styles.pNotSelected, styles.pSelected);
    }

    console.log(myIngredients);
  };

  const handleManyIngredients = (ingredients: Ingredient[]) => {};

  const saveBar = () => {
    setCookies("mybar-ingredients", myIngredients);
    router.push("/mybar");
  };

  return (
    <div className={styles.root}>
      <Sidebar />

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.setup}>
            <div>
              <input type="button" value="SAVE" onClick={(_) => saveBar()} />
            </div>
            {/* Categories */}
            {categories.map((category) => (
              <div key={category.namePlural}>
                <h1>{category.namePlural}</h1>
                <h2>
                  {/* Subcategories */}
                  {category.subcategories.map((subcat) => (
                    <div key={subcat.name}>
                      <label htmlFor="">
                        <input type="checkbox" value={subcat.name} />
                        {subcat.name}
                      </label>
                      <div className={styles.subcatIngredients}>
                        {/* Ingredients */}
                        {subcat.ingredients.map((ingredient) => (
                          <p
                            className={styles.pNotSelected}
                            key={ingredient.id}
                            onClick={(e) =>
                              handleMybar(ingredient.id, e.target)
                            }
                          >
                            {ingredient.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/categories?withIngredients");
  const categories = await res.json();
  return {
    props: {
      categories,
    },
  };
}

export default Setup;
