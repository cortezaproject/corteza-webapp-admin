<template>
  <section id="satosa">
    <p>SaTOSA</p>

    <ul>
      <li v-for="(item, idx) in providers" :key="'satosa-index-' + idx">
        <a :href="'/admin/satosa/' + item.name">{{item.title}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import providers from '@/api/providers'

export default {
  data () {
    return {
      providers: providers,
    }
  },
}
</script>
