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
      <div class="table-wrapper">
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const items = ref(["", "", "", "", "", "", "", "", "", "", ""]);
    return { getURL, items };
  },
};
</script>

<style lang="scss" scoped>
.news-link {
  text-decoration: none;
  color: $gray-1;
}
</style>
