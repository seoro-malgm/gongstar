<template>
  <div id="contact" class="container section-gap">
    <header class="my-3 mt-md-5 mb-4 text-center">
      <h1 class="page-title">CONTACT US</h1>
      <p>공스타에 프로젝트를 문의하세요. 확인 후 견적을 도와드리겠습니다.</p>
    </header>
    <section>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="p-4">
            <div class="mb-4">
              <header class="bg-black text-white p-2 text-center mb-2">
                <h4 class="mb-0">고객 정보</h4>
              </header>
              <section>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="name">이름</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="회사명/담당자명을 입력하세요"
                    id="name"
                    v-model="form.name"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="phone">연락처</label>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="연락처를 입력하세요"
                    id="phone"
                    v-model="form.phone"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="email">이메일</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="이메일을 입력하세요"
                    id="email"
                    v-model="form.email"
                  />
                </div>
              </section>
            </div>
            <div class="mb-4">
              <header class="bg-black text-white p-2 text-center mb-2">
                <h4 class="mb-0">프로젝트 정보</h4>
              </header>
              <section>
                <ul class="list-unstyled mb-3">
                  <li
                    class="d-flex align-items-center my-3"
                    v-for="(item, i) in types"
                    :key="i"
                  >
                    <input
                      type="checkbox"
                      class="form-check mx-2"
                      :id="`type_${item}`"
                      :value="item"
                      v-model="form.type"
                    />
                    <label :for="`type_${item}`" class="text-18 fw-600">{{
                      item
                    }}</label>
                  </li>
                </ul>
              </section>
            </div>
            <div class="mb-4">
              <header class="bg-black text-white p-2 text-center mb-2">
                <h4 class="mb-0">상세 정보</h4>
              </header>
              <section>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="name"
                    >제작 예산</label
                  >
                  <select class="form-select" v-model="form.price">
                    <option value="null" selected disabled>
                      예산을 선택하세요
                    </option>
                    <optgroup label="예산 규모">
                      <option value="10만원 ~ 100만원 이하">
                        10만원 ~ 100만원 이하
                      </option>
                      <option value="100만원 ~ 300만원 이하">
                        100만원 ~ 300만원 이하
                      </option>
                      <option value="300만원 ~ 500만원 이하">
                        300만원 ~ 500만원 이하
                      </option>
                      <option value="500만원 ~ 1000만원 이하">
                        500만원 ~ 1000만원 이하
                      </option>
                      <option value="500만원 ~ 1000만원 이하">
                        500만원 ~ 1000만원 이하
                      </option>
                      <option value="1000만원 ~ 2000만원 이하">
                        1000만원 ~ 2000만원 이하
                      </option>
                      <option value="1000만원 ~ 2000만원 이하">
                        1000만원 ~ 2000만원 이하
                      </option>
                      <option value="2000만원 ~ 3000만원 이하">
                        2000만원 ~ 3000만원 이하
                      </option>
                      <option value="3000만원 ~ 5000만원 이하">
                        3000만원 ~ 5000만원 이하
                      </option>
                    </optgroup>
                    <optgroup label="기타">
                      <option value="협의 후 결정">협의 후 결정</option>
                    </optgroup>
                  </select>
                </div>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="title">제목</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="프로젝트 제목을 입력하세요"
                    id="title"
                    v-model="form.title"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="url"
                    >레퍼런스 주소</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="디자인 참고 사이트나 영상 링크 주소(URL)를 알려주세요."
                    id="url"
                    v-model="form.url"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="text-14 fw-700 mb-1" for="desc">내용</label>
                  <textarea
                    class="form-control"
                    placeholder="내용을 입력하세요"
                    id="desc"
                    v-model="form.desc"
                    rows="5"
                  />
                </div>
                <div class="form-group mb-3">
                  <div class="text-14 fw-700 mb-1">참고파일</div>
                  <div class="d-flex align-items-center">
                    <template v-if="!pending.file && !form.file?.url">
                      <label
                        for="file"
                        class="d-inline-block btn btn-black p-2 rounded-circle"
                      >
                        <i class="icon icon-attach"></i>
                      </label>
                    </template>
                    <template v-else-if="!pending.file && form.file?.url">
                      <div class="border rounded p-2">
                        <span class="d-block text-15 px-3">
                          {{ form.file.name }}
                        </span>
                      </div>
                      <button
                        class="btn btn-link text-13"
                        @click="
                          form.file = {
                            name: null,
                            url: null
                          }
                        "
                      >
                        삭제
                      </button>
                    </template>
                    <template v-else-if="pending.file">
                      <div class="spinner-border" role="status"></div>
                    </template>
                  </div>

                  <input
                    class="form-control d-none"
                    id="file"
                    type="file"
                    @change="fileAttached"
                  />
                  <small>5MB 이하만 첨부 가능합니다</small>
                </div>
              </section>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.agree"
                id="agree"
              />
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
