<template>
  <b-form-group :label="`${title}: ${value.handle}`">
    <b-form-group label-cols="3">
      <b-form-checkbox plain v-model="value.enabled" :value="true" :unchecked-value="false">
        {{$t('auth-settings.external-providers.provider-enabled')}}
      </b-form-checkbox>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.handle')" label-cols="3">
      <b-input-group>
        <b-form-input v-model="value.handle" :formatter="alphanum" />
      </b-input-group>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.issuer')" label-cols="3">
      <b-input-group>
        <b-form-input v-model="value.issuer" />
      </b-input-group>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.key')" label-cols="3">
      <b-input-group>
        <b-form-input v-model="value.key" />
      </b-input-group>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.secret')" label-cols="3">
      <b-input-group>
        <b-form-input v-model="value.secret" />
      </b-input-group>
    </b-form-group>
  </b-form-group>
</template>
<script>

export default {
  name: 'OIDCExternalAuthProvider',

  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: Object,
      required: true,
    },
  },

  methods: {
    alphanum (v) {
      return v.replace(/[^a-zA-Z0-9\-_]+/, '')
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
</style>
