import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { app } from "./fireBase";

const db = getFirestore(app, "");

const boardsColRef = collection(db, "boards");
// TODO: const tasksColRef = collection(db, "tasks");

export interface TaskType {
  uuid: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  createdAt: Date;
  completedDate: Date | null;
}

export interface BoardType {
  uuid: string;
  name: string;
  userId: string;
  colabs: Array<string>;
  tasks: Array<string>;
  createdAt: Date;
}

export async function getOwnedBoardsShallow(
  userId: string
): Promise<Array<BoardType> | null> {
  const ownedBoards = query(boardsColRef, where("userId", "==", userId));

  try {
    const snapshot = await getDocs(ownedBoards);

    const boards: Array<BoardType> = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uuid: doc.id,
        userId,
        name: data.name,
        colabs: data.colabs,
        tasks: data.tasks,
        createdAt: data.createdAt,
      };
    });

    if (boards) {
      return boards;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting owned boards:", error);
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

    console.log(result);

    return result.id;
  } catch (error) {
    console.error("Error creating board:", error);
    throw null;
  }
}
