<template>
  <div>
    <div class="row">
      <!-- 정보 영역 -->
      <div class="col-12 col-lg-5 print-none">
        <article class="py-3">
          <div class="my-3">
            <div class="mb-3">
              <label for="text">견적번호</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="no"
                  v-model="form.no"
                  placeholder="견적번호"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="date">견적일</label>
              <div class="mb-2">
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    v-model="form.date"
                    placeholder="견적일"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="my-3">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">
                클라이언트 정보 <small>(공급받는 자)</small>
              </h6>
            </header>
            <div class="mb-3">
              <label for="name">회사명</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.companyName"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="boss">회사대표자명(회사 대표자 명)</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="boss"
                  v-model="form.companyBoss"
                  placeholder="회사 대표자명을 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="name">담당자명(견적서 받는 담당자)</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="licenseNumber">사업자등록번호</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="licenseNumber"
                  v-model="form.licenseNumber"
                  placeholder="사업자등록번호를 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="address">사업장 주소</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="form.address"
                  placeholder="사업장 주소를 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="address">업태/종목</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="servicesCategory"
                  v-model="form.servicesCategory"
                  placeholder="사업 업태"
                />
              </div>
              <div class="form-group mt-2">
                <input
                  type="text"
                  class="form-control"
                  id="servicesType"
                  v-model="form.servicesType"
                  placeholder="사업 종목"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="phone">연락처</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                  placeholder="연락처를 입력하세요"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="email">이메일</label>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  placeholder="이메일 입력하세요"
                />
              </div>
            </div>
          </div>
          <div class="my-3 pt-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">견적 정보</h6>
            </header>
            <section>
              <div class="mb-3">
                <label for="title">프로젝트 명</label>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="form.title"
                    placeholder="프로젝트 이름을 입력하세요"
                  />
                </div>
              </div>
              <!-- <div class="mb-3">
              <label for="period">프로젝트 수행 기간</label>
              <div class="row mb-2">
                <div class="col-7">
                  <input
                    type="number"
                    class="form-control"
                    v-model="form.period"
                    placeholder="기간 숫자"
                  />
                </div>
                <div class="col-5">
                  <select class="form-select" v-model="form.periodType">
                    <option value="m">개월</option>
                    <option value="w">주</option>
                    <option value="d">일</option>
                  </select>
                </div>
              </div>
            </div> -->
              <div class="mb-3">
                <span>견적 항목</span>
                <ul>
                  <template v-if="form?.items?.length">
                    <li
                      v-for="(item, i) in form.items"
                      :key="i"
                      class="py-2 border-bottom"
                    >
                      <div
                        class="d-flex align-items-center justify-content-between mb-2"
                      >
                        <div class="form-group w-100">
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.name"
                            placeholder="내역이름"
                          />
                        </div>
                        <button
                          class="btn btn-link text-12 text-gray-2 p-1 ms-2"
                          @click="form.items.splice(i, 1)"
                        >
                          삭제
                        </button>
                      </div>

                      <div class="row mb-2">
                        <div class="col-7">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.period"
                            placeholder="기간 숫자"
                          />
                        </div>
                        <div class="col-5">
                          <select class="form-select" v-model="item.periodType">
                            <option value="m">개월</option>
                            <option value="w">주</option>
                            <option value="d">일</option>
                            <option value="ea">부</option>
                            <option value="gae">개</option>
                            <option value="sik">식</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group mb-2">
                        <input
                          type="number"
                          class="form-control"
                          v-model="item.price"
                          placeholder="소계 가격"
                        />
                      </div>
                    </li>
                  </template>
                  <li class="mt-3">
                    <button
                      class="btn btn-outline-gray-1 w-100"
                      @click="form.items.push({})"
                    >
                      항목 추가
                    </button>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div class="my-3 py-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">부가 설명</h6>
            </header>
            <textarea
              v-model="form.addText"
              class="form-control mt-2"
              rowspan="5"
            >
            </textarea>
          </div>
          <div class="my-3 py-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">견적서 옵션</h6>
            </header>
            <ul>
              <li>
                <div class="form-check form-switch">
                  <label class="form-check-label" for="addVAT">
                    {{ formOptions?.addVAT ? "VAT 추가" : "VAT 추가 안함" }}
                  </label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="addVAT"
                    v-model="formOptions.addVAT"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-3 pt-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">
                추가 정보(견적문의를 받은 경우)
              </h6>
            </header>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">유형</h6>
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  id="add-input-type"
                  v-model="input.type"
                  @keypress.enter="addInput('type', input.type)"
                  placeholder="유형"
                />
                <button
                  class="btn btn-outline-black"
                  @click="addInput('type', input.type)"
                >
                  +
                </button>
              </div>

              <ul
                class="list-unstyled d-inline-flex flex-wrap mt-2"
                v-if="form?.type?.length"
              >
                <li
                  v-for="(item, i) in form.type"
                  :key="i"
                  class="me-1 mb-2 d-flex align-items-center bg-primary px-3 py-1 rounded-pill"
                >
                  <span class="text-14 fw-700"> {{ item }} </span>
                  <button
                    class="btn btn-text p-0 ms-2 text-20"
                    @click="form.type.splice(i, 1)"
                  >
                    <i class="icon icon-cancel-circled" />
                  </button>
                </li>
              </ul>
              <template v-else>
                <span class="text-13 gray-3">설명 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">설명</h6>
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  id="add-input-desc"
                  v-model="input.desc"
                  placeholder="프로젝트 설명"
                />
              </div>
            </div>

            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">예산</h6>
              <select class="form-select" v-model="form.price">
                <option value="null" selected disabled>
                  예산 선택되어있지 않음
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
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">레퍼런스 url</h6>
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  id="add-input-url"
                  v-model="input.url"
                  placeholder="프로젝트 설명"
                />
              </div>
            </div>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">참고파일</h6>
              <template v-if="form?.file?.url">
                <a :href="form.file.url" target="_blank">링크</a>
              </template>
              <template v-else>
                <span class="text-13 gray-3">첨부파일 없음</span>
              </template>
            </div>
          </div>
        </article>
      </div>
      <div class="col-12 col-lg-7">
        <paper-contact :form="form" :formOptions="formOptions" />

        <!-- 유틸 영역 -->
        <div class="my-3 print-none">
          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-gray-1 me-2" @click="printPage">
              인쇄
            </button>
            <button
              class="btn btn-primary px-3"
              @click="
                $emit(id ? 'update' : 'submit', {
                  ...form,
                  lastUpdated: new Date().toLocaleString()
                })
              "
            >
              견적서 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PaperContact from "@/components/Paper/Contact.vue";

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  components: {
    PaperContact
  },
  setup() {
    const { boardAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();
    const showPreview = ref(false);

    // 폼
    const form = ref({
      no: "",
      date: null,
      agree: true,
      period: null,
      desc: "",
      periodType: "m",
      email: "",
      file: null,
      companyName: null,
      companyBoss: null,
      licenseNumber: null,
      address: null,
      servicesCategory: null,
      servicesType: null,
      name: null,
      phone: null,
      price: null,
      title: null,
      items: [],
      type: [],
      url: null,
      addText: null
    });

    const input = ref({
      type: null
    });
    const addInput = (type, value, isArray) => {
      if (value && value !== "") {
        // if (isArray) {
        console.log("type.value:", type.value);
        form.value[type].push(value);
        input.value[type] = null;
        // } else {
        // ...
        // }
      }
    };

    const formOptions = ref({ addVAT: true });

    // 대기
    const pending = ref({
      submit: false
    });

    // 수정 불러오기
    const id = computed(() => {
      return route?.query?.id;
    });
    const init = async (documentName, id) => {
      pending.value.init = true;
      try {
        const data = await boardAPI.getBoardById(documentName, id);
        if (data) {
          // ref를 찾은 뒤에 form에 적용함
          form.value = {
            agree: true,
            period: null,
            date: null,
            desc: "",
            periodType: "m",
            email: "",
            file: null,
            companyName: null,
            companyBoss: null,
            licenseNumber: null,
            address: null,
            servicesCategory: null,
            servicesType: null,
            name: null,
            phone: null,
            price: null,
            title: null,
            items: [],
            type: [],
            url: null,
            ...data
          };
        }
      } catch (error) {
        window.toast("잘못된 접근입니다");
        console.error("error:", error);
        router.push("/admin/contact");
      }
      pending.value.init = false;
    };

    // 아이디가 있는 경우 init
    onMounted(() => {
      if (id.value) {
        init("contact", id.value);
      }
    });

    // 인쇄버튼
    const printPage = () => {
      window.print();
    };

    return {
      form,
      input,
      addInput,
      formOptions,
      showPreview,
      pending,
      printPage
    };
  }
};
</script>

<style lang="scss" scoped>
.print-none {
  @media print {
    display: none;
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
}
</style>
