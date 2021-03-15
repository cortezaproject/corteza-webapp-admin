<template>
  <b-row
    class="mb-2"
    no-gutters
  >
    <b-col
      cols="12"
      md="4"
    >
      <h2
        v-html="title"
      />
    </b-col>
    <b-col
      cols="12"
      md="8"
    >
      <b-button-toolbar
        class="justify-content-end"
      >
        <slot />
      </b-button-toolbar>
    </b-col>
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
