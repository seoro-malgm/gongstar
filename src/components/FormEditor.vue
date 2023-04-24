<template>
  <div>
    <div id="editor" ref="editor"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Quill from "quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  setup() {
    const editor = ref(null);
    let quill = null;

    // Quill.js의 글꼴 매니저 등록
    let Font = Quill.import("formats/font");
    Font.whitelist = [
      "Roboto",
      "Pretendard-Regular",
      "Noto Sans KR",
      "sans-serif",
      "serif",
      "monospace",
      "cursive",
      "fantasy",
    ];
    Quill.register(Font, true);

    // 글꼴 추가
    let Roboto = Quill.import("formats/font");
    Roboto.whitelist = ["Roboto"];
    Quill.register(Roboto, true);
    Roboto.DEFAULTS = {
      "font-family": "Roboto",
      css: `url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;500;700;900&display=swap)`,
    };

    let Pretendard = Quill.import("formats/font");
    Pretendard.whitelist = ["Pretendard-Regular"];
    Quill.register(Pretendard, true);
    Pretendard.DEFAULTS = {
      "font-family": "Pretendard-Regular",
      "font-weight": "400",
      css: `url("https://cdn.jsdelivr.net/gh/project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff") format("woff")`,
    };

    let NotoSans = Quill.import("formats/font");
    NotoSans.whitelist = ["Noto Sans KR"];
    Quill.register(NotoSans, true);
    NotoSans.DEFAULTS = {
      "font-family": "Noto Sans KR",
      css: `url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;500;700;900&display=swap)`,
    };

    onMounted(() => {
      quill = new Quill(editor.value, {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [
              {
                font: [
                  "Roboto",
                  "Pretendard-Regular",
                  "Noto Sans KR",
                  "sans-serif",
                  "serif",
                  "monospace",
                ],
              },
            ],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
        placeholder: "내용을 입력하세요",
        theme: "snow",
      });
    });

    return {
      editor,
    };
  },
};
</script>

<style lang="scss">
#editor {
  position: relative;
  .ql-editor {
    height: 650px;
    overflow-y: scroll;
  }
  .ql-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .ql-container {
    font-family: "Roboto", "Pretendard-Regular", "Noto Sans KR", sans-serif;
  }
}
</style>
