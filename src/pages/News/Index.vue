<template>
  <div class="">
    <section>
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">NEWS</h1>
        </header>
      </div>
    </section>
    <div class="container-fluid container-md pb-5">
      <transition-group name="fade-up" tag="div" class="row m-1" appear>
        <div
          class="col-6 col-md-3 news-column px-1 mb-2"
          v-for="(item, i) in items"
          :key="i"
          :data-index="i"
          :style="{
            transitionDelay: `${i * 0.1}s`,
          }"
        >
          <div class="news">
            <a
              role="link"
              :href="item.url"
              target="_blank"
              class="bg-img ratio-100 d-block b-btn btn-text"
              :style="{ background: `url(${item.images[0]})` }"
            />
          </div>
        </div>
      </transition-group>
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
                  <a href="#" class="news-link">
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
export default {
  setup() {
    const getURL = inject("getImageURL");
    const { boardAPI } = inject("firebase");
    const items = ref(null);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("news");
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
.news-link {
  text-decoration: none;
  color: $gray-1;
}

.news {
  position: relative;
  .news-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: rgba($color: #000000, $alpha: 0.4);
    h6 {
      color: white;
    }
    span {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
  }
}

// .news-column {
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
