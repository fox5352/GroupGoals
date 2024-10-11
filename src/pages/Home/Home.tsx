import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { BoardType, getOwnedBoardsShallow } from "../../model/fireStore";
import { User } from "firebase/auth";

import styles from "./Home.module.css";

import GroupCard from "../../components/Card";

function Home({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<BoardType> | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setError("User is not logged in");
        setIsLoading(false);
      } else {
        const data = await getOwnedBoardsShallow(user.uid);

        if (data == null || data.length === 0) {
          setMessage("No boards found");
        } else {
          setError(null);
          setBoards(data);
        }
      }
      setIsLoading(false);
    };

    fetchBoards();
  }, [user]);

  // FIXME: remove when done testing

  if (error || isLoading || message) {
    return (
      <div className={styles.messageContainer}>
        {error && <Message message={error} color="warning" />}
        {isLoading && (
          <Message message="Fetching your boards..." color="textSecondary" />
        )}
        {message && <Message message={message} color="textSecondary" />}
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
