<template>
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
          <div class="paper-info">
            <small> No. {{ form.no }} </small>
            <small> Date. {{ form.date }} </small>
          </div>
        </header>
        <section class="form-content">
          <div class="desc">
            <div>
              안녕하세요
              <strong>{{ form?.name }}</strong>
              님, <br />
              요청하신 견적서를 보내드립니다.
            </div>
          </div>
          <section>
            <div class="table-wrapper">
              <table class="table table-collapse">
                <tr>
                  <th class="th-category" rowspan="6">공 <br />급 <br />자</th>
                  <th>사업자등록번호</th>
                  <td colspan="3">
                    {{ infos.licenseNumber }}
                  </td>
                  <th class="th-category client" rowspan="6">공<br />급<br />받<br />는<br />자</th>
                  <th>사업자등록번호</th>
                  <td colspan="3">
                    {{ form.licenseNumber }}
                  </td>
                </tr>
                <tr>
                  <!-- 공급자 -->
                  <th>상호(법인명)</th>
                  <td>공스타</td>
                  <th>대표자(성명)</th>
                  <td class="stamp-wrapper">
                    <strong> 옹 아 름 </strong>
                    <img class="stamp" :src="getURL('/assets/images/stamp.png')" />
                  </td>
                  <!-- 공급받는 자 -->
                  <th>상호(법인명)</th>
                  <td>{{ form.companyName }}</td>
                  <th>대표자(성명)</th>
                  <td>{{ form.companyBoss }}</td>
                </tr>
                <tr>
                  <!-- 공급자 -->
                  <th>사업장</th>
                  <td colspan="3">
                    {{ infos.address }}
                  </td>
                  <!-- 공급받는 자 -->
                  <th>사업장</th>
                  <td colspan="3">
                    {{ form.address }}
                  </td>
                </tr>
                <tr>
                  <!-- 공급자 -->
                  <th>업태</th>
                  <td class="text-start">
                    <div class="m-0 p-0 text-start" v-for="(item, i) in infos?.services" :key="i">
                      {{ item.type }}
                    </div>
                  </td>
                  <th>종목</th>
                  <td class="text-start">
                    <div class="m-0 p-0 text-start" v-for="(item, i) in infos?.services" :key="i">
                      {{ item.item }}
                    </div>
                  </td>
                  <!-- 공급받는 자 -->
                  <th>업태</th>
                  <td>
                    {{ form.servicesCategory }}
                  </td>
                  <th>종목</th>
                  <td>
                    {{ form.servicesType }}
                  </td>
                </tr>
                <tr>
                  <!-- 공급자 -->
                  <th>이메일</th>
                  <td colspan="3">
                    {{ infos.email }}
                  </td>
                  <!-- 공급받는 자 -->
                  <th>이메일</th>
                  <td colspan="3">
                    {{ form.email }}
                  </td>
                </tr>
              </table>
            </div>
            <div class="table-wrapper">
              <table class="table">
                <thead>
                  <th class="text-start"></th>
                  <th width="45%">항목명</th>
                  <th>단위</th>
                  <th class="text-end">공급가액</th>
                  <th class="text-end">세액</th>
                  <th class="text-end">단가</th>
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
                      <td>
                        {{
                          toLocaleFormat({
                            text: formOptions.addVAT ? item.price / 1.1 : item.price,
                            fixed: 0,
                          })
                        }}₩
                      </td>
                      <td>
                        {{
                          formOptions.addVAT
                            ? toLocaleFormat({
                                text: item.price / 1.1 / 10,
                                fixed: 0,
                              })
                            : 0
                        }}₩
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
                    <td>
                      <!-- {{ form.period }} {{ getPeriodType(form.periodType) }} -->
                    </td>
                    <td class="text-end" colspan="3">
                      <span v-if="form?.items?.length">
                        {{ sum(form.items, "price", 0) }}
                      </span>
                      ₩
                    </td>
                  </tr>
                </tfoot>
              </table>
              <caption>
                <!-- <template v-if="formOptions.addVAT">
                  * VAT 별도, 합계에는 VAT 10%가 가격에 포함된 가격입니다
                </template>
                <template v-if="!formOptions.addVAT"> * VAT 미포함 </template> -->
              </caption>
            </div>
            <div class="pt-3 border-top border-black" v-if="form?.addText">
              <div class="text-16 fw-700">부가설명</div>
              <pre class="pre-add-text mt-3 pb-3 border-bottom border-black">{{
                form.addText
              }}</pre>
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
              <span> 연락처: {{ infos.phone }} </span>
            </li>
            <li>
              <span> 이메일: {{ infos.email }} </span>
            </li>
            <li>
              <span> 주소: {{ infos.address }} </span>
            </li>
            <li>
              <span> 계좌번호: {{ infos.accountNumber }} </span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { computed, inject } from "vue";
