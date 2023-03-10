<template>
  <div class="">
    <section>
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">블로그</h1>
        </header>
      </div>
    </section>
    <div class="container-fluid container-md pb-5">
      <div class="grid-container">
        <!-- <transition-group name="fade-up" tag="div" appear> -->
        <div
          class="grid-item"
          v-for="(item, i) in items"
          :key="i"
          :data-index="i"
          :style="{
            transitionDelay: `${i * 0.1}s`,
          }"
        >
          <div class="grid-item-content">
            <a role="link" target="_blank" class="b-btn btn-text">
              <img :src="item.thumbnail" alt="" />
            </a>
          </div>
        </div>
        <!-- </transition-group> -->
      </div>
      <!-- <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>분류</th>
              <th>제목</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="i">
              <td class="text-center">
                <div class="td-container">
                  {{ i }}
                </div>
              </td>
              <td>
                <div class="td-container">
                  <button class="btn btn-primary rounded-pill text-white px-3 py-1 text-13">
                    분류이름
                  </button>
                </div>
              </td>
              <td>
                <div class="td-container">
                  <a href="#" class="blog-link">
                    제목 {{ i }}
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, totam.
                  </a>
                </div>
              </td>
              <td class="text-center">
                <div class="td-container">-</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
          <nav>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  <i class="icon icon-left-dir"></i>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <i class="icon icon-right-dir"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import VueMasonry from "vue-masonry-css";
export default {
  components: {
    VueMasonry,
  },
  setup() {
    const getURL = inject("getImageURL");
    const { boardAPI } = inject("firebase");
    const items = ref(null);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("blog");
      items.value = data;
    };
    onMounted(() => {
      getItems();
    });
    return { getURL, items };
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: start;
  max-height: 92vh;
  padding: 0 10px;
}

.grid-item {
  width: 20%;
  padding: 0.3rem;
}

// .blog-column {
//   transition-delay: 0.25s;
// }
.fade-up-move,
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s $default-ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
