<template>
  <div>
    <QuillEditor
      theme="snow"
      @update:content="onUpdate"
      content-type="html"
      :content="content"
      :modules="modules"
      toolbar="full"
    />
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageUploader from "quill-image-uploader";
export default {
  components: {
    QuillEditor,
  },
  props: {
    content: {
      type: String,
      defalut: null,
    },
  },
  setup(app, context) {
    const { storageAPI } = inject("firebase");
    const resize = inject("resize");
    // const value = ref("");
    const onUpdate = (content) => {
      context.emit("update", content);
    };

    const modules = {
      name: "imageUploader",
      module: ImageUploader,
      options: {
        upload: (file) => {
          return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);
            const type = file?.type.split("/").at(-1);
            const fileName = `images_${new Date().valueOf()}.${type}`;
            // gif 이미지 업로드
            if (type === "gif") {
              try {
                const { name, url } = await storageAPI.getImageURL(
                  file,
                  "gif",
                  "images/gif/",
                  fileName
                );
                if (name && url) {
                  return resolve(url);
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
                  "images",
                  fileName
                );
                if (name && url) {
                  return resolve(url);
                }
              });
            }
          });
        },
      },
    };

    return {
      // value,
      modules,
      onUpdate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
