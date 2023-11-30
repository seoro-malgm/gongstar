<template>
  <div id="editor">
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
  import {ref, computed, inject, onMounted} from 'vue';
  import {QuillEditor} from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import ImageUploader from 'quill-image-uploader';
  // import * as QuillTableUI from "quill-table-ui";
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
      const {storageAPI} = inject('firebase');
      const resize = inject('resize');
      const onUpdate = content => {
        context.emit('update', content);
      };

      const modules = {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: file => {
            return new Promise(async (resolve, reject) => {
              const formData = new FormData();
              formData.append('image', file);
              const type = file?.type.split('/').at(-1);
              const fileName = `images_${new Date().valueOf()}.${type}`;
              // gif 이미지 업로드
              if (type === 'gif') {
                try {
                  const {name, url} = await storageAPI.getImageURL(
                    file,
                    'gif',
                    'images/gif/',
                    fileName,
                  );
                  if (name && url) {
                    // console.log("url:", url);
                    return resolve(url);
                  } else {
                    reject('Upload failed');
                  }
                } catch (error) {
                  window.toast('이미지 업로드에 실패했습니다');
                }
              } else if (type !== 'gif') {
                // gif 이미지가 아닌 경우 파일 업로드
                // 가로 1000으로 리사이징하여 url 적용함
                try {
                  resize.photo('w', file, 1920, 'object', async result => {
                    const {name, url} = await storageAPI.getImageURL(
                      result.blob,
                      result.blob.type,
                      'images',
                      fileName,
                    );
                    if (name && url) {
                      // console.log("url:", url);

                      return resolve(url);
                    } else {
                      reject('Upload failed');
                      window.toast('이미지 업로드에 실패했습니다');
                    }
                  });
                } catch (error) {
                  reject('Upload failed');
                  window.toast('이미지 업로드에 실패했습니다');
                }
              }
            });
          },
        },
      };

      return {
        modules,
        onUpdate,
      };
    },
  };
</script>

<style lang="scss">
  $default-line-height: 1.6;
  #editor {
    position: relative;
    .ql-editor {
      min-height: 85vh;
      overflow-y: scroll;
      padding-top: 88px;
      line-height: $default-line-height !important;
    }
    .ql-toolbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background-color: white;
    }
    .ql-container {
      font-family: 'Roboto', 'Noto Sans KR', 'Pretendard-Regular', sans-serif !important;
    }

    // desc
    span,
    span *,
    p,
    p * {
      font-size: 14px;
      @media (min-width: $breakpoint-md) {
        font-size: 16px;
      }
    }
    h1,
    h1 * {
      font-size: 36px;
      @media (min-width: $breakpoint-md) {
        font-size: 40px;
      }
    }
    h2,
    h2 * {
      font-size: 32px;
      @media (min-width: $breakpoint-md) {
        font-size: 36px;
      }
    }
    h3,
    h3 * {
      font-size: 28px;
      @media (min-width: $breakpoint-md) {
        font-size: 32px;
      }
    }
    h4,
    h4 * {
      font-size: 24px;
      @media (min-width: $breakpoint-md) {
        font-size: 28px;
      }
    }
    h5,
    h5 * {
      font-size: 18px;
      @media (min-width: $breakpoint-md) {
        font-size: 24px;
      }
    }
    h6,
    h6 * {
      font-size: 16px;
      @media (min-width: $breakpoint-md) {
        font-size: 18px;
      }
    }
    .ql-size-small,
    .ql-size-small * {
      font-size: 12px;
      @media (min-width: $breakpoint-md) {
        font-size: 13px;
      }
    }
    .ql-size-large,
    .ql-size-large * {
      font-size: 22px;
      @media (min-width: $breakpoint-md) {
        font-size: 24px;
      }
    }
    .ql-size-huge,
    .ql-size-huge * {
      font-size: 30px;
      @media (min-width: $breakpoint-md) {
        font-size: 32px;
      }
    }
    $indents: (1, 2, 3, 4, 5, 6, 8);
    @each $var in $indents {
      .ql-indent-#{$var},
      .ql-indent-#{$var} * {
        padding-left: calc($var * 1rem);
      }
    }
    .ql-font-serif,
    .ql-font-serif * {
      font-family: 'Noto Serif KR', serif;
    }
    .ql-font-monospace,
    .ql-font-monospace * {
      font-family: 'Roboto Mono', monospace;
    }
    ol {
      list-style-type: decimal;
      font-size: 16px;
    }
    ul {
      list-style-type: disc;
      font-size: 16px;
    }
    strong,
    strong * {
      font-weight: 900 !important;
    }
    $text-aligns: (left, right, center, justify);
    @each $var in $text-aligns {
      .ql-align-#{$var},
      .ql-align-#{$var} * {
        text-align: #{$var};
      }
    }
    .ql-align-right,
    .ql-align-right * {
      text-align: right;
      &.ql-direction-rtl {
        text-align: right;
      }
    }
    div.ql-video,
    iframe.ql-video {
      width: 100%;
      min-height: 240px;
      @media (min-width: $breakpoint-lg) {
        min-height: 480px;
      }
    }
  }

  h6,
  .h6,
  h5,
  .h5,
  h4,
  .h4,
  h3,
  .h3,
  h2,
  .h2,
  h1,
  .h1 {
    line-height: $default-line-height !important;
  }
</style>
