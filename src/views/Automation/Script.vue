<template>
  <div
    v-if="script"
    class="mt-3 mb-4"
  >
    <b-form
      class="pb-5"
      @submit.prevent="handleSave"
    >
      <b-row>
        <b-col
          md="12"
          class="mb-1"
        >
          <div :title="$t('automation.edit.title')">
            <!-- <export :list="[script]" type="script" class="float-right" slot="header"/> -->

            <b-tabs v-model="activeTab">
              <b-tab :title="$t('automation.edit.settingsTabLabel')">
                <b-form class="m-3">
                  <b-form-group
                    :label="$t('automation.edit.nameLabel')"
                    horizontal
                  >
                    <b-form-input
                      v-model="script.name"
                      :placeholder="$t('automation.edit.namePlaceholder')"
                      require
                    />
                  </b-form-group>
                  <b-form-group horizontal>
                    <b-form-checkbox
                      v-model="script.enabled"
                      checked
                    >
                      {{ $t('automation.edit.enabledLabel') }}
                      <b-form-text>{{ $t('automation.edit.enabledHelp') }}</b-form-text>
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="script.critical"
                      checked
                      @change="onCriticalChange"
                    >
                      {{ $t('automation.edit.criticalLabel') }}
                      <b-form-text>{{ $t('automation.edit.criticalHelp') }}</b-form-text>
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="script.async"
                      :disabled="script.critical"
                    >
                      {{ $t('automation.edit.asyncLabel') }}
                      <b-form-text>{{ $t('automation.edit.asyncHelp') }}</b-form-text>
                    </b-form-checkbox>
                  </b-form-group>

                  <b-form-group
                    :label="$t('automation.edit.timeoutLabel')"
                    horizontal
                  >
                    <b-input-group>
                      <b-form-input
                        v-model="script.timeout"
                        :placeholder="$t('automation.edit.timeoutPlaceholder')"
                        type="number"
                        number
                        min="0"
                        max="60000"
                        trim
                      />
                      <b-input-group-append><b-input-group-text>ms</b-input-group-text></b-input-group-append>
                    </b-input-group>
                    <b-form-text>{{ $t('automation.edit.timeoutHelp') }}</b-form-text>
                  </b-form-group>

                  <b-form-group
                    v-if="canModifySecurty"
                    :label="$t('automation.edit.securityLabel')"
                    horizontal
                  >
                    <vue-select
                      :key="script.runAs"
                      v-model="script.runAs"
                      :options="users"
                      :reduce="u => u.userID"
                      :disabled="script.runInUA"
                      :placeholder="$t('automation.edit.userPickerPlaceholder')"
                      label="email"
                      @search="onUserSearch"
                    />
                    <b-form-text>{{ $t('automation.edit.runAsHelp') }}</b-form-text>
                    <b-button @click="preloadRunner($auth.user.userID)">
                      {{ $t('automation.edit.runAsCurrentUser', { user: $auth.user.name || $auth.user.email }) }}
                    </b-button>
                  </b-form-group>
                </b-form>
              </b-tab>
              <b-tab :title="$t('automation.edit.codeTabLabel')">
                <ace-editor
                  :value="script.source"
                  :font-size="14"
                  :show-print-margin="false"
                  :show-gutter="true"
                  :highlight-active-line="true"
                  :enable-basic-autocompletion="true"
                  :min-lines="10"
                  :max-lines="30"
                  :editor-props="{$blockScrolling: true}"
                  :on-change="onSourceEditorChange"
                  :on-before-load="onBeforeSourceEditorLoad"
                  :on-load="onSourceEditorLoad"
                  width="100%"
                  mode="javascript"
                  theme="monokai"
                  name="scriptSource"
                />

                <b-container v-if="false">
                  <b-row class="mt-3">
                    <b-col cols="6">
                      {{ $t('automation.testing.parametersHeadline') }}
                    </b-col>
                    <b-col cols="6">
                      {{ $t('automation.testing.resultsHeadline') }}
                    </b-col>
                  </b-row>
                  <b-row class="mt-1">
                    <b-col cols="6" />
                    <b-col cols="6">
                      <b-button-group>
                        <b-button
                          type="button"
                          @click="onClickRunTestInCorredor"
                        >
                          {{ $t('automation.testing.testInCorredor') }}
                        </b-button>
                      </b-button-group>
                    </b-col>
                  </b-row>
                  <b-row class="mt-1">
                    <b-col cols="6">
                      <div v-if="testPayloadErr">
                        <b-button
                          variant="link"
                          class="float-right"
                          @click="testPayloadErr=null"
                        >
                          Clear error
                        </b-button>
                        <pre class="text-danger">{{ testPayloadErr }}</pre>
                      </div>
                      <ace-editor
                        v-else
                        :value="testPayload"
                        :font-size="14"
                        :show-print-margin="false"
                        :show-gutter="true"
                        :highlight-active-line="true"
                        :enable-basic-autocompletion="true"
                        :min-lines="20"
                        :max-lines="20"
                        :on-change="onTestRecordEditorChange"
                        width="100%"
                        mode="json"
                        theme="monokai"
                        name="testPayload"
                      />
                    </b-col>
                    <b-col cols="6">
                      <div v-if="testResponseErr">
                        <pre class="text-danger">{{ testResponseErr }}</pre>
                      </div>
                      <ace-editor
                        v-else
                        :value="testResponse"
                        :font-size="14"
                        :show-print-margin="false"
                        :show-gutter="true"
                        :highlight-active-line="false"
                        :enable-basic-autocompletion="false"
                        :min-lines="20"
                        :max-lines="20"
                        :read-only="true"
                        width="100%"
                        mode="json"
                        theme="monokai"
                        name="testResponse"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6" />
                    <b-col cols="6">
                      <div><i18next path="automation.testing.warning" /></div>
                    </b-col>
                  </b-row>
                </b-container>
              </b-tab>
              <b-tab
                v-if="false"
                :title="$t('automation.edit.scheduledTriggers.tabLabel')"
              >
                @todo intervals & deferred
              </b-tab>
              <b-tab :title="$t('automation.edit.mailAutomationTriggers.tabLabel')">
                <mail-triggers
                  v-model="triggers"
                  class="mt-3"
                />
              </b-tab>
            </b-tabs>
          </div>
        </b-col>
      </b-row>
      <div class="footer">
        <confirmation-toggle @confirmed="onDelete">
          {{ $t('automation.edit.delete') }}
        </confirmation-toggle>
        <b-button
          :disabled="processing"
          type="submit"
          variant="primary"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
