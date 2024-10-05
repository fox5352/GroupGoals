import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { app } from "./fireBase";

const db = getFirestore(app, "");

export async function getBoards(userId: string): Promise<any | null> {
  const boardsCol = collection(db, "boards");

  // // Use a compound query that includes both conditions
  const boardsQuery = query(
    boardsCol,
    where("userId", "==", userId) // This is okay
  );

  const colabsQuery = query(
    boardsCol,
    where("colabs", "array-contains", userId) // This is okay
  );

  try {
    // Execute both queries and combine results
    const [authorBoardsSnapshot, colabsBoardsSnapshot] = await Promise.all([
      getDocs(boardsQuery),
      getDocs(colabsQuery),
    ]);

    const authorBoards = authorBoardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const colabsBoards = colabsBoardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Combine the results and remove duplicates if necessary
    const boardsList = [...authorBoards, ...colabsBoards];

    return boardsList;
  } catch (error) {
    console.error("Error getting boards:", error);
    return null;
  }
}

export async function createBoard(
  name: string,
  userId: string,
  colabs: Array<string>
): Promise<string | null> {
  try {
    const boardsCol = collection(db, "boards");

    const result = await addDoc(boardsCol, {
      name,
      userId,
      colabs,
      tasks: [],
      createdAt: new Date(),
    });

    return result.id;
  } catch (error) {
    console.error("Error creating board:", error);
    throw null;
  }
}
