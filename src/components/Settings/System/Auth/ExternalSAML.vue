<template>
  <div>
    <b-form-group label-cols="3">
      <b-form-checkbox
        v-model="value.enabled"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('enabled') }}
      </b-form-checkbox>
    </b-form-group>

    <div>
      <b-form-group
        :label="$t('name')"
        :description="$t('desc.name')"
        label-cols="3"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.name" />
        </b-input-group>
      </b-form-group>

      <h5>
        {{ $t('certificate') }}
      </h5>

      <b-form-group
        :label="$t('cert')"
        label-cols="3"
        :description="$t('desc.cert')"
      >
        <b-input-group>
          <b-form-textarea
            v-model.trim="value.cert"
          />
        </b-input-group>
      </b-form-group>
      <b-form-group
        :label="$t('cert-key')"
        label-cols="3"
        :description="$t('desc.cert-key')"
      >
        <b-input-group>
          <b-form-textarea v-model.trim="value.key" />
        </b-input-group>
      </b-form-group>

      <h5
        class="mt-2"
      >
        {{ $t('idp.title') }}
      </h5>

      <b-form-group
        :label="$t('idp.url')"
        :description="$t('desc.idp.url')"
        label-cols="3"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp.url" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('idp.ident-name')"
        :description="$t('desc.idp.ident-name')"
        label-cols="3"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-name']" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('idp.ident-handle')"
        :description="$t('desc.idp.ident-handle')"
        label-cols="3"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-handle']" />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('idp.ident-identifier')"
        :description="$t('desc.idp.ident-identifier')"
        label-cols="3"
      >
        <b-input-group>
          <b-form-input v-model.trim="value.idp['ident-identifier']" />
        </b-input-group>
      </b-form-group>
    </div>

    <security
      v-model="value.security"
    />
  </div>
</template>
<script>
import Security from './ExternalSecurity'

export default {
  name: 'SamlExternalAuthProvider',

  i18nOptions: {
    namespaces: 'system.settings',
    keyPrefix: 'editor.external.saml',
  },

  components: {
    Security,
  },

  props: {
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
