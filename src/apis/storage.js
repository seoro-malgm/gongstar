import { app } from "@/plugins/appConfig";

// firestore
import { getFirestore } from "firebase/firestore";

// storage
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const db = getFirestore(app);

class storageAPI {
  resize = {
    init: function (outputQuality) {
      this.outputQuality = outputQuality === "undefined" ? 1 : outputQuality;
    },

    photo: async (standard, file, maxSize, outputType, callback) => {
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        if (standard === "h") {
          this.resize.resizeWidth(readerEvent.target.result, maxSize, outputType, callback);
        } else if (standard === "w") {
          console.log("this.resize:", this);
          this.resize.resizeHeight(readerEvent.target.result, maxSize, outputType, callback);
        }
      };
      const newPhoto = await reader.readAsDataURL(file);
      return newPhoto;
    },
    // 가로 폭을 resize함
    resizeWidth: function (dataURL, maxSize, outputType, callback) {
      // const _this = this;
      const image = new Image();
      image.onload = function (imageEvent) {
        // 이미지를 onload할 때 resize 함
        const canvas = document.createElement("canvas"); //const가 안되길래 let으로 바꿨음
        let width = image.width;
        let height = image.height;

        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        this.resize.output(canvas, outputType, callback);
      };
      image.src = dataURL;
    },
    // 세로 높이를 resize함
    resizeHeight: function (dataURL, maxSize, outputType, callback) {
      // const _this = this;
      const image = new Image();
      image.onload = function (imageEvent) {
        const canvas = document.createElement("canvas");
        let width = image.width;
        let height = image.height;

        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        this.resize.output(canvas, outputType, callback);
      };
      image.src = dataURL;
    },
    output: function (canvas, outputType, callback) {
      switch (outputType) {
        case "object":
          canvas.toBlob(
            function (blob) {
              const obj = {
                blob: blob,
                url: canvas.toDataURL("image/png", 1),
              };
              callback(obj);
            },
            "image/png",
            1
          );
          break;

        case "file":
          canvas.toBlob(
            function () {
              callback(blob);
            },
            "image/png",
            1
          );
          break;

        case "dataURL":
          callback(canvas.toDataURL("image/png", 1));
          break;
      }
    },
  };

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
