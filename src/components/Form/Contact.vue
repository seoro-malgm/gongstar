<template>
  <div>
    <div class="row">
      <!-- 정보 영역 -->
      <div class="col-12 col-lg-5">
        <article class="py-3">
          <header class="mb-2">
            <h6 class="fw-700">견적서 정보</h6>
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
            <div class="mb-3">
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
            </div>
            <div class="mb-3">
              <span>견적 항목</span>
              <ul>
                <template v-if="form?.items?.length">
                  <li v-for="(item, i) in form.items" :key="i" class="py-2 border-bottom">
                    <div class="d-flex align-items-center justify-content-between mb-2">
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
                        </select>
                      </div>
                    </div>
                    <div class="form-group mb-2">
                      <input
                        type="text"
                        class="form-control"
                        v-model="item.price"
                        placeholder="소계 가격"
                      />
                    </div>
                  </li>
                </template>
                <li class="mt-3">
                  <button class="btn btn-outline-gray-1 w-100" @click="form.items.push({})">
                    항목 추가
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <section class="mt-3 pt-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700">클라이언트 정보</h6>
            </header>
            <div class="mb-3">
              <label for="name">회사, 담당자명</label>
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
          </section>
          <section class="mt-3 pt-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700">추가 정보(견적문의를 받은 경우)</h6>
            </header>
            <div class="mb-3">
              <h6 class="fw-700">유형</h6>
              <span v-if="form?.type?.length">{{ form.type.join(",") }}</span>
              <template v-else>
                <span class="text-13 gray-3">설명 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700">설명</h6>
              <span v-if="form?.desc">{{ form.desc }}</span>
              <template v-else>
                <span class="text-13 gray-3">설명 없음</span>
              </template>
            </div>

            <div class="mb-3">
              <h6 class="fw-700">예산</h6>
              <span v-if="form?.price">{{ form.price }}</span>
              <template v-else>
                <span class="text-13 gray-3">예산 설정 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700">레퍼런스 url</h6>
              <span v-if="form?.url">{{ form.url }}</span>
              <template v-else>
                <span class="text-13 gray-3">url 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700">참고파일</h6>
              <template v-if="form?.file?.url">
                <a :href="form.file.url" target="_blank">링크</a>
              </template>
              <template v-else>
                <span class="text-13 gray-3">첨부파일 없음</span>
              </template>
            </div>
          </section>
        </article>
      </div>
      <div class="col-12 col-lg-7">
        <!-- 인쇄 영역 -->
        <div class="print-wrapper">
          <!-- 로고 회전 -->
          <div class="logo-rotate">
            <logo-rotate class="logo" :size="2.5" :color="'#d7d7d7'" />
          </div>
          <!-- 프린트영역 -->
          <div class="print-container">
            <article class="form-content">
              <header class="form-header">
                <!-- <img class="logo" :src="getURL('/assets/logo.svg')" alt="공스타 로고" /> -->
                <h1>견적서</h1>
                <!-- <span>주식회사 공스타에서 발행한 견적서입니다</span> -->
              </header>
              <section class="form-content">
                <div class="desc">
                  <div>
                    안녕하세요 {{ form?.name }} 님, <br />
                    요청하신 견적서를 보내드립니다.
                  </div>
                </div>
                <section>
                  <div class="table-wrapper">
                    <table class="table">
                      <thead>
                        <th class="text-start"></th>
                        <th width="50%">항목명</th>
                        <!-- <th>단가</th> -->
                        <th>기간</th>
                        <th class="text-end">소계</th>
                      </thead>
                      <tbody>
                        <template v-if="form?.items?.length">
                          <tr v-for="(item, i) in form.items" :key="i">
                            <td>{{ i + 1 }}</td>
                            <td>
                              {{ item.name }}
                            </td>
                            <td>
                              {{ item.period }}
                              {{ getPeriodType(item.periodType) }}
                            </td>
                            <td class="text-end">
                              {{
                                toLocaleFormat({
                                  text: item.price,
                                })
                              }}₩
                            </td>
                          </tr>
                        </template>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>합계</td>
                          <td></td>
                          <td>{{ form.period }} {{ getPeriodType(form.periodType) }}</td>
                          <td class="text-end">
                            <span v-if="form?.items?.length">
                              {{ sum(form.items, "price") }}
                            </span>
                            ₩
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <caption>
                      (VAT 별도)
                    </caption>
                  </div>
                </section>
              </section>
              <div class="form-footer">
                <div class="text-13 mb-1">공스타는 여성기업인증, 충남 예비사회적기업입니다.</div>
                <img class="logo" :src="getURL('/assets/logo.svg')" alt="공스타 로고" />
                <ul class="list-infos">
                  <li>
                    <span class="fw-900">주식회사 공스타</span>
                  </li>
                  <li>
                    <span>사업자등록번호:{{ infos.licenseNumber }}</span>
                  </li>
                  <li>
                    <span> 연락처: {{ infos.phone }} </span>
                  </li>
                  <li>
                    <span> 이메일: {{ infos.email }} </span>
                  </li>
                  <li>
                    <span> 주소: {{ infos.address }} </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
        <!-- 유틸 영역 -->
        <div class="my-3">
          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-gray-1 me-2" @click="print()">인쇄</button>
            <button
              class="btn btn-primary px-3"
              @click="
                $emit(id ? 'update' : 'submit', {
                  ...form,
                  lastUpdated: new Date().toLocaleString(),
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import FormEditor from "@/components/FormEditor.vue";
// import InsightsDetail from "@/pages/Insights/Detail.vue";
import LogoRotate from "@/components/Sections/LogoRotate.vue";
import { toLocaleFormat } from "@/utils/helper";

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    // FormEditor,
    // InsightsDetail,
    LogoRotate,
  },
  setup() {
    const getURL = inject("getImageURL");
    const { boardAPI, storageAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const showPreview = ref(false);

    // 폼
    const form = ref({
      agree: true,
      period: null,
      desc: "",
      periodType: "m",
      email: "",
      file: null,
      name: null,
      phone: null,
      price: null,
      title: null,
      items: [],
      type: [],
      url: null,
    });

    // 대기
    const pending = ref({
      submit: false,
    });

    // 정보
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });

    const getPeriodType = (value) => {
      const types = {
        d: "일",
        w: "주",
        m: "개월",
      };
      return types[value] || "";
    };

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
            desc: "",
            periodType: "m",
            email: "",
            file: null,
            name: null,
            phone: null,
            price: null,
            title: null,
            items: [],
            type: [],
            url: null,
            ...data,
          };
        }
      } catch (error) {
        window.toast("잘못된 접근입니다");
        console.error("error:", error);
        router.push("/admin/contact");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      if (id.value) {
        init("contact", id.value);
      }
    });

    const sum = (arr, key) => {
      let result = 0;
      for (let index = 0; index < arr.length; index++) {
        const item = Number(arr[index][key]);
        if (!item) return;
        result += Number(item);
      }
      return toLocaleFormat({ text: result });
    };

    const print = () => {
      window.print();
    };

    return {
      getURL,
      infos,
      form,
      getPeriodType,
      showPreview,
      pending,
      toLocaleFormat,
      sum,
      print,
    };
  },
};
</script>

