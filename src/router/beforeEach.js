import store from '@/store/index';

export default async (to, from, next) => {
  // 계정이 필요한 페이지에 접근한 경우 : meta에 requireAuth 속성이 있는 경우
  const requireAuth = to.matched.some(record => record.meta.requireAuth);
  // 유저 유무
  // let isAuthenticated = store.getters['auth/getMe'];
  // if (!isAuthenticated) {
  //     // 유저가 있을 경우 setUser 실행
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //         await store.dispatch('auth/setAuthenticated', true);
  //         await store.dispatch('auth/setUser', token);
  //         await store.dispatch('auth/setAuthState', token);
  //     }
  // }
  if (requireAuth) {
    // 사용자만 접근 가능
    if (isAuthenticated) {
      // 사용자가 있는 경우
      next();
    } else {
      // 사용자가 없는 경우
      next('/login');
    }
  } else {
    next();
  }
};
