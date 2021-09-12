<template>
  <b-card
    class="shadow-sm auth-clients"
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
          v-model="authclient.meta.name"
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

      <b-form-group
        :label="$t('redirectURI')"
        label-cols="2"
      >
        <b-button
          variant="light"
          class="align-top"
          @click="redirectURI.push('')"
        >
          + {{ $t('add') }}
        </b-button>

        <div
          v-if="redirectURI.length"
        >
          <b-input-group
            v-for="(value, index) in redirectURI"
            :key="index"
            class="mt-2"
          >
            <b-form-input
              v-model="redirectURI[index]"
              :placeholder="$t('uri')"
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
        </div>
      </b-form-group>

      <b-form-group
        v-if="authclient.authClientID"
        :label="$t('secret')"
        label-cols="2"
        class="mb-3"
      >
        <b-input-group>
          <b-form-input
            v-model="secret"
            disabled
            placeholder="****************************************************************"
          />

          <b-button
            v-if="!secretVisible"
            class="ml-1 text-primary"
            variant="link"
            @click="fetchSecret()"
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
            :placeholder="$t('choose-date')"
            locale="en"
          />

          <b-form-timepicker
            v-model="validFrom.time"
            :placeholder="$t('no-time')"
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
            :placeholder="$t('choose-date')"
            locale="en"
          />

          <b-form-timepicker
            v-model="expiresAt.time"
            :placeholder="$t('no-time')"
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

      <div v-if="authclient.grant === 'client_credentials'">
        <b-form-group
          label-cols="2"
          :label="$t('security.impersonateUser.label')"
          :description="$t('security.impersonateUser.description')"
        >
          <c-select-user
            :user-i-d="authclient.security.impersonateUser"
            @updateUser="onUpdateUser"
          />
        </b-form-group>
        <div v-if="authclient.authClientID">
          <b-form-group label-cols="2">
            <b-button
              variant="light"
              class="align-top"
              @click="toggleCurlSnippet()"
            >
              <template v-if="curlVisible">
                {{ $t('hideCurl') }}
              </template>
              <template v-else>
                {{ $t('generateCurl') }}
              </template>
            </b-button>
          </b-form-group>
          <b-form-group
            v-if="curlVisible"
            :label="$t('cUrl')"
            label-cols="2"
            class="mb-0 curl"
          >
            <b-input-group>
              <div class="w-100">
                <div class="d-flex">
                  <pre
                    ref="cUrl"
                    class="mr-2"
                  >
        curl -X POST {{ curlURL }} \
        -d grant_type=client_credentials \
        -d scope='profile api' \
        -u {{ authclient.authClientID }}:{{ secret }}</pre>
                  <b-button
                    variant="link"
                    class="align-top ml-auto fit-content text-secondary"
                    @click="copyToClipboard('cUrl')"
                  >
                    <font-awesome-icon
                      :icon="['far', 'copy']"
                    />
                  </b-button>
                </div>
                <div class="d-flex">
                  <div
                    class="overflow-wrap mr-2 mb-2"
                    :class="[tokenRequest.token ? 'text-success' : 'text-danger']"
                  >
                    {{ tokenRequest.token || tokenRequest.error }}
                  </div>
                  <b-button
                    v-if="tokenRequest.token"
                    variant="link"
                    class="align-top ml-auto fit-content text-secondary"
                    @click="copyToClipboard('token')"
                  >
                    <font-awesome-icon
                      :icon="['far', 'copy']"
                    />
                  </b-button>
                </div>
              </div>
            </b-input-group>
            <div class="d-flex mb-3">
              <b-button
                variant="light"
                class="align-top fit-content"
                @click="getAccessTokenAPI()"
              >
                {{ $t('testCurl') }}
              </b-button>
            </div>
          </b-form-group>
        </div>
      </div>

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
          :value="authclient.createdAt | locFullDateTime"
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
          :value="authclient.updatedAt | locFullDateTime"
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
          :value="authclient.deletedAt | locFullDateTime"
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

      <template
        v-if="canDelete"
      >
        <confirmation-toggle
          v-if="isDeleted"
          :disabled="processing"
          @confirmed="$emit('undelete', authclient.authClientID)"
        >
          {{ $t('undelete') }}
        </confirmation-toggle>
        <confirmation-toggle
          v-else
          :disabled="processing"
          @confirmed="$emit('delete', authclient.authClientID)"
        >
          {{ $t('delete') }}
        </confirmation-toggle>
      </template>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CRolePicker from 'corteza-webapp-admin/src/components/CRolePicker'
