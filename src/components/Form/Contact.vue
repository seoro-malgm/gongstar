<template>
  <div>
    <div class="row">
      <!-- 정보 영역 -->
      <div class="col-12 col-lg-5">
        <article class="py-3">
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
                            <option value="ea">부</option>
                            <option value="gae">개</option>
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
          </div>
          <div class="mt-3 pt-3 border-top">
            <header class="mb-2">
              <h6 class="fw-700 text-16 text-md-20">추가 정보(견적문의를 받은 경우)</h6>
            </header>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">유형</h6>
              <span v-if="form?.type?.length">{{ form.type.join(",") }}</span>
              <template v-else>
                <span class="text-13 gray-3">설명 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">설명</h6>
              <span v-if="form?.desc">{{ form.desc }}</span>
              <template v-else>
                <span class="text-13 gray-3">설명 없음</span>
              </template>
            </div>

            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">예산</h6>
              <span v-if="form?.price">{{ form.price }}</span>
              <template v-else>
                <span class="text-13 gray-3">예산 설정 없음</span>
              </template>
            </div>
            <div class="mb-3">
              <h6 class="fw-700 text-16 text-md-20">레퍼런스 url</h6>
              <span v-if="form?.url">{{ form.url }}</span>
              <template v-else>
                <span class="text-13 gray-3">url 없음</span>
              </template>
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
        <paper-contact :form="form" />

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
import { useRoute, useRouter } from "vue-router";
import PaperContact from "@/components/Paper/Contact.vue";

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    PaperContact,
  },
  setup() {
    const { boardAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();
    const showPreview = ref(false);

    // 폼
    const form = ref({
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
    });

    // 대기
    const pending = ref({
      submit: false,
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

    // 아이디가 있는 경우 init
    onMounted(() => {
      if (id.value) {
        init("contact", id.value);
      }
    });

    // 인쇄버튼
    const print = () => {
      window.print();
    };

    return {
      form,
      showPreview,
      pending,
      print,
    };
  },
};
</script>

<style lang="scss" scoped></style>
