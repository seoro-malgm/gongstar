<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="title">제목</label>
            <input type="text" class="form-control" id="title" v-model="form.title" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="subtitle">부제목</label>
            <input type="text" class="form-control" id="subtitle" v-model="form.subtitle" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="subject">과업</label>
            <input type="text" class="form-control" id="subject" v-model="form.subject" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <label for="client">지원기관</label>
            <input type="text" class="form-control" id="client" v-model="form.client" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="start">작업 시작</label>
          <div class="form-group">
            <input type="date" class="form-control" id="start" v-model="form.date.start" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="end">작업 시작일</label>
          <div class="form-group">
            <input type="date" class="form-control" id="end" v-model="form.date.end" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="keyword">키워드(#제외)</label>
          <div class="form-group">
            <input type="text" class="form-control" id="keyword" v-model="form.keyword" />
          </div>
        </div>
        <div class="col-12 mb-3">
          <label for="summary">요약</label>
          <textarea class="form-control" id="summary" v-model="form.summary" rows="5" />
        </div>
      </div>
      <div class="">
        <label for="desc">내용</label>
        <quill-editor theme="snow" />
      </div>
    </section>
    <section class="row justify-content-end">
      <!-- <div class="col-3"></div> -->
      <div class="col-3">
        <button
          class="btn btn-outline-primary w-100 py-2 text-20"
          @click="$emit(id ? 'update' : 'submit', form)"
        >
          {{ id ? "수정" : "업로드" }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    QuillEditor,
  },
  setup() {
    const form = ref({
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

    return {
      form,
    };
  },
};
</script>

<style lang="scss" scoped></style>
