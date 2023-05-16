<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 mb-3">
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="form-group my-3">
                <label for="no">순서번호</label>
                <small class="d-block">(이 순서번호의 역순으로 정리됩니다)</small>
                <input type="text" class="form-control" id="no" v-model="form.no" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 mb-3">
          <div class="form-group mb-3">
            <label for="title">제목</label>
            <input type="text" class="form-control" id="title" v-model="form.title" />
          </div>
        </div>
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

        <div class="col-12 col-md-6 mb-3">
          <label for="category">카테고리</label>
          <select class="form-select" v-model="form.category">
            <option v-for="(item, i) in categories" :key="i" :value="item.value">
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="">
        <label for="desc">내용</label>
        <!-- <form-editor></form-editor> -->
        <BaseEditor @update="($event) => (form.desc = $event)" :content="form.desc" />
      </div>
    </section>
    <section class="row justify-content-end">
      <div class="col-12 col-lg-3">
        <button class="btn btn-gray-2 w-100 py-2 text-20" @click="showPreview = true">
          미리보기
        </button>
      </div>
      <div class="col-12 col-lg-3 ms-auto">
        <div class="d-flex align-items-center pt-3 justify-content-end">
          <div class="form-check form-switch">
            <label class="form-check-label" for="visible"
              >글
              {{ form?.visible ? "공개" : "비공개" }}
            </label>
            <input class="form-check-input" type="checkbox" id="visible" v-model="form.visible" />
          </div>
        </div>
      </div>
      <div class="col-3">
        <button
          class="btn btn-primary w-100 py-2 text-20"
          @click="
            $emit(id ? 'update' : 'submit', {
              ...form,
              date: new Date().toLocaleString(),
            })
          "
        >
          {{ id ? "수정" : "업로드" }}
        </button>
      </div>
    </section>
    <div id="preview-wrapper" v-show="showPreview">
      <insights-detail
        :isPreview="true"
        :showPreview="showPreview"
        :previewItem="form"
        @close-preview="showPreview = false"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import FormEditor from "@/components/FormEditor.vue";
import InsightsDetail from "@/pages/Insights/Detail.vue";

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    FormEditor,
    InsightsDetail,
  },
  setup() {
    const { boardAPI, storageAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const showPreview = ref(false);

    // 폼
    const form = ref({
      no: null,
      title: null,
      thumbnail: null,
      category: null,
      date: null,
      desc: "",
      visible: false,
    });

    // 대기
    const pending = ref({
      thumbnail: false,
      submit: false,
    });

    // 카테고리
    const categories = computed(() => {
      return store.getters["categories/getCategoryInsights"];
    });

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
        // 가로 1000으로 리사이징하여 url 적용함
        resize.photo("w", file, 960, "object", async (result) => {
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
              // console.log("2:", pending.value.thumbnail);
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
        const data = await boardAPI.getBoardById(documentName, id);
        if (data) {
          // ref를 찾은 뒤에 form에 적용함
          form.value = {
            ...data,
          };
        }
      } catch (error) {
        window.toast("잘못된 접근입니다");
        console.error("error:", error);
        router.push("/admin/insights");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      form.value.no = route?.query?.no;
      if (id.value) {
        init("insights", id.value);
      }
    });

    return {
      form,
      categories,
      uploadThumbnail,
      showPreview,
      pending,
    };
  },
};
</script>

<style lang="scss" scoped>
#preview-wrapper {
  width: 100vw;
  position: fixed;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 2000;
}
</style>
