<template>
  <b-row class="mb-2">
    <h2
      class="col-lg-4 col-sm-12"
      v-html="title"
    />
    <b-button-toolbar
      v-if="hasButtons"
      class="col-lg-8 col-sm-12 px-1 justify-content-lg-end"
    >
      <slot />
    </b-button-toolbar>
  </b-row>
</template>

<script>
export default {
  name: 'CContentHeader',

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    hasButtons () {
      return !!this.$slots['default']
    },
  },
}
</script>
