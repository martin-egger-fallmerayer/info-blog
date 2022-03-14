import type { NextPage } from "next";

import Image from "next/image";
import BbSvg from "@assets/BB.svg";
import InstagramSvg from "@assets/instagram.svg";
import TwitterSvg from "@assets/twitter.svg";
import WhatsappSvg from "@assets/whatsapp.svg";
import DrinkSvg from "@assets/drinks/veneziano.svg";
import SearchIconSvg from "@assets/search_icon.svg"

import styles from "@styles/pages/Home.module.scss";
import Header from "components/Header";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchType, setSearchType] = useState<string>("cocktails")
  
  const handleKeyPress = (e: KeyboardEvent) => {
    if(e.key !== "Enter") return
    if(searchTerm.includes("/")) return alert("Please enter only letters thx")
    e.preventDefault()
    router.push('/' + searchType + '/' + searchTerm)
  }

  return (
    <div className={styles.root}>
      <aside className={styles.sideBar}>
        <Image src={BbSvg} alt="" />
        <div className={styles.socialMediaContainer}>
          <Image src={InstagramSvg} alt="" />
          <Image src={TwitterSvg} alt="" />
          <Image src={WhatsappSvg} alt="" />
        </div>
      </aside>

      <main>
        <Header/>

        <div className={styles.mainContent}>
          <div className={styles.quoteContainer}>
            <p className={styles.quote}>
              The power of a drunk
              <br />
              at the palm of my hands
            </p>
            <div className={styles.searchBarContainer}>
              <div className={styles.searchBar}>
                <Image src={SearchIconSvg} alt=""/>
                <input type="text" placeholder="What can i get for ya'"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={e => handleKeyPress(e)}
                />
                <select value={searchType} defaultValue={'cocktails'}
                  onChange={e => setSearchType(e.target.value)}
                >
                  <option value="cocktails">Cocktails</option>
                  <option value="ingredients">Ingredients</option>
                  <option value="diy">DIY</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image src={DrinkSvg} alt="" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
