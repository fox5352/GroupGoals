import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { BoardType, getOwnedBoardsShallow } from "../../model/fireStore";
import { User } from "firebase/auth";

import styles from "./Home.module.css";

import GroupCard from "../../components/Card";

function Home({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<BoardType> | null>(null);
  const [message, setMessage] = useState<{
    content: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);
      setMessage(null);

      // invalid user state
      if (!user) {
        setMessage({ content: "User is not logged in", color: "warning" });
        setBoards(null);
        setIsLoading(false);
        return;
      }

      const data = await getOwnedBoardsShallow(user.uid);

      // empty board state
      if (data == null || data.length === 0) {
        setMessage({ content: "No boards found", color: "textSecondary" });
        setBoards(null);
        setIsLoading(false);
        return;
      }

      // success state
      setMessage(null);
      setBoards(data);
      setIsLoading(false);
    };

    fetchBoards();
  }, [user]);

  if (isLoading || message) {
    return (
      <div className={styles.messageContainer}>
        {isLoading && (
          <Message message="Fetching your boards..." color="textSecondary" />
        )}
        {message && <Message message={message.content} color={message.color} />}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      {boards !== null ? (
        boards.map((board) => {
          return <GroupCard key={board.uuid} id={board.uuid} {...board} />;
        })
      ) : (
        <></>
      )}
    </main>
  );
}

const Message = ({ message, color }: { message: string; color: string }) => {
  return (
    <Typography sx={{ fontSize: "1.5rem" }} color={color}>
      {message}
    </Typography>
  );
};

// TODO: memoize if this gets slow;
export default Home;
