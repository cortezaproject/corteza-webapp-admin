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
        {{ $t('providerEnabled') }}
      </b-form-checkbox>
    </b-form-group>

    <div v-if="value.enabled">
      <b-form-group
        :label="$t('saml.name')"
        :description="$t('saml.desc.name')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.name" />
        </b-input-group>
      </b-form-group>

      <h5>
        {{ $t('certificate') }}
      </h5>

      <b-form-group
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
        :label="$t('saml.cert-key')"
        label-cols="2"
        :description="$t('saml.desc.cert-key')"
      >
        <b-input-group>
          <b-form-textarea v-model.trim="value.key" />
        </b-input-group>
      </b-form-group>

      <h5
        class="mt-2"
      >
        {{ $t('saml.idp.title') }}
      </h5>

      <b-form-group
        :label="$t('saml.idp.url')"
        :description="$t('saml.desc.idp.url')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp.url" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('saml.idp.ident-name')"
        :description="$t('saml.desc.idp.ident-name')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-name']" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('saml.idp.ident-handle')"
        :description="$t('saml.desc.idp.ident-handle')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-handle']" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('saml.idp.ident-identifier')"
        :description="$t('saml.desc.idp.ident-identifier')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-identifier']" />
        </b-input-group>
      </b-form-group>
    </div>
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