import _ from 'lodash'
import { VueSelect } from 'vue-select'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import AutomationScript from 'corteza-webapp-common/src/lib/types/shared/automation-script'
import AutomationTrigger from 'corteza-webapp-common/src/lib/types/shared/automation-trigger'
import MailTriggers from 'corteza-webapp-admin/src/components/MailTriggers'
import { Ace as AceEditor } from 'vue2-brace-editor'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/theme/monokai'

export default {
  components: {
    ConfirmationToggle,
    MailTriggers,
    AceEditor,
    VueSelect,
  },

  props: {
    scriptID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      processing: false,
      activeTab: 0,

      editor: null,
      script: new AutomationScript(),
      triggers: [],

      users: [],

      // testModuleID: null,
      // testPayloadID: null,
      // testPayload: `{"record":{}}`,
      // testResponse: '',
      // testPayloadErr: null,
      // testResponseErr: null,
    }
  },

  computed: {
    canModifySecurty () {
      return (this.script.scriptID && this.script.canGrant)
    },
  },

  created () {
    if (this.scriptID) {
      this.findScriptByID({ scriptID: this.scriptID }).then((s) => {
        this.script = s
        this.preloadRunner(s.runAs)
        return this.loadTriggers()
      }).then(() => {
        // ...
      }).catch(err => {
        console.error(err)
      })
    }
  },

  methods: {
    async findScriptByID ({ scriptID }) {
      return this.$SystemAPI
        .automationScriptRead({ scriptID })
        .then(s => new AutomationScript(s))
    },

    async saveScript (script) {
      if (script.scriptID) {
        return this.$SystemAPI
          .automationScriptUpdate(script)
          .then(s => new AutomationScript(s))
      } else {
        return this.$SystemAPI
          .automationScriptCreate(script)
          .then(s => new AutomationScript(s))
      }
    },

    async loadTriggers () {
      const p = {
        scriptID: this.scriptID,
        incDeleted: true,
        perPage: 0,
      }

      return this.$SystemAPI.automationTriggerList(p).then(({ set, filter }) => {
        this.triggers = set.map(t => new AutomationTrigger(t))
      })
    },

    handleSave () {
      if (!this.script.runAs) {
        this.script.runAs = '0'
      }

      const triggers = this.triggers.map(t => {
        // Stringify condition if neeeded
        return new AutomationTrigger({
          ...t,
          condition: typeof t.condition !== 'string' ? JSON.stringify(t.condition) : t.condition,
        })
      })

      this.saveScript({ ...this.script, triggers }).then((script) => {
        this.$emit('update')
        this.script = script
        if (!this.script.updatedAt) {
          this.$router.push({ name: 'automation.script', params: this.script })
        }
      }).catch(err => {
        console.error(err)
        this.error = err.message
      }).finally(() => {
        this.processing = false
      })
    },

    onDelete () {
      this.$SystemAPI.automationScriptDelete({ ...this.script }).then(() => {
        this.$emit('update')
        this.$router.push({ name: 'automation' })
      }).catch(err => {
        console.error(err)
      })
    },

    /**
     *
     * @param {string} query
     * @param {function} loading
     */
    onUserSearch (query, loading) {
      if (query.length > 2) {
        loading(true)
        this.userSearch(this, query, loading)
      }
    },

    userSearch: _.debounce((vm, query, loading) => {
      vm.$SystemAPI.userList({ query }).then(({ set }) => {
        vm.users = set
        loading(false)
      })
    }),

    preloadRunner (userID) {
      if (!!userID && userID !== '0') {
        // We need to trick <v-select> component into re-rendering when
        // we find the selected runner/user
        this.script.runAs = ''

        this.$SystemAPI.userRead({ userID }).then((u) => {
          this.users.push(u)

          // Set the value back and force <v-select> to re-render
          this.script.runAs = userID
        })
      }
    },

    triggerComponent (t) {
      switch (t.event) {
        case 'manual':
        case 'deferred':
        case 'interval':
          return `trigger-${t.event}`
        default:
          return `trigger-event`
      }
    },

    // Brace editor does not support v-model
    onSourceEditorChange (source) {
      this.script.source = source
    },

    // Brace editor does not support v-model
    onTestRecordEditorChange (testPayloadPayload) {
      this.testPayload = testPayloadPayload
    },

    onBeforeSourceEditorLoad (brace) {
      // const langTools = brace.acequire('ace/ext/language_tools')
      //
      // langTools.addCompleter({
      //   getCompletions: (editor, session, pos, prefix, callback) => {
      //     console.log(editor, session, pos, prefix, callback)
      //   },
      // })
    },

    onSourceEditorLoad (brace) {
      // Disable linting, we do not care about missing end semicolon warnings
      brace.session.$worker.send('changeOptions', [{ asi: true }])

      // Link brace to component's data so we have access to it later
      this.editor = brace
    },

    onCriticalChange () {
      if (this.script.critical) {
        this.script.async = false
      }
    },

    onClickRunTestInCorredor () {
      const payload = {
        source: this.script.source,
        ...this.parseTestPayload(),
      }

      this.$SystemAPI.automationScriptTest(payload).then(rval => {
        this.testResponseErr = null

        this.testResponse = JSON.stringify(rval, null, '  ')
      }).catch(err => {
        if (err.message) {
          err = err.message
        }

        this.testResponseErr = err
        this.testResponse = null
      })
    },

    parseTestPayload () {
      if (this.testPayload) {
        try {
          return JSON.parse(this.testPayload)
        } catch ({ message }) {
          console.error(`Could not parse payload JSON: ${message}.`)
          return false
        }
      }

      return {}
    },

    redirect () {
      this.$router.push({ name: 'admin.automation' })
    },
  },
}
</script>
