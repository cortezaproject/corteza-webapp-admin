<template>
  <b-form
    @submit.prevent="$emit('upload')"
  >
    <div
      v-if="value"
      class="preview mb-1 p-2"
    >
      <img
        :src="value"
      >
    </div>

    <c-uploader
      v-if="!disabled"
      :endpoint="endpoint"
      :labels="labels"
      @upload="$emit('upload', $event)"
    />
  </b-form>
</template>

<script>
import CUploader from 'corteza-webapp-admin/src/components/CUploader'

export default {
  name: 'CUploaderWithPreview',

  components: {
    CUploader,
  },

  props: {
    value: {
      type: String,
      default: () => undefined,
    },

    disabled: {
      type: Boolean,
      default: () => false,
    },

    labels: {
      type: Object,
      default: () => ({}),
    },

    endpoint: {
      type: String,
      required: true,
    },
    acceptedFiles: {
      type: Array,
      default: () => [],
    },

    maxFilesize: {
      type: Number,
      default: 100,
    },
  },

  data () {
    return {
      panels: [],
    }
  },
}
</script>
<style lang="scss">
.preview {
  overflow: hidden;
  height: 300px;
  background: $dark;
  display: grid;
  align-items: center;
  img {
    margin: 0 auto;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
