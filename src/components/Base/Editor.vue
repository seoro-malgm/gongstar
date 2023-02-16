<template>
  <div>
    <QuillEditor theme="snow" @update:content="onUpdate" content-type="html" />
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  setup(app, context) {
    const onUpdate = (content) => {
      context.emit("update", content);
    };

    return { onUpdate };
  },
};
</script>

<style lang="scss" scoped></style>
