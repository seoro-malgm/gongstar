<template>
  <div class="search-input">
    <div class="dim" @click="$emit('on-close')"></div>
    <div class="input-wrapper">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-md-8 col-lg-5">
          <div class="d-flex align-items-center">
            <div class="input-group">
              <input
                type="text"
                class="form-control text-14 text-lg-20"
                v-model="str"
                placeholder="검색어를 입력하세요"
                @keypress.enter="search()"
              />
              <div class="input-group-append"></div>
            </div>
            <div class="ms-3">
              <button class="btn btn-text p-0 btn-search" @click="search()">
                <i class="icon icon-search-1 text-24"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(app, context) {
    const str = ref(null);
    const search = () => {
      context.emit("on-search", str.value);
      str.value = null;
    };
    return {
      str,
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  .dim {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(4px);
  }
  .input-wrapper {
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .input-group {
      position: relative;
      border-radius: 10px;
      box-shadow: 0px 0px 12px rgba($color: #000000, $alpha: 0.4);
      background-color: rgba($color: #000000, $alpha: 0.4);
      z-index: 6;
      .form-control {
        padding: 1rem 1.4rem;
        border: 0;
        border-radius: 4px;
        background-color: transparent;
        color: white;
        &:focus {
          z-index: 1;
        }
        &::placeholder {
          color: rgba($color: #ffffff, $alpha: 0.7);
        }
      }
    }
  }
}
.btn-search {
  i.icon {
    mix-blend-mode: difference;
  }
}
</style>
