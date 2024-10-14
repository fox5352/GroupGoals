import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { BoardType, getOwnedBoardsShallow } from "../../model/fireStore";

import styles from "./Home.module.css";

import GroupCard from "../../components/Card";
import HomeControls from "./components/HomeControls";
import { useUser } from "../../state/UserProvider";

interface MessageType {
  content: string;
  color: string;
}

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<BoardType> | null>(null);
  const [message, setMessage] = useState<MessageType | null>(null);
  const { user } = useUser();

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

  return (
    <main className={styles.main}>
      {user && <HomeControls />}
      {(message || isLoading) && (
        <div className={styles.messageContainer}>
          {message && (
            <Message message={message.content} color={message.color} />
          )}
          {isLoading && (
            <Message message="Fetching your boards..." color="textSecondary" />
          )}
        </div>
      )}
      <div className={styles.grid}>
        {boards !== null ? (
          boards.map((board) => {
            return <GroupCard key={board.uuid} id={board.uuid} {...board} />;
          })
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

const Message = ({ message, color }: { message: string; color: string }) => {
  return (
    <Typography variant="h4" sx={{ fontSize: "1.4rem" }} color={color}>
      {message}
    </Typography>
  );
};

export default Home;
