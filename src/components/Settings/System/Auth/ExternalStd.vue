<template>
  <div>
    <b-form-group label-cols="2">
      <b-form-checkbox
        v-model="value.enabled"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('enabled') }}
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
    <!--
    <c-role-picker
      label="security.permittedRoles.label"
      :description="$t('security.permittedRoles.description')"
      :current-roles.sync="value.security.permittedRoles"
      class="mb-3"
    />

    <c-role-picker
      label="security.forbiddenRoles.label"
      :description="$t('security.forbiddenRoles.description')"
      :current-roles.sync="value.security.forbiddenRoles"
      class="mb-3"
    />

    <c-role-picker
      label="security.forcedRoles.label"
      :description="$t('security.forcedRoles.description')"
      :current-roles.sync="value.security.forcedRoles"
      class="mb-3"
    />
-->
  </div>
</template>

<script>
import CRolePicker from '../../../CRolePicker.vue'
export default {
  name: 'StandardExternalAuthProvider',

  i18nOptions: {
    namespaces: 'system.settings',
    keyPrefix: 'editor.external.standard',
  },

  components: {
    CRolePicker,
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
