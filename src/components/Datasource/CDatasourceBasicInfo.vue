<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <b-form-group
      :label="$t('location')"
      label-class="text-primary"
    >
      {{ datasource.location }}
    </b-form-group>

    <b-form-group
      :label="$t('ownership')"
      label-class="text-primary"
      class="mb-0"
    >
      {{ datasource.ownership }}
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  name: 'CDatasourceBasicInfo',

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'editor.info',
  },

  props: {
    datasource: {
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
