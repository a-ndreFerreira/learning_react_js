
import Home from "@/components/home";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function App() {
  const commentsRef = collection(db, "comments");
  const commentsSnapshot = await getDocs(commentsRef);

  const tasksRef = collection(db, "tasks");
  const tasksSnapshot = await getDocs(tasksRef);

  return (
    <Home commentsSnapshot={commentsSnapshot} tasksSnapshot={tasksSnapshot} />
  );
}
