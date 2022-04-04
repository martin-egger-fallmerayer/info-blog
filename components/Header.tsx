import Link from "next/link";
import React from "react";
import styles from "@styles/components/Header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/cocktails">
            <li>Cocktails</li>
          </Link>
          <Link href="/ingredients">
            <li>Ingredients</li>
          </Link>
          <Link href="/diy">
            <li>DIY</li>
          </Link>
          <Link href="/mybar">
            <li>My Bar</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
