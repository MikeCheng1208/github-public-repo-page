import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "../lib/Throttle";

export function useScrollDown() {
  const isBottom = ref(false);

  const scrollDownFn = throttle(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 100) {
      isBottom.value = true;
    } else {
      isBottom.value = false;
    }
  });

  onMounted(() => {
    window.addEventListener("scroll", scrollDownFn);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollDownFn);
  });

  return { isBottom };
}
