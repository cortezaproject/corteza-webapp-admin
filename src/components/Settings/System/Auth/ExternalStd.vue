<template>
  <div>
    <h3 class="mb-2">
      {{ title }}
    </h3>

    <b-form-group label-cols="2">
      <b-form-checkbox
        v-model="value.enabled"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('providerEnabled') }}
      </b-form-checkbox>
    </b-form-group>
    <b-form-group
      :label="$t('clientKey')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.key" />
      </b-input-group>
    </b-form-group>
    <b-form-group
      :label="$t('clientSecret')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.secret" />
      </b-input-group>
    </b-form-group>
  </div>
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
