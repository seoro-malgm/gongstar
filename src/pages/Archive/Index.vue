<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">ARCHIVE</h1>
    </header>
    <section>
      <transition-group name="swipe" tag="div" class="row mx-n1" appear>
        <div
          class="col-12 col-md-6 col-lg-4 archive-item-column mb-1 mb-md-3 px-1"
          :class="`swipe-${side[Math.round(Math.random() * (side.length - 1))]} ${Math.round(
            Math.random() * side.length - 1
          )}`"
          v-for="(item, i) in items"
          :key="i"
          :data-index="i"
          :style="{
            transitionDelay: `${i * 0.4 + 1}s`,
          }"
          @mouseenter="hoveredItem = item"
          @mouseleave="hoveredItem = null"
          @click="
            $router.push({
              name: 'ArchiveDetail',
              params: {
                id: item.id,
              },
            })
          "
        >
          <figure class="archive-item bg-img ratio-56">
            <img class="item-image" :src="item.thumbnail" :alt="`${item.title} 썸네일 이미지`" />
            <figcaption class="p-3">
              <strong
                class="text-22 text-md-24 text-truncate line-2"
                :style="{ top: '1rem', left: '1rem' }"
              >
                {{ item.title }}
              </strong>
              <span class="text-13 text-md-14" :style="{ top: '1rem', right: '1rem' }">
                {{ item.author }}
              </span>
              <span class="text-13 text-md-14" :style="{ bottom: '1rem', left: '1rem' }">
                {{ item.category }}
              </span>
              <span class="text-13 text-md-14" :style="{ bottom: '1rem', right: '1rem' }">
                {{ item.date.start }}
                <template v-if="item.date?.end"> ~ {{ item.date.end }} </template>
              </span>
            </figcaption>
          </figure>
        </div>
      </transition-group>
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
// import allArchive from "@/database/archive.json";

export default {
  setup() {
    // const items = allArchive;
    // console.log("items:", items);
    const getURL = inject("getImageURL");
    const side = ref(["top", "bottom", "left", "right"]);
    // const items = ref([
    //   {
    //     id: 1,
    //     title: "잔무늬거울 재현 잔무늬거울 재현 잔무늬거울 재현 잔무늬거울 재현 잔무늬거울 재현 ",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 2,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 3,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 4,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 5,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 6,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 7,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 8,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 9,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    //   {
    //     id: 10,
    //     title: "잔무늬거울 재현",
    //     author: "DCS LAB",
    //     date: "2022-03-01",
    //     category: "3D",
    //   },
    // ]);
    const { boardAPI } = inject("firebase");
    const items = ref(null);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("archive");
      items.value = data;
    };
    onMounted(() => {
      getItems();
    });

    const hoveredItem = ref(null);
    return { getURL, side, items, hoveredItem };
  },
};
</script>

<style lang="scss" scoped>
.archive-item-column {
  .archive-item {
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
    .archive-item {
      &:after {
        top: 0;
        left: 0;
      }
    }
  }
  &.swipe-bottom {
    .archive-item {
      &:after {
        bottom: 0;
        left: 0;
      }
    }
  }
  &.swipe-left {
    .archive-item {
      &:after {
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
      }
    }
  }
  &.swipe-right {
    .archive-item {
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
  .archive-item {
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
    .archive-item {
      &:after {
        height: 100%;
      }
    }
  }
  &.swipe-left,
  &.swipe-right {
    .archive-item {
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
