<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">Projects</h1>
    </header>
    <!-- <section v-if="items?.length">
      <transition-group name="swipe" tag="div" class="row mx-n1" appear>
        <div v-for="item in items" :key="item.id">
          {{ item }}
        </div>
      </transition-group>
    </section> -->
    <section>
      <div class="d-flex align-items-center justify-content-center p-3">
        <base-error />
      </div>
      <div class="my-4">
        <p class="text-14 text-md-16 text-gray-2 text-center">
          프로젝트 작성을 준비중입니다! 좋은 프로젝트들을 곧 보여드리겠습니다!
        </p>
      </div>
    </section>

    <!-- <transition name="fade-right">
      <header class="page-header" v-if="hoveredItem">
        <h1>
          {{ hoveredItem?.title }}
        </h1>
        <strong class="mt-3">
          {{ hoveredItem?.author }}
        </strong>
      </header>
    </transition> -->
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
// import allProject from "@/database/project.json";

export default {
  setup() {
    // const items = allProject;
    // console.log("items:", items);
    const getURL = inject("getImageURL");
    const side = ref(["top", "bottom", "left", "right"]);

    const { boardAPI } = inject("firebase");
    const items = ref([
      {
        id: 0,
        title: "더미 0",
      },
      {
        id: 1,
        title: "더미 1",
      },
      {
        id: 2,
        title: "더미 2",
      },
    ]);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("project");
      items.value = data;
    };
    onMounted(() => {
      // getItems();
      // console.log("items.value:", items.value);
    });

    const hoveredItem = ref(null);
    return { getURL, side, items, hoveredItem };
  },
};
</script>

<style lang="scss" scoped>
.project-item-column {
  .project-item {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s $default-ease;

    &:after {
      position: absolute;
      content: "";
      display: block;
      width: 100%;
      height: 0;
      z-index: 2;
      background-color: $primary;
    }

    .item-image,
    figcaption {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s;
    }

    .item-image {
      transform: scale(1) translate(-50%, -50%);
      transition: transform 0.3s $default-ease;
    }

    figcaption {
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.4);
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // justify-content: center;
      opacity: 0;
      color: white;

      strong,
      span {
        position: absolute;
        padding: 4px;
        max-width: 50%;
      }
      @media (max-width: 1320px) {
        opacity: 1;
        height: 65%;
        top: unset;
        bottom: 0;
        transform: translate(-50%, 0);
      }
    }

    &:hover {
      transform: scale(0.96);
      cursor: pointer;
      .item-image {
        transform: scale(1.45) translate(-50%, -50%);
      }
      figcaption {
        opacity: 1;
        transition: opacity 0.3s $default-ease;
      }
    }
  }
  &.swipe-top {
    .project-item {
      &:after {
        top: 0;
        left: 0;
      }
    }
  }
  &.swipe-bottom {
    .project-item {
      &:after {
        bottom: 0;
        left: 0;
      }
    }
  }
  &.swipe-left {
    .project-item {
      &:after {
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
      }
    }
  }
  &.swipe-right {
    .project-item {
      &:after {
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
      }
    }
  }
}

.swipe-move,
.swipe-enter-active,
.swipe-leave-active {
  .project-item {
    &:after {
      transition-delay: 2s;
      transition: all 0.8s $default-ease;
    }
  }
}

.swipe-enter-from,
.swipe-leave-to {
  &.swipe-top,
  &.swipe-bottom {
    .project-item {
      &:after {
        height: 100%;
      }
    }
  }
  &.swipe-left,
  &.swipe-right {
    .project-item {
      &:after {
        width: 100%;
      }
    }
  }
}

.page-header {
  position: fixed;
  z-index: 1056;
  top: 240px;
  right: 0;
  user-select: none;
  h1 {
    font-size: 70px;
    padding-right: 10vw;
    border-bottom: 1px solid white;
    font-weight: 900;
    color: white;
  }
  mix-blend-mode: difference;
  strong {
    font-size: 24px;
    color: white;
  }
  @media (max-width: 1320px) {
    display: none;
  }
}

.fade-right-move,
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.4s $default-ease;
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(110%);
}
</style>
