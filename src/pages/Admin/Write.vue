<template>
  <div class="container py-5">
    <header class="pb-4 border-bottom">
      <h1>아카이브 {{ id ? "수정하기" : "새로 올리기" }}</h1>
    </header>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="title">제목</label>
            <input type="text" class="form-control" id="title" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="subtitle">부제목</label>
            <input type="text" class="form-control" id="subtitle" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="subject">과업</label>
            <input type="text" class="form-control" id="subject" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="client">지원기관</label>
            <input type="text" class="form-control" id="client" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="start">작업 시작</label>
          <div class="form-group">
            <input type="date" class="form-control" id="start" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="emd">작업 시작일</label>
          <div class="form-group">
            <input type="date" class="form-control" id="emd" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="keyword">키워드(#제외)</label>
          <div class="form-group">
            <input type="text" class="form-control" id="keyword" />
          </div>
        </div>
        <div class="col-12 mb-3">
          <label for="summary">요약</label>
          <textarea class="form-control" id="summary" rows="5" />
        </div>
      </div>
      <div class="">
        <label for="desc">내용</label>
        <QuillEditor theme="snow" />
      </div>
    </section>
    <section class="row justify-content-end">
      <!-- <div class="col-3"></div> -->
      <div class="col-3">
        <button class="btn btn-outline-primary w-100 py-2 text-20">업로드</button>
      </div>
    </section>

    <!-- 미리보기 -->
    <!-- <pre>
      form:: {{ form }}
    </pre> -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  setup() {
    const form = ref({
      id: null,
      title: null,
      subtitle: null,
      subject: null,
      client: null,
      date: {
        start: null,
        end: null,
      },
      summary: null,
      keyword: [],
      images: [],
    });

    const route = useRoute();
    const id = computed(() => {
      return route?.query?.id;
    });
    return {
      id,
      form,
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  font-weight: 700;
}
</style>
