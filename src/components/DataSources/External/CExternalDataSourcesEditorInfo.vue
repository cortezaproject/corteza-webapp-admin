<template>
  <b-card
    class="shadow-sm"
    body-class="p-1"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-container>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('info.name')"
            class="mb-3 text-primary"
          >
            <b-form-input
              :value="dataSource.name"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            :label="$t('info.location')"
            class="mb-3 text-primary"
          >
            <b-form-input
              :value="dataSource.location"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('info.url')"
            class="mb-3 text-primary"
          >
            <b-form-input
              :value="dataSource.url"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            :label="$t('info.ownership')"
            class="mb-3 text-primary"
          >
            <b-form-input
              :value="dataSource.ownership"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('info.sensitiveData.label')"
          >
            <b-checkbox
              v-model="dataSource.sensitiveData"
              class="mt-2 ml-3"
            >
              {{ $t('info.sensitiveData.text') }}
            </b-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>

    <template #header>
      <h3>
        {{ $t('title.basic-info') }}
      </h3>
      <hr>
    </template>
  </b-card>
</template>

<script>
export default {
  name: 'CExternalSourcesEditorInfo',

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'external',
  },

  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
