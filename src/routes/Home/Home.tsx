import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { getBoards } from "../../model/fireStore";

export default function Home() {
  // const [boards, setBoards] = useState(null)

  useEffect(() => {
    // getBoards()
  }, []);

  return <main className={styles.main}></main>;
}
