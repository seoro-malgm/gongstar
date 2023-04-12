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
          <ul class="links mt-4">
            <li>
              <button
                class="btn btn-text p-0 text-secondary"
                @click="copyText(infos.email, '전화번호가')"
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
                class="btn btn-text p-0 text-secondary"
                @click="copyText(infos.addressSummary, '주소가')"
              >
                <i class="icon icon-compass text-16" />
                <span class="ms-2 text-14">
                  {{ infos.address }}
                </span>
              </button>
            </li>
            <li>
              <a class="btn btn-text p-0 text-secondary" :href="infos.instagram" target="_blank">
                <i class="icon icon-instagram text-16" />
              </a>
            </li>
          </ul>
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
  background-color: $primary;
  font-size: 14px;
  padding: 2rem 0;
  .title {
    padding: 8px 0;
    border-bottom: 1px solid $gray-1;
    h4 {
      color: $gray-1;
    }
  }
}
</style>
