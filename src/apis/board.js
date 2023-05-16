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
  where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

class blogAPI {
  // board 전체 불러오기
  getAllBoards = async (
    documentName,
    orderOptions = {
      text: "no",
      value: "desc",
      category: null,
      page: 0,
      count: null,
    }
  ) => {
    try {
      const col = collection(db, documentName);
      const queryConstraints = [];
      if (orderOptions?.category)
        queryConstraints.push(where("category", "==", orderOptions?.category));
      if (orderOptions?.visible)
        queryConstraints.push(where("visible", "==", orderOptions?.visible));
      if (orderOptions?.count) queryConstraints.push(limit(orderOptions.count));
      // queryConstraints.push(orderBy("createdAt", "desc"));

      // const q = query(col, category ? where('category', '==', category) : null)
      const q = query(col, ...queryConstraints);
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
  getBoard = async (documentName, no) => {
    try {
      const q = query(collection(db, documentName), where("no", "==", no));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const docs = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        // console.log("obj:", obj);
        return docs[0];
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // board 디테일 불러오기
  getBoardById = async (documentName, id) => {
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
    await setDoc(doc(db, documentName, id), data);
    return true;
  };

  // setHistory = async (collectionName = "history", sections) => {
  //   const response = new Promise(async (resolve, reject) => {
  //     for (let index = 0; index <= sections.length; index++) {
  //       const sec = sections[index];
  //       if (sec?.isNew) {
  //         this.addBoard(collectionName, {
  //           ...sec,
  //           isNew: false,
  //         });
  //       } else {
  //         if (sec?.id) {
  //           this.updateBoard(collectionName, sec.id, sec);
  //         }
  //       }
  //     }
  //     return resolve(true);
  //   });
  //   return response;
  // };
}

export default new blogAPI();
