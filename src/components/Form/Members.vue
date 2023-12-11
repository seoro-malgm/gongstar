<template>
  <div>
    <section class="py-3">
      <div class="row">
        <div class="col-12 col-md-4 mb-3">
          <div class="form-group">
            <h6>프로필 이미지</h6>
            <label
              for="profile"
              class="bg-img ratio-100 rounded position-relative img-contain"
              :style="{
                background: form?.profile ? `url(${form.profile})` : '#999999'
              }"
            >
              <template v-if="pending.profile">
                <div class="spinner-border absolute-center" role="status" />
              </template>
              <template v-else-if="!form?.profile && !pending.profile">
                <div class="absoulte-center text-center">
                  여기를 눌러 <br />
                  프로필 추가하세요.
                </div>
              </template>
              <template v-else-if="form?.profile && !pending.profile">
                <!-- <div class="position-absolute" :style="{ top: '10px', right: '10px' }">
                  <button class="btn btn-black px-2 py-1" @click.prevent="form.profile = null">
                    삭제
                  </button>
                </div> -->
              </template>
            </label>
            <small v-if="form?.profile"
              >이미지를 눌러 새 사진을 불러올 수 있습니다.</small
            >
            <input
              type="file"
              class="form-control d-none"
              id="profile"
              accept=".png, .jpg, .jpeg"
              @change="$event => uploadProfile($event)"
            />
          </div>
        </div>

        <div class="col-12 col-md-8">
          <div class="form-group mb-3">
            <label for="no"
              >순서번호(이 순서번호의 순서대로 정리됩니다, 중복주의)</label
            >
            <input type="text" class="form-control" id="no" v-model="form.no" />
          </div>
          <div class="form-group mb-3">
            <label for="name">이름</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              placeholder="멤버의 이름을 선택하세요"
            />
          </div>
          <div class="row">
            <div class="col-12 col-md-4 mb-3">
              <div class="form-group mb-3">
                <label for="category">직책</label>
                <input
                  type="text"
                  class="form-control"
                  id="type"
                  v-model="form.duty"
                  placeholder="멤버의 직책을 입력하세요"
                />
              </div>
            </div>
            <div class="col-12 col-md-8 mb-3">
              <label for="skill">직무</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="skill"
                  v-model="keyword"
                  @keypress.enter="addKeyword(keyword, 'skill')"
                />
                <button
                  class="btn btn-primary"
                  @click="addKeyword(keyword, 'skill')"
                >
                  추가
                </button>
              </div>
              <ul class="list-unstyled d-inline-flex flex-wrap mt-2">
                <li
                  v-for="(item, i) in form.skill"
                  :key="i"
                  class="me-1 mb-2 d-flex align-items-center bg-primary px-3 py-1 rounded-pill"
                >
                  <span class="text-14 fw-700"> {{ item }} </span>
                  <button
                    class="btn btn-text p-0 ms-2 text-20"
                    @click="form.skill.splice(i, 1)"
                  >
                    <i class="icon icon-cancel-circled" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- <div class="form-group mb-3">
            <label for="type">중분류(학사,석사과정 등)</label>
            <input
              type="text"
              class="form-control"
              id="type"
              v-model="form.type"
              placeholder="멤버의 분류를 입력하세요"
            />
          </div>

          <div class="form-group mb-3">
            <label for="employment">소속</label>
            <input
              type="text"
              class="form-control"
              id="employment"
              v-model="form.employment"
            />
          </div> -->
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
import { createLogger } from "vuex";
// import allMembers from "@/database/members.json";

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  components: {
    // QuillEditor,
  },
  setup(props, context) {
    const { boardAPI, storageAPI } = inject("firebase");
    const router = useRouter();
    const route = useRoute();

    const pending = ref({
      init: false,
      profile: false,
      submit: false
    });

    const form = ref({
      no: null,
      profile: null,
      name: null,
      duty: null, // 직책
      skill: [] // 직무
    });

    const keyword = ref(null);
    const addKeyword = (word, key) => {
      console.log({
        word,
        key,
        asd: form.value[key]
      });
      form.value[key].push(word);
      keyword.value = null;
    };

    const resize = inject("resize");
    // 이미지 업로드 후 url 불러오기
    const uploadProfile = async (e, path) => {
      const file = e.target.files[0];
      if (!file) return;
      // 초기화
      // const oldURL = path ? form.value.profileHovered : form.value.profile;
      // if (oldURL) {
      //   storageAPI.deleteImage(`profile/${oldURL}`);
      // }
      // pending 시작
      if (path) {
        form.value.profileHovered = null;
        pending.value.profileHovered = true;
      } else {
        form.value.profile = null;
        pending.value.profile = true;
      }

      const type = file?.type.split("/").at(-1);
      const fileName = `profile_${new Date().valueOf()}.${type}`;
      // gif 이미지 업로드
      if (type === "gif") {
        try {
          const { name, url } = await storageAPI.getImageURL(
            file,
            "gif",
            "profile/gif/",
            fileName
          );
          if (name && url) {
            if (path) {
              form.value.profileHovered = url;
              pending.value.profileHovered = false;
            } else {
              form.value.profile = url;
              pending.value.profile = false;
            }
          }
        } catch (error) {
          window.toast("파일업로드 실패");
          pending.value.profileHovered = false;
          pending.value.profile = false;
        }
      } else {
        // gif 이미지가 아닌 경우 파일 업로드
        // 가로 1000으로 리사이징하여 url 적용함
        resize.photo("w", file, 1000, "object", async result => {
          const { name, url } = await storageAPI.getImageURL(
            result.blob,
            result.blob.type,
            "profile",
            fileName
          );
          if (name && url) {
            if (path) {
              form.value.profileHovered = url;
              pending.value.profileHovered = false;
            } else {
              form.value.profile = url;
              pending.value.profile = false;
            }
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
        console.log(data);
        if (data) {
          // ref를 찾은 뒤에 form에 적용함
          form.value = {
            ...data
          };
        }
      } catch (error) {
        window.toast("잘못된 접근입니다");
        console.error("error:", error);
        router.push("/admin/members");
      }
      pending.value.init = false;
    };
    onMounted(() => {
      form.value.no = route?.query?.no;
      if (id.value) {
        init("members", id.value);
      }

      // for (let index = 0; index < allMembers.length; index++) {
      //   const element = allMembers[index];
      //   context.emit("submit", element);
      // }
    });

    return {
      form,
      keyword,
      addKeyword,
      uploadProfile,
      pending
    };
  }
};
</script>

<style lang="scss" scoped></style>
