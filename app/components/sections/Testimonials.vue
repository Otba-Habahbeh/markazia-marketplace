<script setup lang="ts">
import type {UserProps} from '@nuxt/ui'

const {t} = useI18n()

const testimonials: { user: UserProps; quote: string }[] = [
  {
    user: {
      name: t('markazia.testimonials.t1.name'),
      description: t('markazia.testimonials.t1.description'),
      avatar: {
        src: 'https://media.licdn.com/dms/image/v2/C4E03AQEY3pmXsH8hDg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1519741249442?e=1746057600&v=beta&t=dvQfBT9ah03MPNy9cnly30ugreeCdxG4nrxV3lwKAC8',
        loading: 'lazy'
      }
    },
    quote: t('markazia.testimonials.t1.quote')
  },
  {
    user: {
      name: t('markazia.testimonials.t2.name'),
      description: t('markazia.testimonials.t2.description'),
      avatar: {
        src: 'https://pbs.twimg.com/profile_images/1824690890222485504/lQ7v1AGt_400x400.jpg',
        loading: 'lazy'
      }
    },
    quote: t('markazia.testimonials.t2.quote')
  },
  {
    user: {
      name: t('markazia.testimonials.t3.name'),
      description: t('markazia.testimonials.t3.description'),
      avatar: {
        src: 'https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/acidjazz',
        srcset: 'https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/acidjazz 2x',
        loading: 'lazy'
      }
    },
    quote: t('markazia.testimonials.t3.quote')
  },
  {
    user: {
      name: t('markazia.testimonials.t4.name'),
      description: t('markazia.testimonials.t4.description'),
      avatar: {
        src: 'https://pbs.twimg.com/profile_images/1607353032420769793/I8qQSUfQ_400x400.jpg',
        loading: 'lazy'
      }
    },
    quote: t('markazia.testimonials.t4.quote')
  },
  {
    user: {
      name: t('markazia.testimonials.t5.name'),
      description: t('markazia.testimonials.t5.description'),
      avatar: {
        src: 'https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/harlan-zw',
        srcset: 'https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/harlan-zw 2x',
        loading: 'lazy'
      }
    },
    quote: t('markazia.testimonials.t5.quote')
  }

]
</script>

<template>
  <div class="flex flex-col gap-4 w-full mb-20">
    <UMarquee
        pause-on-hover
        :overlay="false"
        :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1' }"
    >
      <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
          description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-3'
        }"
          class="w-64 shrink-0"
      >
        <template #footer>
          <UUser v-bind="testimonial.user" size="xl" :ui="{ description: 'line-clamp-1' }"/>
        </template>
      </UPageCard>
    </UMarquee>

    <UMarquee
        pause-on-hover
        reverse
        :overlay="false"
        :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1' }"
    >
      <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
          description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-3'
        }"
          class="w-64 shrink-0"
      >
        <template #footer>
          <UUser v-bind="testimonial.user" size="xl" :ui="{ description: 'line-clamp-1' }"/>
        </template>
      </UPageCard>
    </UMarquee>
  </div>
</template>