import CSelectUser from 'corteza-webapp-admin/src/components/Authclient/CSelectUser'
import copy from 'copy-to-clipboard'
import axios from 'axios'

export default {
  name: 'CAuthclientEditorInfo',

  i18nOptions: {
    namespaces: 'system.authclients',
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
    CRolePicker,
    CSelectUser,
  },

  props: {
    resource: {
      type: Object,
      required: true,
    },

    canDelete: {
      type: Boolean,
      default: () => false,
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

      authclient: undefined,

      secret: '',

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

      curlVisible: false,
      curlURL: '',
      tokenRequest: {
        token: '',
        error: '',
      },
    }
  },

  computed: {
    isDeleted () {
      return this.authclient.deletedAt
    },

    isValid () {
      return !!this.authclient.handle
    },

    secretVisible () {
      return this.secret.length > 0
    },
  },

  beforeMount () {
    // setup all object props we need (reactivity)
    // when we migrat it to corteza-js using a proper Class
    // this can remove it
    this.authclient = {
      trusted: false,
      handle: '',
      meta: {
        name: '',
        description: '',
      },

      security: {
        permittedRoles: [],
        forbiddenRoles: [],
        forcedRoles: [],
      },

      redirectURI: '',
      grant: '',

      // make sure all references are destroyed
      ...JSON.parse(JSON.stringify(this.resource)),

    }

    if (this.authclient.validFrom) {
      // @todo do we need this or can we connect date/time picker directly (or via computed prop) to auth-client prop?
      this.validFrom.date = new Date(this.authclient.validFrom).toISOString()
      this.validFrom.time = new Date(this.authclient.validFrom).toTimeString().split(' ')[0]
    }

    if (this.authclient.expiresAt) {
      // @todo do we need this or can we connect date/time picker directly (or via computed prop) to auth-client prop?
      this.expiresAt.date = new Date(this.authclient.expiresAt).toISOString()
      this.expiresAt.time = new Date(this.authclient.expiresAt).toTimeString().split(' ')[0]
    }

    this.permittedRoles = this.transformRoles(this.authclient.security.permittedRoles)
    this.forbiddenRoles = this.transformRoles(this.authclient.security.forbiddenRoles)
    this.forcedRoles = this.transformRoles(this.authclient.security.forcedRoles)
  },

  watch: {
    'redirectURI': {
      handler (redirectURI) {
        this.authclient.redirectURI = redirectURI.filter(ru => ru).join(' ')
      },
    },
  },

  methods: {
    onUpdateUser (user) {
      this.authclient.security.impersonateUser = (user || {}).userID
    },

    getAccessTokenAPI () {
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      params.append('scope', 'profile api')
      axios.post(
        this.curlURL,
        params,
        { auth: { username: this.authclient.authClientID, password: this.secret } }
      ).then(response => {
        this.tokenRequest.token = (response.data || {}).access_token
      }).catch(error => {
        this.tokenRequest.error = error
      })
    },

    copyToClipboard (name) {
      if (name === 'cUrl') {
        copy(this.$refs.cUrl.innerHTML)
      } else {
        copy(this.tokenRequest.token)
      }
    },

    toggleCurlSnippet () {
      if (!this.curlVisible) {
        this.fetchSecret()
        this.curlURL = this.$auth.cortezaAuthURL + '/oauth2/token'
      }
      this.curlVisible = !this.curlVisible
    },

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

    fetchSecret () {
      if (!this.secret) {
        this.$SystemAPI.authClientExposeSecret(({ clientID: this.authclient.authClientID }))
          .then(secret => {
            this.secret = secret
          })
      }
    },

    regenerateSecret () {
      this.$SystemAPI.authClientRegenerateSecret(({ clientID: this.authclient.authClientID }))
        .then(newSecret => {
          this.secret = newSecret
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
<style lang="scss">
.auth-clients{
  .fit-content{
    height:fit-content;
  }
  .overflow-wrap{
      overflow-wrap: anywhere;
  }
  .curl .form-row{
    flex-wrap: nowrap !important;
    .col{
      max-width: 84.3%;
    }
  }
}
</style>
