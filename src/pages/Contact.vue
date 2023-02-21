<template>
  <div class="container section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">CONTACT US</h1>
      <h4 class="mt-4 text-20 text-lg-30 text-center text-lg-start">
        디지털 보존 솔루션 랩(DCS LAB)에 문의하기
      </h4>
    </header>
    <section>
      <div class="row align-items-lg-end">
        <div class="col-12 col-lg-6">
          <div class="bg-white rounded shadow p-4">
            <!-- <form ref="form" @submit.prevent="submit"> -->
            <div class="form-group mb-3">
              <label for="name">이름</label>
              <input
                type="text"
                class="form-control"
                placeholder="이름을 입력하세요"
                id="name"
                v-model="form.name"
              />
            </div>
            <div class="form-group mb-3">
              <label for="phone">연락처</label>
              <input
                type="tel"
                class="form-control"
                placeholder="연락처을 입력하세요"
                id="phone"
                v-model="form.phone"
              />
            </div>
            <div class="form-group mb-3">
              <label for="email">이메일</label>
              <input
                type="email"
                class="form-control"
                placeholder="이메일을 입력하세요"
                id="email"
                v-model="form.email"
              />
            </div>
            <div class="form-group mb-3">
              <label for="message">내용</label>
              <textarea
                class="form-control"
                placeholder="내용을 입력하세요"
                id="message"
                v-model="form.message"
                rows="5"
              />
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="form.agree" id="agree" />
              <label class="form-check-label" for="agree">
                <strong class="text-primary">(필수)</strong>
                <span>개인정보 수집에 관해 동의합니다</span>
              </label>
            </div>
            <div class="d-flex">
              <button
                class="ms-auto btn btn btn-primary px-4 mt-2"
                :disabled="validate"
                @click="submit(form)"
              >
                <i class="icon icon-paper-plane me-1"></i>
                전송
              </button>
            </div>
            <!-- </form> -->
          </div>
        </div>
        <div class="col-12 col-lg-6 mt-5 mt-lg-0">
          <ul class="list-unstyled">
            <li v-for="(item, i) in links" :key="i" class="mb-1 pb-1">
              <template v-if="item.type === 'link'">
                <a :href="item.value" target="_blank" class="btn btn-text p-0 rounded-circle">
                  <i :class="`icon text-16 text-md-24 icon-${item.icon}`" />
                </a>
              </template>
              <template v-else>
                <i :class="`icon text-16 text-md-24 me-1 icon-${item.icon}`" />
                <span class="text-14 text-md-16">{{ item.value }}</span>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
import emailjs from "@emailjs/browser";

export default {
  setup() {
    const getURL = inject("getImageURL");
    // const { mailAPI } = inject("firebase");
    const form = ref({
      name: null,
      phone: null,
      email: null,
      message: null,
      agree: false,
    });

    const store = useStore();
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });
    const links = computed(() => {
      const { home, email, tel, phone, address, facebook, instagram } = infos.value;
      return [
        {
          icon: "home-1",
          value: home,
        },
        {
          icon: "map",
          value: address,
        },
        {
          icon: "facebook",
          value: facebook,
          type: "link",
        },
        {
          icon: "youtube-play",
          value: "",
          type: "link",
        },
        {
          icon: "instagram",
          value: instagram,
          type: "link",
        },
      ];
    });

    const validate = computed(() => {
      const values = Object.values(form.value);
      return values.includes(null) || values.includes(false);
    });

    const submit = async (data) => {
      // console.log("data:", data);
      try {
        const response = await emailjs.send(
          "service_l5l9i11",
          "template_94gn9gi",
          data,
          "7jcQG2Xyy2AjvRe1D"
        );
        if (response) {
          // console.log("response:", response);
          window.toast("이메일 전송에 성공했습니다.");
          form.value = {
            name: null,
            phone: null,
            email: null,
            message: null,
            agree: false,
          };
        }
      } catch (error) {
        console.error("error:", error);
        window.toast("이메일 전송에 실패했습니다.");
      }
    };

    // const links = ref();
    return { form, links, getURL, infos, submit, validate };
  },
};
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 24px !important;
}
</style>
