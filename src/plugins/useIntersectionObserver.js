import { ref, onMounted, onBeforeUnmount } from "vue";

export function useIntersectionObserver(callback, options = {}) {
  const target = ref(null);

  const observer = new IntersectionObserver(([entry]) => {
    callback(entry);
  }, options);

  onMounted(() => {
    observer?.observe(target.value);
  });

  onBeforeUnmount(() => {
    observer?.unobserve(target.value);
  });

  return target;
}
