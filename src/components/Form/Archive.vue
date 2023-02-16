<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <h6>썸네일</h6>
            <label for="thumbnail" class="bg-img ratio-53 bg-dummy rounded position-relative">
              <template v-if="!form?.thumbnail">
                <div class="absoulte-center">여기를 눌러 썸네일을 추가하세요.</div>
              </template>
              <template v-else-if="pending.thumbnail">
                <div class="spinner"></div>
              </template>
              <template v-else-if="form?.thumbnail && !pending.thumbnail">
                <div class="position-absolute" :style="{ top: '10px', right: '10px' }">
                  <button class="btn btn-black px-2 py-1" @click="form.thumbnail = null">
                    삭제
                  </button>
                </div>
              </template>
            </label>
            <input type="file" class="form-control d-none" id="thumbnail" @change="uploadImage" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group my-3">
            <label for="no">순서번호</label>
            <input type="number" class="form-control" id="no" v-model="form.no" />
          </div>
          <div class="form-group mb-3">
            <label for="title">제목</label>
            <input type="text" class="form-control" id="title" v-model="form.title" />
          </div>
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
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="keyword"
              v-model="keyword"
              @keypress.enter="addKeyword(keyword)"
            />
            <button class="btn btn-primary" @click="addKeyword(keyword)">추가</button>
          </div>
          <ul class="list-unstyled d-inline-flex flex-wrap mt-2">
            <li
              v-for="(item, i) in form.keyword"
              :key="i"
              class="me-1 mb-2 text-white d-flex align-items-center bg-primary px-3 py-1 rounded-pill"
            >
              <span class="text-14 fw-700"> #{{ item }} </span>
              <button
                class="btn btn-text p-0 ms-2 text-white text-13"
                @click="form.keyword.splice(i, 1)"
              >
                X
              </button>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label for="category">카테고리</label>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              id="category"
              placeholder="카테고리 예시) 3D"
              v-model="form.category"
            />
          </div>
        </div>
        <div class="col-12 mb-3">
          <label for="summary">요약</label>
          <textarea class="form-control" id="summary" v-model="form.summary" rows="5" />
        </div>
      </div>
      <div class="">
        <label for="desc">내용</label>
        <BaseEditor @update="($event) => (form.desc = $event)" />
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

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    // QuillEditor,
  },
  setup() {
    const form = ref({
      no: null,
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
      desc: null,
    });

    const pending = ref({
      thumbnail: false,
      submit: false,
    });

    const keyword = ref(null);
    const addKeyword = (word) => {
      form.value.keyword.push(word);
      keyword.value = null;
    };

    const uploadImage = async () => {
      pending.value.thumbnail = true;
      try {
      } catch (error) {
        console.error("error:", error);
      }
      pending.value.thumbnail = false;
    };

    return {
      form,
      keyword,
      addKeyword,
      uploadImage,
      pending,
    };
  },
};
</script>

<style lang="scss" scoped></style>
