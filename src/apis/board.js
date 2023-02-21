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
  getAllBoards = async (documentName) => {
    try {
      const col = collection(db, documentName);

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
  getBoard = async (documentName, id) => {
    try {
      const col = doc(db, documentName, id);
      const snapshot = await getDoc(col);
      if (snapshot) {
        return snapshot.data();
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // board 추가
  addBoard = async (documentName, data) => {
    const docRef = await addDoc(collection(db, documentName), data);
    // console.log('docRef:', docRef)
    if (docRef?.id) {
      return docRef.id;
    }
  };

  // board 삭제
  removeBoard = async (documentName, id) => {
    if (!id) throw new Error("id가 없습니다");
    await deleteDoc(doc(db, documentName, id));
    return true;
  };

  // board 수정
  updateBoard = async (documentName, id, data) => {
    console.log("{data}:", {
      documentName: documentName,
      id: id,
      data: data,
    });
    await setDoc(doc(db, documentName, id), data);
    return true;
  };
}

export default new blogAPI();