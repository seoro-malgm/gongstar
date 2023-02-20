<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-3 mb-3">
          <div class="form-group" v-if="!form.images.length">
            <h6>이미지추가</h6>
            <!-- <input
              type="file"
              class="form-control"
              id="news"
              multiple
              accept=".png, .jpg, .jpeg"
              @change="($event) => uploadImage($event)"
              ref="files"
            /> -->
            <input
              type="file"
              class="form-control"
              id="news"
              accept=".png, .jpg, .jpeg"
              @change="uploadImage"
              ref="files"
            />
          </div>
        </div>
        <div>
          <h6>이미지</h6>
          <ul class="list-instyled row m-0 mb-3 p-0 pb-3 border-bottom">
            <template v-if="form?.images?.length">
              <li class="col-3" v-for="(item, i) in form.images" :key="i">
                <label
                  class="bg-img ratio-53 rounded position-relative"
                  :style="{
                    background: item ? `url(${item})` : '#999999',
                  }"
                >
                  <template v-if="item">
                    <div class="position-absolute" :style="{ top: '10px', right: '10px' }">
                      <button
                        class="btn btn-black px-2 py-1"
                        @click.prevent="form.images.splice(i, 1)"
                      >
                        삭제
                      </button>
                    </div>
                  </template>
                </label>
              </li>
            </template>
            <template v-else>
              <li class="p-4 text-center text-gray-2 text-13">추가된 이미지가 없습니다</li>
            </template>
          </ul>
        </div>
        <div class="col-4 mb-3">
          <div class="form-group mb-3">
            <label for="no">순서번호(이 순서번호의 역순으로 정리됩니다)</label>
            <input type="number" class="form-control" id="no" v-model="form.no" />
          </div>
        </div>
        <div class="col-8 mb-3">
          <label for="url">SNS 링크 주소</label>
          <input type="text" class="form-control" id="url" v-model="form.url" />
        </div>
        <div class="col-12 mb-3">
          <label for="desc">내용</label>
          <textarea class="form-control" id="desc" v-model="form.desc" rows="5" />
        </div>
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
import { ref, computed, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup() {
    const resize = inject("resize");
    const { boardAPI, storageAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();

    const pending = ref({
      init: false,
      profile: false,
      submit: false,
    });

    const files = ref(null);
    const form = ref({
      images: [],
      desc: null,
      url: null,
    });

    const uploadImage = async (e) => {
      // const arr = e.target.files;
      // for (let index = 0; index < arr.length; index++) {
      // const file = arr[index];
      const file = e.target.files[0];
      if (!file) return;
      const type = file?.type.split("/").at(-1);
      const fileName = `news_${new Date().valueOf()}.${type}`;
      // 가로 1000으로 리사이징하여 url 적용함
      resize.photo("w", file, 1000, "object", async (result) => {
        const { name, url } = await storageAPI.getImageURL(
          result.blob,
          result.blob.type,
          "news",
          fileName
        );
        if (name && url) {
          // form.value.images.push(url);
          form.value.images.push(url);
        }
      });
      // }
      // files.value = null;
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
        router.push("/admin/news");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      form.value.no = route?.query?.no;
      if (id.value) {
        init("news", id.value);
      }
    });

    return {
      files,
      form,
      uploadImage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