<style lang="scss" scoped>
.print-wrapper {
  margin: 20px 0;
  box-shadow: 0px 0px 12px rgba($color: #000000, $alpha: 0.1);
  background-color: white;
  position: relative;
  overflow: hidden;
  min-height: 1387px;
  // 로고회전
  .logo-rotate {
    position: absolute;
    top: 0;
    right: 0;
    width: 200%;
    height: 100%;
    transform: translate(40%, 30%);
    z-index: 1;
  }
  // 프린트 영역
  .print-container {
    z-index: 1000;
    height: 100%;
    min-height: 1387px;
    position: relative;
    padding: 1rem;
    .form-content {
      .form-header {
        // .logo {
        //   width: 100px;
        // }
        h1 {
          font-size: 23px;
          text-align: center;
          font-weight: 900;
        }
      }
      .form-content {
        .table-wrapper {
          max-width: 100%;
          margin: 3rem 0 0;
          .table {
            width: 100%;
            margin-bottom: 0;
            thead {
              th {
                padding: 0.25rem 0.75rem;
                background-color: $gray-3;
                border-bottom: 1px solid $gray-2;
              }
            }
            tbody {
            }
            tfoot {
              background-color: $gray-1;
              color: white;
              td {
                font-weight: 700;
              }
            }
            + caption {
              display: flex;
              width: 100%;
              justify-content: end;
            }
          }
        }
      }
      .form-footer {
        position: absolute;
        left: 1rem;
        bottom: 1rem;
        width: 100%;
        max-width: calc(100% - 2rem);
        margin: auto 0 1rem;
        padding: 1rem 0;
        border-top: 1px solid $gray-1;
        .logo {
          width: 180px;
          margin-bottom: 1rem;
        }
        .list-infos {
          list-style-type: none;
          li {
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
@media print {
  .print-wrapper {
    position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    width: 210mm;
    height: 297mm;
    box-shadow: none;
    z-index: 4000;
    min-height: 297mm;
    max-height: 297mm;
    // 로고회전
    .logo-rotate {
      transform: translate(40%, 20%);
    }
    // 프린트 영역
    .print-container {
      width: 100%;
      max-width: 210mm;
      max-height: calc(297mm - 10mm);
      padding: 5mm;
      position: relative;
      .form-content {
        width: 100%;
        .form-header {
          width: 100%;
          .logo {
            width: 3cm;
          }
        }
        .form-content {
        }
        .form-footer {
          position: absolute;
          width: 100%;
          max-width: calc(210mm - 10mm);
          max-height: inherit;
          top: 230mm;
          left: 5mm;
          border-top: 1px solid $gray-1;
          .logo {
            width: 4.5cm;
            margin-bottom: 0.5cm;
          }
          .list-infos {
            li {
              span {
                font-size: 9.7pt;
              }
            }
          }
        }
      }
    }
  }
}
</style>
