import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "../lib/Throttle";

export function useScrollBottom() {
  const isBottom = ref(false);

  const scrollBottom = throttle(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 100) {
      isBottom.value = true;
    } else {
      isBottom.value = false;
    }
  });

  onMounted(() => {
    window.addEventListener("scroll", scrollBottom);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollBottom);
  });

  return { isBottom };
}
