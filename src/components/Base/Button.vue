<template>
  <button class="btn" :variant="variant" :type="type">
    <slot></slot>
  </button>
</template>

<script>
  import {ref} from 'vue';
  export default {
    props: {
      variant: {
        type: String,
        default: 'primary',
      },
      type: {
        type: String,
        default: 'fill',
      },
    },
    setup(props) {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  button.btn {
    border-width: 1px;
    border-style: solid;
    background: none;
    border-radius: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    min-height: 24px;
    border-radius: 4px;
    &[type='fill'] {
      &[variant='primary'] {
        background-color: $primary;
        border-color: $primary;
        color: $white;
      }
    }
    &[type='outline'] {
      &[variant='primary'] {
        background-color: transparent;
        border-color: $primary;
        color: $white;
      }
    }
    &[type='text'] {
      background-color: transparent;
      border-color: transparent;
    }
    &[rounded='circle'] {
      border-radius: 50%;
    }
  }
</style>
