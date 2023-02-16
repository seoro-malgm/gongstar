import { app } from "@/plugins/appConfig";

// firestore
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  // where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

class blogAPI {
  // board 전체 불러오기
  getAllBoards = async (pathName) => {
    try {
      const col = collection(db, pathName);

      // const q = query(col, category ? where('category', '==', category) : null)
      const q = query(col, orderBy("no", "desc"));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const boards = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        return boards;
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // board 디테일 불러오기
  getBoard = async (pathName, id) => {
    try {
      const col = doc(db, pathName, id);
      const snapshot = await getDoc(col);
      if (snapshot) {
        return snapshot.data();
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // board 추가
  addBoard = async (pathName, data) => {
    const docRef = await addDoc(collection(db, pathName), data);
    // console.log('docRef:', docRef)
    if (docRef?.id) {
      return docRef.id;
    }
  };

  // board 삭제
  removeBoard = async (pathName, id) => {
    if (!id) throw new Error("id가 없습니다");
    await deleteDoc(doc(db, pathName, id));
    return true;
  };

  // board 수정
  updateBoard = async (pathName, id, data) => {
    await setDoc(doc(db, pathName, id), data);
    return true;
  };
}

export default new blogAPI();
