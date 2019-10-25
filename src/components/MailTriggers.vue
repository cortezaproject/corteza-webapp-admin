<template>
  <b-container class="pl-0 pr-0">
    <b-card
      v-for="(trigger, t) in value"
      :key="t"
      no-body
      class="mb-4"
    >
      <mail-trigger-condition v-model="trigger.condition" />
      <b-card-footer>
        <b-container>
          <b-row>
            <b-col
              cols="6"
              class="pl-0"
            >
              <b-input-group>
                <b-checkbox v-model="trigger.enabled">
                  {{ $t('enable') }}
                </b-checkbox>
              </b-input-group>
            </b-col>
            <b-col
              cols="6"
              class="text-right pr-0"
            >
              <confirmation-toggle @confirmed="onDelete(t)">
                {{ $t('deleteTrigger') }}
              </confirmation-toggle>
            </b-col>
          </b-row>
        </b-container>
      </b-card-footer>
    </b-card>
    <b-container>
      <b-row>
        <b-col
          offset="6"
          cols="6"
          class="text-right pr-2"
        >
          <b-button
            variant="link"
            @click="addOnReceiveTrigger"
          >
            {{ $t('addTrigger') }}
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import automationTriggersEditor from 'corteza-webapp-common/src/mixins/automationTriggersEditor'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import MailTriggerCondition from 'corteza-webapp-admin/src/components/MailTriggerCondition'

export default {
  components: {
    ConfirmationToggle,
    MailTriggerCondition,
  },

  mixins: [
    automationTriggersEditor,
  ],

  i18nOptions: {
    keyPrefix: 'automation.edit.mailAutomationTriggers',
  },

  props: {
    value: {
      type: Array,
      required: true,
      default () { return [] },
    },
  },

  data () {
    return {
      resource: 'system:mail',

      // all events we support
      events: ['onReceive'],

      // Module filtering
      filter: '',
    }
  },

  computed: {},

  created () {
    if (this.value.length === 0) {
      this.addOnReceiveTrigger()
    }
  },

  methods: {
    addOnReceiveTrigger () {
      let trigger = {
        enabled: true,
        resource: 'system:mail',
        event: 'onReceive',
        condition: '',
      }

      this.value.push(trigger)
    },

    onDelete (t) {
      let tt = [...this.value]
      tt.splice(t, 1)
      this.$emit('input', tt)
    },
  },
}
</script>
