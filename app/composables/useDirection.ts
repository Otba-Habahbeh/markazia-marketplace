import { useI18n } from 'vue-i18n'

export function useDirection() {
    const { locale } = useI18n()

    const isRtl = computed(() => locale.value === 'ar')

    const dir = computed(() => (isRtl.value ? 'rtl' : 'ltr'))
    const lang = computed(() => locale.value)

    return { isRtl, dir, lang }
}