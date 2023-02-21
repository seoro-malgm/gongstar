<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <h6>썸네일</h6>
            <label
              for="thumbnail"
              class="bg-img ratio-53 rounded position-relative"
              :style="{
                background: form?.thumbnail ? `url(${form.thumbnail})` : '#999999',
              }"
            >
              <template v-if="!form?.thumbnail">
                <div class="absoulte-center">여기를 눌러 썸네일을 추가하세요.</div>
              </template>
              <template v-else-if="pending.thumbnail">
                <div class="spinner"></div>
              </template>
              <template v-else-if="form?.thumbnail && !pending.thumbnail">
                <div class="position-absolute" :style="{ top: '10px', right: '10px' }">
                  <button class="btn btn-black px-2 py-1" @click.prevent="form.thumbnail = null">
                    삭제
                  </button>
                </div>
              </template>
            </label>
            <input
              type="file"
              class="form-control d-none"
              id="thumbnail"
              accept=".png, .jpg, .jpeg"
              @change="uploadThumbnail"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group my-3">
            <label for="no">순서번호(이 순서번호의 역순으로 정리됩니다)</label>
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
              type="text"
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
        <BaseEditor @update="($event) => (form.desc = $event)" :content="form.desc" />
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
    <!-- <pre
      style="
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 3000;
        background-color: #ededed;
        padding: 0.5rem;
        width: 300px;
        height: 500px;
        overflow-y: scroll;
        font-size: 14px;
        line-height: 17px;
        color: #000;
        text-align: left;
      "
    >
    form: {{ form }}
    </pre> -->
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

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
    const { boardAPI, storageAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();

    const form = ref({
      no: null,
      title: null,
      thumbnail: null,
      subtitle: null,
      subject: null,
      client: null,
      date: {
        start: null,
        end: null,
      },
      summary: null,
      keyword: [],
      desc: "",
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

    const resize = inject("resize");
    // 이미지 업로드 후 url 불러오기
    const uploadThumbnail = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      // 초기화
      const oldURL = form.value.thumbnail;
      if (oldURL) {
        storageAPI.deleteImage(`thumbnail/${oldURL}`);
      }
      form.value.thumbnail = null;
      // pending 시작
      pending.value.thumbnail = true;
      const type = file?.type.split("/").at(-1);
      const fileName = `thumbnail_${new Date().valueOf()}.${type}`;
      // gif 이미지 업로드
      if (type === "gif") {
        try {
          const { name, url } = await storageAPI.getImageURL(
            file,
            "gif",
            "thumbnail/gif/",
            fileName
          );
          if (name && url) {
            form.value.thumbnail = url;
          }
        } catch (error) {
          window.toast("파일업로드 실패");
        }
      } else {
        // gif 이미지가 아닌 경우 파일 업로드
        // 가로 1000으로 리사이징하여 url 적용함
        resize.photo("w", file, 1000, "object", async (result) => {
          const { name, url } = await storageAPI.getImageURL(
            result.blob,
            result.blob.type,
            "thumbnail",
            fileName
          );
          if (name && url) {
            form.value.thumbnail = url;
          }
        });
      }
      pending.value.thumbnail = false;
    };

    // 수정 불러오기
    const id = computed(() => {
      return route?.query?.id;
    });
    const init = async (documentName, id) => {
      pending.value.init = true;
      try {
        const data = await boardAPI.getBoard(documentName, id);
        if (data) {
          // ref를 찾은 뒤에 form에 적용함
          form.value = {
            ...data,
          };
        }
      } catch (error) {
        window.toast("잘못된 접근입니다");
        console.error("error:", error);
        router.push("/admin/archive");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      form.value.no = route?.query?.no;
      if (id.value) {
        init("archive", id.value);
      }
    });

    return {
      form,
      keyword,
      addKeyword,
      uploadThumbnail,
      pending,
    };
  },
};
</script>

<style lang="scss" scoped></style>
