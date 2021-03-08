<template>
  <b-form-group
    :label="title"
    label-size="lg"
  >
    <b-form-group label-cols="2">
      <b-form-checkbox
        v-model="value.enabled"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('provider-enabled') }}
      </b-form-checkbox>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('client-key')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.key" />
      </b-input-group>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('secret')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.secret" />
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