import { useStore } from "vuex";
import { toLocaleFormat, getPercentNumber } from "@/utils/helper";

import LogoRotate from "@/components/Sections/LogoRotate.vue";
export default {
  props: {
    form: {
      type: Object,
      default: {},
    },
    formOptions: {
      type: Object,
      default: {},
    },
  },
  components: {
    LogoRotate,
  },
  setup() {
    const getURL = inject("getImageURL");
    const store = useStore();

    // 정보
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });

    const getPeriodType = (value) => {
      const types = {
        d: "일",
        w: "주",
        m: "개월",
        ea: "부",
        gae: "개",
        sik: "식",
      };
      return types[value] || "";
    };

    const sum = (arr, key, vatPercent = 0) => {
      let result = 0;
      for (let index = 0; index < arr.length; index++) {
        const item = Number(arr[index][key]);
        if (item >= 0) {
          result += Number(item);
        }
      }
      if (vatPercent && vatPercent > 0) {
        const vat = result * (vatPercent / 100);
        result += vat;
      }
      return toLocaleFormat({ text: result });
    };

    return {
      getURL,
      infos,
      getPeriodType,
      toLocaleFormat,
      getPercentNumber,
      sum,
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
        padding-top: 1.5rem;
        // .logo {
        //   width: 100px;
        // }
        h1 {
          font-size: 23px;
          text-align: center;
          font-weight: 900;
        }
        .paper-info {
          position: absolute;
          top: 0.5rem;
          left: 0.25rem;
          display: flex;
          justify-content: end;
          small {
            margin: 0 12px;
            color: #666;
            font-size: 13px;
          }
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

.table-wrapper {
  .table.table-collapse {
    tr {
      th,
      td {
        border: 1px solid $gray-3;
        vertical-align: middle;
        padding: 0.25rem;
        text-align: center;
      }
      th {
        font-size: 12px;
        font-weight: 700;
        background-color: #ededed;
        @media print {
          font-size: 8.5pt;
        }
        &.th-category {
          background-color: rgb(255, 204, 213);
          color: rgb(196, 9, 9);
          font-weight: 700;
          &.client {
            background-color: rgb(60, 200, 255);
            color: rgb(4, 53, 232);
          }
        }
      }
      td {
        font-size: 13px;
        @media print {
          font-size: 9pt;
        }
      }
    }
  }
}

// 도장
.stamp-wrapper {
  position: relative;
  strong {
    position: relative;
    z-index: 3;
  }
  img.stamp {
    position: absolute;
    z-index: 2;
    bottom: -1rem;
    right: -1rem;
    width: 60px;
    height: auto;
    @media print {
      width: 1.5cm;
    }
  }
}
pre.pre-add-text {
  font-family: "Pretendard-Light", "Noto Sans KR", sans-serif;
  font-weight: 400;
  overflow-wrap: normal;
  overflow: visible;
  font-size: 16px;
}
</style>
