<template>
  <b-row class="mb-2">
    <h2
      class="col-4"
      v-html="title"
    />
    <b-button-toolbar
      class="col-8 px-2 justify-content-end"
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
}
</script>
