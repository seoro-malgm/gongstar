<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-group">
            <h6>썸네일</h6>
            <label
              for="thumbnail"
              class="btn btn-primary position-relative"
              v-if="!form?.thumbnail && !pending.thumbnail"
            >
              썸네일 등록하기
            </label>
            <template v-if="pending.thumbnail">
              <div class="spinner-border" role="status" />
            </template>

            <template v-if="form?.thumbnail && !pending.thumbnail">
              <button class="btn btn-black px-2 py-1 mb-2" @click.prevent="form.thumbnail = null">
                썸네일 삭제
              </button>
              <img :src="form.thumbnail" alt="" />
            </template>
            <input
              type="file"
              class="form-control d-none"
              id="thumbnail"
              accept=".png, .jpg, .jpeg"
              @change="uploadThumbnail"
            />
          </div>
        </div>
      </div>
      <div class="row align-items-end">
        <div class="col-12 col-md-3">
          <div class="form-group my-3">
            <label for="no" class="d-block">순서번호 </label>
            <input type="number" class="form-control" id="no" v-model="form.no" />
            <small>(이 순서번호의 역순으로 정리됩니다)</small>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="title">제목</label>
        <input type="text" class="form-control" id="title" v-model="form.title" />
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
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, watch } from "vue";
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

    watch(
      () => pending.value.thumbnail,
      (n, oldValue) => {
        console.log("n:", n);
      }
    );

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
      form.value.thumbnail = null;
      const type = file?.type.split("/").at(-1);
      const fileName = `thumbnail_${new Date().valueOf()}.${type}`;
      // gif 이미지 업로드
      if (type === "gif") {
        // pending 시작
        pending.value.thumbnail = true;
        try {
          const { name, url } = await storageAPI.getImageURL(
            file,
            "gif",
            "thumbnail/gif/",
            fileName
          );
          if (name && url) {
            form.value.thumbnail = url;
            pending.value.thumbnail = false;
          }
        } catch (error) {
          window.toast("파일업로드 실패");
          pending.value.thumbnail = false;
        }
      }
      // gif 이미지가 아닌 경우 파일 업로드
      else {
        // pending 시작
        pending.value.thumbnail = true;
        console.log("1:", pending.value.thumbnail);
        // 가로 1000으로 리사이징하여 url 적용함
        resize.photo("w", file, 1000, "object", async (result) => {
          try {
            const { name, url } = await storageAPI.getImageURL(
              result.blob,
              result.blob.type,
              "thumbnail",
              fileName
            );
            if (name && url) {
              form.value.thumbnail = url;
              pending.value.thumbnail = false;
              console.log("2:", pending.value.thumbnail);
            }
          } catch (error) {
            window.toast("파일업로드 실패");
            pending.value.thumbnail = false;
          }
        });
      }
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
        router.push("/admin/blog");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      form.value.no = route?.query?.no;
      if (id.value) {
        init("blog", id.value);
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
