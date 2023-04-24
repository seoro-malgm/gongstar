<template>
  <section class="section-gap mt-5">
    <div class="container">
      <template v-if="(!isPreview && !item) || (isPreview && !previewItem)">
        <div class="p-5 text-center">
          <div class="spinner-border" />
        </div>
      </template>
      <template v-else>
        <div class="content-wrapper">
          <article class="content-container">
            <header
              class="mb-3 pb-3 pb-lg-0 border-bottom d-flex flex-column flex-lg-row align-items-lg-end"
            >
              <h1 class="text-20 text-lg-40 fw-900 mb-0 lh-0">{{ item?.title }}</h1>
            </header>
            <hr class="my-0" />
            <section class="desc mb-lg-5 py-4">
              <p v-html="item?.desc" class="w-100 content" />
            </section>
          </article>
        </div>
        <div class="floating-btns">
          <button v-if="isPreview" class="btn btn-primary" @click="$emit('close-preview')">
            <i class="icon icon-cancel" />
            <span clas="">미리보기 닫기</span>
          </button>
          <button class="btn btn-primary" @click="goTo(0, 0)" v-if="!isPreview">
            <i class="icon icon-up-big" />
            <span clas="text-white">맨 위로</span>
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, inject, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// import allProject from "@/database/project.json";

export default {
  props: {
    isPreview: {
      type: Boolean,
      default: false,
    },
    showPreview: {
      type: Boolean,
      default: false,
    },
    previewItem: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    // const items = allProject;
    const getURL = inject("getImageURL");
    const route = useRoute();
    const router = useRouter();
    const id = computed(() => {
      return route?.params?.id;
    });

    const query = computed(() => {
      return route?.query;
    });

    const { boardAPI } = inject("firebase");
    const item = ref(null);
    const getItem = async (preview) => {
      if (preview) {
        item.value = props.previewItem;
        console.log("item.value:", item.value);
      } else {
        const data = await boardAPI.getBoard("project", id.value);
        item.value = data;
      }
    };
    onMounted(() => {
      if (props.isPreview) {
        getItem(true);
      } else if (!props.isPreview && id.value) {
        getItem();
      } else {
        window.alert("잘못된 접근입니다");
        router.replace("/project");
      }
    });
    watch(
      () => props.showPreview,
      (n) => {
        getItem(true);
      }
    );

    const goTo = (x, y) => {
      window.scrollTo(x, y);
    };

    return { getURL, id, item, goTo };
  },
};
</script>

<style lang="scss" scoped>
.list-dot {
  list-style-type: disc;
}
.desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  figure {
    img {
      width: inherit;
    }
    figcaption {
      padding-top: 8px;
      color: #777;
    }
  }
  $default-line-height: 1.6;

  // content
  .content {
    &:deep(*) {
      font-family: "Roboto", "Noto Sans KR", "Pretendard-Regular", sans-serif;
      line-height: $default-line-height !important;
    }
    &:deep(span),
    &:deep(span *),
    &:deep(p),
    &:deep(p *) {
      margin-bottom: 0;
      font-size: 14px;
      @media (min-width: $breakpoint-md) {
        font-size: 16px;
      }
    }
    &:deep(h1),
    &:deep(h1 *) {
      font-size: 36px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 40px;
      }
    }
    &:deep(h2),
    &:deep(h2 *) {
      font-size: 32px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 36px;
      }
    }
    &:deep(h3),
    &:deep(h3 *) {
      font-size: 28px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 32px;
      }
    }
    &:deep(h4),
    &:deep(h4 *) {
      font-size: 24px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 28px;
      }
    }
    &:deep(h5),
    &:deep(h5 *) {
      font-size: 18px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 24px;
      }
    }
    &:deep(h6),
    &:deep(h6 *) {
      font-size: 16px;
      line-height: $default-line-height !important;
      @media (min-width: $breakpoint-md) {
        font-size: 18px;
      }
    }
    &:deep(.ql-size-small),
    &:deep(.ql-size-small *) {
      font-size: 12px;
      @media (min-width: $breakpoint-md) {
        font-size: 13px;
      }
    }
    &:deep(.ql-size-large),
    &:deep(.ql-size-large *) {
      font-size: 22px;
      @media (min-width: $breakpoint-md) {
        font-size: 24px;
      }
    }
    &:deep(.ql-size-huge),
    &:deep(.ql-size-huge *) {
      font-size: 30px;
      @media (min-width: $breakpoint-md) {
        font-size: 32px;
      }
    }

    $indents: (1, 2, 3, 4, 5, 6, 8);
    @each $var in $indents {
      &:deep(.ql-indent-#{$var}),
      &:deep(.ql-indent-#{$var} *) {
        padding-left: calc($var * 1rem);
      }
    }
    &:deep(.ql-font-serif),
    &:deep(.ql-font-serif *) {
      font-family: "Noto Serif KR", serif;
    }
    &:deep(.ql-font-monospace),
    &:deep(.ql-font-monospace *) {
      font-family: "Roboto Mono", monospace;
    }
    &:deep(ol) {
      list-style-type: decimal;
      font-size: 16px;
    }
    &:deep(ul) {
      list-style-type: disc;
      font-size: 16px;
    }
    &:deep(strong),
    &:deep(strong *) {
      font-weight: 900 !important;
    }
    $text-aligns: (left, right, center, justify);
    @each $var in $text-aligns {
      &:deep(.ql-align-#{$var}),
      &:deep(.ql-align-#{$var} *) {
        text-align: #{$var};
      }
    }
    &:deep(.ql-align-right),
    &:deep(.ql-align-right *) {
      text-align: right;
      &.ql-direction-rtl {
        text-align: right;
      }
    }
    &:deep(div.ql-video),
    &:deep(iframe.ql-video) {
      width: 100%;
      min-height: 240px;
      @media (min-width: $breakpoint-lg) {
        min-height: 480px;
      }
    }
  }
}
$ratio: 67vh;
$ratio-md: 45%;
.content-wrapper {
  .thumbnail {
    position: fixed;
    position: fixed;
    width: 100vw;
    padding-bottom: $ratio;
    @media (min-width: $breakpoint-md) {
      padding-bottom: $ratio-md;
    }
    top: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: top center;
    @media (min-width: $breakpoint-md) {
      background-position: center center;
      background-size: cover;
    }
  }
  .content-container {
    background-color: white;
    margin-top: calc($ratio-md + 100px);
    padding: 1rem;
    box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.2);
    @media (min-width: $breakpoint-lg) {
      margin: 0 auto;
      width: 90vw;
      max-width: 1046px;
      padding: 2rem;
      margin-top: calc($ratio - 100px);
      box-shadow: 0 0 32px rgba($color: #000000, $alpha: 0.2);
    }
    @media (min-width: $breakpoint-xxl) {
      margin: 0 auto;
      width: 75vw;
      max-width: 1046px;
      margin-top: calc($ratio - 100px);
      box-shadow: 0 0 32px rgba($color: #000000, $alpha: 0.2);
    }
  }
}
.floating-btns {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 12px;
  }
}
</style>
