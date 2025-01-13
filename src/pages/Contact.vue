<template>
  <div id="contact" class="container section-gap">
    <header class="my-3 mt-md-5 mb-4 text-center">
      <h1 class="page-title">CONTACT US</h1>
      <!-- <p>공스타에 프로젝트를 문의하세요. 확인 후 견적을 도와드리겠습니다.</p> -->
    </header>
    <section>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="p-4">
            <ul class="text-14 text-lg-20">
              <li class="d-flex flex-column align-items-center mb-5">
                <strong class="bg-black text-white p-2 rounded-lg mb-2">
                  오프라인 미팅장소
                </strong>
                <a href="https://naver.me/xjgQJoqq" target="_blank">공주살롱</a>
              </li>
              <li class="d-flex flex-column align-items-center mb-5">
                <strong class="bg-black text-white p-2 rounded-lg mb-2">
                  전화번호
                </strong>
                {{ infos.tel }}
              </li>
              <li class="d-flex flex-column align-items-center mb-5">
                <strong class="bg-black text-white p-2 rounded-lg mb-2">
                  이메일
                </strong>
                {{ infos.email }}
              </li>
              <li class="text-center">
                <span class="text-gray-2 text-12 text-lg-14">
                  타 지역일 경우 출장 가능
                </span>
              </li>
            </ul>
          </div>
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

    const form = ref({
      name: null,
      phone: null,
      email: null,

      type: [],
      price: "null",
      title: null,
      url: "",
      desc: null,

      file: {
        name: null,
        url: null
      },
      agree: false
    });
    const types = ref([
      "웹 개발",
      "브랜딩 디자인",
      "F&B - 케이터링, 푸드컨설팅",
      "미디어 브랜딩",
      "각종 시각 디자인",
      "컨설팅",
      "교육 관련 콘텐츠"
    ]);
    const pending = ref({
      file: false
    });

    const store = useStore();
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });

    const { boardAPI, storageAPI } = inject("firebase");
    const fileAttached = async e => {
      pending.value.file = true;
      const file = e.target.files[0];
      if (!file) {
        pending.value.file = false;
        return;
      }
      if (file.size >= 500000) {
        // console.log("file.size:", file.size);
        window.toast("파일 용량이 너무 큽니다");
        pending.value.file = false;
        form.file = null;
        return;
      }
      const type = file?.type.split("/").at(-1);
      const fileName = `file_${new Date().valueOf()}.${type}`;
      try {
        const data = await storageAPI.addFile(file, type, "files", fileName);
        if (data) {
          // form.value.file = {
          //   name: file.name,
          //   url: data,
          // };
          form.value.file = {
            name: fileName,
            url: data.url
          };
          pending.value.file = false;
        }
      } catch (error) {
        console.error("error:", error);
        window.toast("사이트 오류로 인해 현재 파일을 업로드할 수 없습니다.");
        pending.value.file = false;
      }
    };

    const validate = computed(() => {
      const values = Object.values(form.value);
      return values.includes(null) || values.includes(false);
    });

    // 견적에 추가
    const addContact = async data => {
      try {
        const response = await boardAPI.addBoard("contact", data);
        if (response) {
          return response;
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    // 이메일 전송
    const sendMail = async data => {
      try {
        const response = await emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          data,
          import.meta.env.VITE_EMAIL_API_KEY
        );
        if (response) {
          return response;
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    // 제출
    const submit = async f => {
      const data = {
        ...f,
        lastUpdated: new Date().toLocaleString()
      };
      console.log("data:", data);
      try {
        // 견적에 추가하고, 메일전송
        const [added, sended] = await Promise.all([
          addContact(data),
          sendMail(data)
        ]);
        if (added && sended) {
          window.toast(
            "프로젝트 문의가 완료됐습니다! 곧 확인하여 답변드리겠습니다."
          );
          form.value = {
            name: null,
            phone: null,
            email: null,

            type: [],
            price: "null",
            title: null,
            url: "",
            desc: null,

            file: {
              name: null,
              url: null
            },
            agree: false
          };
        }
      } catch (error) {
        window.toast("문의에 실패했습니다. 다음에 다시 시도해주세요.");
      }
    };

    return {
      form,
      types,
      getURL,
      infos,
      submit,
      validate,
      fileAttached,
      pending
    };
  }
};
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 24px !important;
}
</style>
