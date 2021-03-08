<template>
  <b-form-group
    v-if="value.enabled"
    :label="`${title}: ${value.handle}`"
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
      :label="$t('handle')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input
          v-model.trim="value.handle"
          :formatter="alphanum"
        />
      </b-input-group>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('issuer')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.issuer" />
      </b-input-group>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('key')"
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
</style>
