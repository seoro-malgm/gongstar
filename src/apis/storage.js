import { app } from "@/plugins/appConfig";

// firestore
import { getFirestore } from "firebase/firestore";

// storage
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const db = getFirestore(app);

class storageAPI {
  // 이미지 url 불러오기
  getImageURL = (file, type, path, fileName) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${fileName}`, {
      contentType: type,
    });

    // 'file' comes from the Blob or File API
    return uploadBytes(storageRef, file).then((snapshot) => {
      // console.log('snapshot.ref:', snapshot.ref)
      return getDownloadURL(snapshot.ref).then((url) => {
        return { name: snapshot.ref.name, url };
      });
    });
  };

  // 이미지 삭제
  deleteImage = (path) => {
    const storage = getStorage();
    let desertRef = ref(storage, path);
    deleteObject(desertRef);
  };
}

export default new storageAPI();
