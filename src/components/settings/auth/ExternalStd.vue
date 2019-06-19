<template>
  <b-form-group :label="title">
    <b-form-group label-cols="3">
      <b-form-checkbox plain v-model="value.enabled" :value="true" :unchecked-value="false">
        {{$t('auth-settings.external-providers.provider-enabled')}}
      </b-form-checkbox>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.client-key')" label-cols="3">
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
  name: 'StandardExternalAuthProvider',

  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>
<style scoped lang="scss">
</style>
