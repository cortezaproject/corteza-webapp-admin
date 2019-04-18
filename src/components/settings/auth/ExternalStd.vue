<template>
  <b-form-group :label="title">
    <b-form-group horizontal>
      <b-form-checkbox plain v-model="value.enabled" :value="true" :unchecked-value="false">
        {{$t('auth-settings.external-providers.provider-enabled')}}
      </b-form-checkbox>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.client-key')" horizontal>
      <b-input-group>
        <b-form-input v-model="value.key" />
      </b-input-group>
    </b-form-group>
    <b-form-group :label="$t('auth-settings.external-providers.secret')" horizontal>
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
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
</style>
