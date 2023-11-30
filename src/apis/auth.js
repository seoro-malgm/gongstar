import {app} from '@/plugins/appConfig';
// auth
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(app);

class authAPI {
  login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        const user = response?.user;
        if (user) {
          const {accessToken: token} = user;
          // 리턴
          return token;
        }
      })
      .catch(error => {
        const errorCode = error.code;
        console.error('errorCode:', errorCode);
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/user-not-found':
            window.toast(`존재하지 않는 계정입니다`, {
              toaster: 'b-toaster-bottom-left',
            });
            // window.alert('')
            break;
          case 'auth/wrong-password':
            window.toast(`비밀번호를 다시 확인해주세요.`, {
              toaster: 'b-toaster-bottom-left',
            });
            break;
          default:
            window.alert(`${errorCode} ::`, errorMessage);
            break;
        }
        return;
      });
  };
}

export default new authAPI();
