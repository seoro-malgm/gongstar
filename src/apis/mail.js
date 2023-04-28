import { app } from "@/plugins/appConfig";
// firestore
import {
  getFirestore,
  // doc,
  addDoc,
  // getDoc,
  // setDoc,
  // getDocs,
  // deleteDoc,
  collection,
  // query,
  // where,
  // orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

class authAPI {
  mailTrigger = async (form) => {
    const docRef = await addDoc(collection(db, "mail"), {
      to: "liass00@naver.com",
      message: {
        subject: `[CONTACT] ${form.name}으로부터 메일이 왔습니다.`,
        html: `
        <ul>
          <li>이름: ${form.name} </li>
          <li>연락처: ${form.phone} </li>
          <li>메일: ${form.email} </li>
        </ul>
        <div>
          내용: <br>
          <p> ${form.content} </p>
        </div>
        `,
      },
    });
    if (docRef?.id) {
      return docRef.id;
    }
  };
}

export default new authAPI();
