<template>
  <div>
    <transition name="fade">
      <div class="global-toast" v-if="option?.show">
        <p>{{ option.message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch } from "vue";
export default {
  props: {
    option: {
      type: Object,
      default: {
        show: false,
        message: null,
      },
    },
  },
  setup(props, context) {
    watch(
      () => props.option.show,
      (n) => {
        if (n) {
          setTimeout(() => {
            context.emit("close");
          }, 1500);
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.global-toast {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 320px;
  height: inherit;
  background-color: #222;
  padding: 16px;

  p {
    text-align: center;
    color: white;
    margin: auto;
  }
}
</style>
