<template>
  <b-card
    class="shadow-sm"
    body-class="p-0"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-card-header
      class="bg-white pb-0"
    >
      <h3>
        {{ $t('title') }}
      </h3>
      <hr>
    </b-card-header>
    <b-card-body
      class="py-0"
    >
      <b-form-group
        :label="$t('location')"
        class="mb-2 text-primary"
      >
        <b-form-input
          :value="dataSource.location"
          style="font-size: 17px;"
          class="pb-1"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('ownership')"
        class="mb-0 text-primary"
      >
        <b-form-input
          :value="dataSource.ownership"
          style="font-size: 17px;"
          class="pb-2"
          plaintext
          disabled
        />
      </b-form-group>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CDataSourcesEditorInfo',

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'editor.info',
  },

  props: {
    dataSource: {
      type: Object,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },
  },
}
</script>
