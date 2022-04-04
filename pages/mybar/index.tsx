import type { NextPage } from "next";

import styles from "@styles/pages/MyBar.module.scss";
import Header from "components/Header";
import { checkCookies, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cocktail } from "../../types/Cocktail";
import Sidebar from "components/Sidebar";

const MyBar: NextPage = () => {
  const router = useRouter();

  const [myCocktails, setMyCocktails] = useState<Cocktail[]>([])

  useEffect(() => {
    const getMyCocktails = async (myIngredients: any) => {
      const res = await fetch("http://localhost:4000/cocktails/byingredients", {
        method: "POST",
        body: myIngredients,
      });
      const myCocktails = await res.json();
      console.log(myCocktails)
      setMyCocktails(myCocktails)
    };

    if (!checkCookies("mybar-ingredients")) {
      router.push("/mybar/getstarted");
    } else {
      const myIngredients = JSON.parse(getCookie("mybar-ingredients"));
      getMyCocktails(myIngredients)
    }
  }, []);

  return (
    <div className={styles.root}>
      <Sidebar/>

      <main>
        <Header />

        <div className={styles.mainContent}>
          { myCocktails.map((cocktail: Cocktail) => <p>{cocktail._id}</p>) }
        </div>
      </main>
    </div>
  );
};

export default MyBar;
