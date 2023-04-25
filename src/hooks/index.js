// 封装函数
// 数据懒加载
import { useIntersectionObserver } from '@vueuse/core'


export const useLazyData = (apiFn) => {
    const target = ref('');
    const result = ref([])
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }], observerElement) => {
            // 是否进入可视区
            if (isIntersecting) {
                stop() //停止监听
                apiFn().then(res => {
                        result.value = res.data
                    }) // 调用函数
            }
        },
    )
    return { target, result }
}