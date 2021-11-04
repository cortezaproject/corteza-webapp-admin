<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="submit()"
    >
      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.name"
          :state="checkName"
          :disabled="!editable"
        />
      </b-form-group>

      <b-form-group
        :label="$t('handle')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.handle"
          :state="checkHandle"
          :disabled="!editable"
        />
      </b-form-group>

      <b-form-group
        v-if="role.meta"
        :label="$t('description')"
        label-cols="2"
      >
        <b-form-textarea
          v-model="role.meta.description"
          :disabled="!editable"
        />
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-group
          label-cols="0"
        >
          <b-form-checkbox
            v-model="isContext"
            :disabled="!editable"
          >
            {{ $t('context.label') }}
          </b-form-checkbox>
        </b-form-group>
        <div v-if="isContext">
          <b-form-group
            :label="$t('context.expression-label')"
            label-cols="3"
          >
            <b-form-input
              v-model="role.meta.context.expr"
              :disabled="!editable"
            />
          </b-form-group>
          <b-form-group
            :label="$t('context.resource-types-label')"
            label-cols="3"
          >
            <b-checkbox-group
              v-model="role.meta.context.resourceTypes"
              :disabled="!editable"
              :options="resourceTypeOptions"
            />
          </b-form-group>
        </div>
      </b-form-group>

      <b-form-group
        v-if="role.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="role.updatedAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.archivedAt"
        :label="$t('archivedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="role.archivedAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="role.deletedAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          :value="role.createdAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <!--
        include hidden input to enable
        trigger submit event w/ ENTER
      -->
      <input
        type="submit"
        class="d-none"
      >
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        :disabled="disabled || !editable"
        @submit="submit()"
      />

      <confirmation-toggle
        v-if="!fresh && editable"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>

      <confirmation-toggle
        v-if="!fresh && editable"
        class="ml-2"
        cta-class="secondary"
        @confirmed="$emit('status')"
      >
        {{ getArchiveStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import { system, NoID } from '@cortezaproject/corteza-js'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CRoleEditorInfo',

  i18nOptions: {
    namespaces: 'system.roles',
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    role: {
      type: system.Role,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },

    canCreate: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      isContext: false,
    }
  },

  computed: {
    disabled () {
      return this.checkHandle === false || this.checkName === false
    },

    /**
     * Returns true if role is not saved yet (without ID)
     * @returns {boolean}
     */
    fresh () {
      return !this.role.roleID || this.role.roleID === NoID
    },

    editable () {
      return this.fresh ? this.canCreate : !this.role.isSystem && this.role.canUpdateRole
    },

    // At least 1 character
    checkName () {
      return this.editable && this.role.name ? /^.+$/.test(this.role.name) : null
    },

    // 2+ alpha-numeric + _
    checkHandle () {
      return this.editable && this.role.handle ? /^[A-Za-z][0-9A-Za-z_\-.]*[A-Za-z0-9]$/.test(this.role.handle) : null
    },

    getDeleteStatus () {
      return this.role.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    getArchiveStatus () {
      return this.role.archivedAt ? this.$t('unarchive') : this.$t('archive')
    },

    resourceTypeOptions () {
      return this.resourceTypes.map(value => ({
        // @todo use translation facility to generate resource type option labels
        text: value.replace('corteza::', ''),
        value,
      }))
    },

    resourceTypes () {
      // @todo this should be fetched from the backend
      return [
        // 'corteza::system:application',
        'corteza::system:auth-client',
        'corteza::system:role',
        // 'corteza::system:template',
        'corteza::system:user',
        // 'corteza::compose:chart',
        // 'corteza::compose:module-field',
        'corteza::compose:module',
        'corteza::compose:namespace',
        'corteza::compose:page',
        'corteza::compose:record',
        'corteza::automation:workflow',
        // 'corteza::federation:exposed-module',
        // 'corteza::federation:node',
        // 'corteza::federation:shared-module',
      ]
    },
  },

  watch: {
    'role.isContext': {
      immediate: true,
      handler (v) {
        if (v) {
          this.isContext = true
        }
      },
    },
  },

  methods: {
    submit () {
      if (!this.isContext && this.role.isContext) {
        // if checkbox was unchecked on submit, purge meta before submit
        this.role.meta.context.resourceTypes = []
        this.role.meta.context.expr = ''
      }

      this.$emit('submit', this.role)
    },
  },
}
</script>
