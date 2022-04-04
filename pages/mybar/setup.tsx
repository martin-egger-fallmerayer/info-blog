import type { NextPage } from "next";

import styles from "@styles/pages/MyBar.module.scss";
import Header from "components/Header";
import { Category } from "@prisma/client";
import { setCookies } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "components/Sidebar";
import { getAllCategoriesWithIngredients } from "@pages/api/categories";

type Props = {
  categories: Category[];
  myIngredientsFromCookie: string[];
};

const Setup: NextPage<Props> = ({ categories, myIngredientsFromCookie }) => {
  const router = useRouter();

  const [myIngredients, setMyIngredients] = useState<string[]>(
    myIngredientsFromCookie
  );

  const initMyBar = (ingredientName: string, target: EventTarget) => {
    if (myIngredients.includes(ingredientName)) {
      (target as any).classList.replace(styles.pSelected, styles.pNotSelected);
    } else {
      (target as any).classList.replace(styles.pNotSelected, styles.pSelected);
    }
  };

  const handleMybar = (ingredientName: string, target: EventTarget) => {
    // Remove
    if (myIngredients.includes(ingredientName)) {
      setMyIngredients(
        myIngredients.filter((currentId) => currentId != ingredientName)
      );
      // @ts-nocheck
      (target as any).classList.replace(styles.pSelected, styles.pNotSelected);
    }

    // Add
    else {
      setMyIngredients([...myIngredients, ingredientName]);

      (target as any).classList.replace(styles.pNotSelected, styles.pSelected);
    }
  };

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
                  {(category as any).Subcategory.map((subcat: any) => (
                    <div key={subcat.name}>
                      <label htmlFor="">
                        <input type="checkbox" value={subcat.name} />
                        {subcat.name}
                      </label>
                      <div className={styles.subcatIngredients}>
                        {/* Ingredients */}
                        {subcat.Ingredient.map((ingredient: any) => (
                          <p
                            className={
                              myIngredients.includes(ingredient.name)
                                ? styles.pSelected
                                : styles.pNotSelected
                            }
                            key={ingredient.id}
                            onClick={(e) =>
                              handleMybar(ingredient.name, e.target)
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

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  let myIngredientsFromCookie =
    req.cookies["mybar-ingredients"] === undefined
      ? []
      : JSON.parse(req.cookies["mybar-ingredients"]);

  const categories = await getAllCategoriesWithIngredients();
  return {
    props: {
      categories,
      myIngredientsFromCookie,
    },
  };
}

export default Setup;
