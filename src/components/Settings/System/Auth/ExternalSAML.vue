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
      :label="$t('saml.cert')"
      label-cols="2"
      :description="$t('saml.desc.cert')"
    >
      <b-input-group>
        <b-form-textarea
          v-model.trim="value.cert"
        />
      </b-input-group>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('saml.cert-key')"
      label-cols="2"
      :description="$t('saml.desc.cert-key')"
    >
      <b-input-group>
        <b-form-textarea v-model.trim="value.key" />
      </b-input-group>
    </b-form-group>
    <b-form-group
      v-if="value.enabled"
      :label="$t('saml.idp')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input v-model.trim="value.idp" />
      </b-input-group>
    </b-form-group>
  </b-form-group>
</template>

<script>
export default {
  name: 'SamlExternalAuthProvider',

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
