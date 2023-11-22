import authAPI from "@/apis/auth";
import boardAPI from "@/apis/board";
import storageAPI from "@/apis/storage";
import mailAPI from "@/apis/mail";

// export default { ...authAPI, ...worksAPI, ...storageAPI, ...blogAPI }

export default {
  install: (app, options) => {
    // 컴포넌트, 페이지로 이동
    const firebase = {
      authAPI,
      boardAPI,
      storageAPI,
      mailAPI,
    };
    app.provide("firebase", firebase);
  },
};
