<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="submit"
    >
      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="(authclient.meta || {}).name"
          required
        />
      </b-form-group>

      <b-form-group
        :label="$t('handle.label')"
        label-cols="2"
      >
        <b-form-input
          v-model="authclient.handle"
          :disabled="authclient.isDefault"
        />
        <template
          v-if="authclient.isDefault"
          #description
        >
          {{ $t('handle.disabledFootnote') }}
        </template>
      </b-form-group>

      <b-form-group>
        <template #label>
          <b-row
            no-gutters
          >
            <b-col
              cols="2"
            >
              {{ $t('redirectURI') }}
            </b-col>
            <b-col>
              <b-button
                variant="light"
                class="align-top"
                @click="redirectURI.push('')"
              >
                + {{ $t('add') }}
              </b-button>
            </b-col>
          </b-row>
        </template>

        <b-form-group
          v-if="redirectURI.length"
          label-cols="2"
          class="mb-0"
        >
          <b-input-group
            v-for="(value, index) in redirectURI"
            :key="index"
            class="mb-2"
          >
            <b-form-input
              v-model="redirectURI[index]"
              placeholder="URI"
            />

            <b-button
              class="ml-1 text-danger"
              variant="link"
              @click="redirectURI.splice(index, 1)"
            >
              <font-awesome-icon
                :icon="['fas', 'times']"
              />
            </b-button>
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <b-form-group
        v-if="authclient.authClientID"
        :label="$t('secret')"
        label-cols="2"
        class="mb-3"
      >
        <b-input-group>
          <b-form-input
            v-model="secret.value"
            disabled
            placeholder="****************************************************************"
          />

          <b-button
            v-if="!secret.show"
            class="ml-1 text-primary"
            variant="link"
            @click="showSecret()"
          >
            <font-awesome-icon
              :icon="['fas', 'eye']"
            />
          </b-button>

          <b-button
            v-else
            class="ml-1 text-primary"
            variant="link"
            @click="regenerateSecret()"
          >
            <font-awesome-icon
              :icon="['fas', 'sync']"
            />
          </b-button>
        </b-input-group>
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-radio-group
          v-model="authclient.grant"
          value="authorization_code"
          :options="[
            { value: 'authorization_code', text: $t('grant.authorization_code') },
            { value: 'client_credentials', text: $t('grant.client_credentials') },
          ]"
        />
      </b-form-group>

      <b-form-group
        :label="$t('validFrom.label')"
        label-cols="2"
        :description="$t('validFrom.description')"
      >
        <b-input-group>
          <b-form-datepicker
            v-model="validFrom.date"
            locale="en"
          />

          <b-form-timepicker
            v-model="validFrom.time"
            locale="en"
          />

          <b-button
            class="ml-1 text-secondary"
            variant="link"
            @click="resetDateTime('validFrom')"
          >
            <font-awesome-icon
              :icon="['fas', 'sync']"
            />
          </b-button>
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('expiresAt.label')"
        label-cols="2"
        :description="$t('expiresAt.description')"
      >
        <b-input-group>
          <b-form-datepicker
            v-model="expiresAt.date"
            locale="en"
          />

          <b-form-timepicker
            v-model="expiresAt.time"
            locale="en"
          />

          <b-button
            class="ml-1 text-secondary"
            variant="link"
            @click="resetDateTime('expiresAt')"
          >
            <font-awesome-icon
              :icon="['fas', 'sync']"
            />
          </b-button>
        </b-input-group>
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-checkbox
          :checked="(authclient.scope || []).includes('profile')"
          @change="setScope($event, 'profile')"
        >
          {{ $t('profile') }}
        </b-form-checkbox>
        <b-form-checkbox
          :checked="(authclient.scope || []).includes('api')"
          @change="setScope($event, 'api')"
        >
          {{ $t('api') }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-checkbox
          v-model="authclient.trusted"
        >
          {{ $t('trusted.label') }}
        </b-form-checkbox>
        <b-form-text>{{ $t('trusted.description') }}</b-form-text>
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-checkbox
          v-model="authclient.enabled"
          :disabled="authclient.isDefault"
        >
          {{ $t('enabled.label') }}
        </b-form-checkbox>

        <template
          v-if="authclient.isDefault"
          #description
        >
          {{ $t('enabled.disabledFootnote') }}
        </template>
      </b-form-group>

      <b-form-group
        v-if="authclient.grant === 'client_credentials'"
        label-cols="2"
        :label="$t('security.impersonateUser.label')"
        :description="$t('security.impersonateUser.description')"
      >
        <b-form-input
          v-model="authclient.security.impersonateUser"
          type="number"
          class="mb-3"
        />
      </b-form-group>

      <c-role-picker
        label="security.permittedRoles.label"
        :description="$t('security.permittedRoles.description')"
        :current-roles.sync="permittedRoles"
        class="mb-3"
      />

      <c-role-picker
        label="security.forbiddenRoles.label"
        :description="$t('security.forbiddenRoles.description')"
        :current-roles.sync="forbiddenRoles"
        class="mb-3"
      />

      <c-role-picker
        label="security.forcedRoles.label"
        :description="$t('security.forcedRoles.description')"
        :current-roles.sync="forcedRoles"
        class="mb-3"
      />

      <b-form-group
        v-if="authclient.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          :value="authclient.createdAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>
      <b-form-group
        v-if="authclient.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="authclient.updatedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="authclient.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="authclient.deletedAt | locLongDate"
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
        :disabled="!isValid"
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
        :disabled="!isValid"
        :processing="processing"
        :success="success"
        @submit="submit"
      />

      <confirmation-toggle
        v-if="!authclient.isDefault && authclient && authclient.authClientID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CRolePicker from 'corteza-webapp-admin/src/components/CRolePicker'

export default {
  name: 'CAuthclientEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.authclients' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
    CRolePicker,
  },

  props: {
    authclient: {
      type: Object,
      required: true,
    },

    roles: {
      type: Array,
      required: true,
      default: () => [],
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },
  },

  data () {
    return {
      redirectURI: [],

      secret: {
        show: false,
        value: '',
      },

      validFrom: {
        date: undefined,
        time: undefined,
      },

      expiresAt: {
        date: undefined,
        time: undefined,
      },

      permittedRoles: [],
      forbiddenRoles: [],
      forcedRoles: [],
    }
  },

  computed: {
    getDeleteStatus () {
      return this.authclient.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    isValid () {
      return !!this.authclient.handle
    },
  },

  watch: {
    'authclient.authClientID': {
      immediate: true,
      handler (authClientID) {
        // New authclient
        if (!authClientID) {
          this.authclient.scope = 'profile api'
          this.authclient.enabled = true
          this.redirectURI = ['']
          this.authclient.security = {}
          this.authclient.grant = 'authorization_code'
        } else {
          if (this.authclient.redirectURI) {
            this.redirectURI = this.authclient.redirectURI.split(' ')
          } else {
            this.redirectURI = []
          }
        }

        if (this.authclient.validFrom) {
          this.validFrom.date = new Date(this.authclient.validFrom).toISOString()
          this.validFrom.time = new Date(this.authclient.validFrom).toTimeString().split(' ')[0]
        }

        if (this.authclient.expiresAt) {
          this.expiresAt.date = new Date(this.authclient.expiresAt).toISOString()
          this.expiresAt.time = new Date(this.authclient.expiresAt).toTimeString().split(' ')[0]
        }

        this.permittedRoles = this.transformRoles(this.authclient.security.permittedRoles)
        this.forbiddenRoles = this.transformRoles(this.authclient.security.forbiddenRoles)
        this.forcedRoles = this.transformRoles(this.authclient.security.forcedRoles)
      },
    },

    redirectURI: {
      handler (redirectURI) {
        this.authclient.redirectURI = redirectURI.filter(ru => ru).join(' ')
      },
    },
  },

  methods: {
    submit () {
      if (this.validFrom.date && this.validFrom.time) {
        this.authclient.validFrom = new Date(`${this.validFrom.date} ${this.validFrom.time}`).toISOString()
      } else {
        this.authclient.validFrom = undefined
      }

      if (this.expiresAt.date && this.expiresAt.time) {
        this.authclient.expiresAt = new Date(`${this.expiresAt.date} ${this.expiresAt.time}`).toISOString()
      } else {
        this.authclient.expiresAt = undefined
      }

      this.authclient.security.permittedRoles = this.permittedRoles
        .filter(({ current, dirty }) => {
          return dirty !== current && dirty
        }).map(({ roleID }) => roleID)

      this.authclient.security.forbiddenRoles = this.forbiddenRoles
        .filter(({ current, dirty }) => {
          return dirty !== current && dirty
        }).map(({ roleID }) => roleID)

      this.authclient.security.forcedRoles = this.forcedRoles
        .filter(({ current, dirty }) => {
          return dirty !== current && dirty
        }).map(({ roleID }) => roleID)

      this.$emit('submit', this.authclient)
    },

    setScope (value, target) {
      let items = this.authclient.scope ? this.authclient.scope.split(' ') : []

      if (value) {
        items.push(target)
      } else {
        items = items.filter(i => i !== target)
      }

      this.authclient.scope = items.join(' ')
    },

    showSecret () {
      this.$SystemAPI.authClientExposeSecret(({ clientID: this.authclient.authClientID }))
        .then(secret => {
          this.secret = {
            show: true,
            value: secret,
          }
        })
    },

    regenerateSecret () {
      this.$SystemAPI.authClientRegenerateSecret(({ clientID: this.authclient.authClientID }))
        .then(newSecret => {
          this.secret.value = newSecret
        })
    },

    transformRoles (currentRoles = []) {
      let transformedRoles = []
      this.roles.forEach(r => {
        let { roleID } = r
        if (roleID !== '1') {
          let current = false
          if (currentRoles.indexOf(roleID) > -1) {
            current = true
          }
          transformedRoles.push({ ...r, current: current, dirty: current })
        }
      })

      return transformedRoles
    },

    resetDateTime (target) {
      if (target) {
        this[target].date = undefined
        this[target].time = undefined
      }
    },
  },
}
</script>
