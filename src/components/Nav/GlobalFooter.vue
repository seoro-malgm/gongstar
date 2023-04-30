<template>
  <footer id="global-footer">
    <div class="container-fluid">
      <div class="title">
        <h4>공스타는 여성기업인증, 충남 예비사회적기업입니다.</h4>
      </div>
      <div class="py-4">
        <div class="row">
          <div class="col-4 col-md-2">
            <img class="logo" :src="getURL('/assets/logo.svg')" alt="" />
          </div>
          <div class="d-flex flex-column flex-md-row align-items-md-end justify-content-between">
            <ul class="links mt-4 px-3">
              <li>
                <h1 class="my-2 text-14 text-md-15 fw-700">주식회사 공스타</h1>
              </li>
              <li>
                <button
                  class="btn btn-text p-0 text-secondary"
                  @click="copyText(infos.phone, '전화번호가')"
                >
                  <i class="icon icon-phone-outline text-16" />
                  <span class="ms-2 text-14">
                    {{ infos.phone }}
                  </span>
                </button>
              </li>
              <li>
                <button
                  class="btn btn-text p-0 text-secondary"
                  @click="copyText(infos.email, '이메일 주소가')"
                >
                  <i class="icon icon-mail-2 text-16" />
                  <span class="ms-2 text-14">
                    {{ infos.email }}
                  </span>
                </button>
              </li>
              <li>
                <button
                  class="btn btn-text p-0 text-secondary text-start"
                  @click="copyText(infos.addressSummary, '주소가')"
                >
                  <i class="icon icon-compass text-16" />
                  <span class="ms-2 text-14">
                    {{ infos.addressSummary }}
                  </span>
                </button>
              </li>
              <li>
                <a class="btn btn-text p-0 text-secondary" :href="infos.instagram" target="_blank">
                  <i class="icon icon-instagram text-16" />
                </a>
              </li>
            </ul>
            <div class="mt-2 mt-md-0" v-if="infos?.infoDocument">
              <a
                :href="infos.infoDocument"
                target="_blank"
                class="btn btn-outline-gray-1 rounded-pill px-3 py-2 fw-700 text-12 text-md-14"
              >
                공스타 회사소개서 다운로드
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const copyText = inject("copyText");
    // 정보
    const store = useStore();
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });
    return { getURL, copyText, infos };
  },
};
</script>

<style lang="scss" scoped>
#global-footer {
  font-size: 14px;
  padding: 2rem 0.5rem;
  .title {
    padding: 8px 0;
    border-bottom: 1px solid $gray-1;
    h4 {
      color: $gray-1;
    }
  }
}
</style>
