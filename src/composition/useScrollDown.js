import { onMounted, onUnmounted, ref } from "vue";
import { Throttle } from "../lib/Throttle";

export function useScrollDown() {
  const isDown = ref(false);

  const scrollDownFn = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight > scrollHeight - 100) {
      isDown.value = true;
    } else {
      isDown.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", Throttle(scrollDownFn));
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", Throttle(scrollDownFn));
  });

  return { isDown };
}
