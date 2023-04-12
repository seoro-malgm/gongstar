<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="input-group mb-3">
        <span class="input-group-text">email</span>
        <input type="email" class="form-control" placeholder="이메일" v-model="form.email" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">password</span>
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          v-model="form.password"
        />
      </div>
      <button class="btn btn-primary px-4 py-2" @click="getAuth">로그인</button>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// import firebase from '~/plugins/firebase'
export default {
  setup() {
    const form = ref({
      email: import.meta.env.DEV ? "test@test.com" : null,
      password: import.meta.env.DEV ? "!2xptmxm" : null,
    });

    const { authAPI } = inject("firebase");
    const store = useStore();
    const router = useRouter();

    const getAuth = async () => {
      const { email, password } = form.value;
      try {
        const token = await authAPI.login(email, password);
        if (token) {
          // 세션스토리지에 저장
          sessionStorage.setItem("gongstar-token", token);
          // store에 저장
          store.dispatch("auth/setState", ["user", token]);
          router.push("/admin");
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    return {
      form,
      getAuth,
    };
  },
};
</script>

<style lang="scss" scoped></style>
