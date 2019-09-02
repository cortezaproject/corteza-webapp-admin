<template>
  <b-card-body>
    <b-input-group v-for="(m, i) in headers" :key="i">
      <b-select plain
                v-model="m.name"
                :options="mailHeaderName"></b-select>
      <b-select plain
                v-model="m.op"
                :options="mailHeaderOperator"></b-select>
      <b-input v-model="m.match"
               v-if="m.op!='user'"
               :placeholder="$t('matcher.match')"></b-input>
      <b-button :disabled="headers.length < 2"
                variant="danger"
                @click="onDeleteHeaderMatcher(i)">-</b-button>
    </b-input-group>
    <b-container>
      <b-row>
        <b-col cols="6"
               class="pl-0">
          <b-checkbox v-model="matchAll"
                      :disabled="headers.length < 2">{{ $t('matchAll') }}</b-checkbox>
        </b-col>
        <b-col cols="6" class="text-right pr-0">
          <b-button variant="link"
                    class="m-0 p-0"
                    @click="onAddHeaderMatcher">{{ $t('addMatcher') }}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-card-body>
</template>
<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  components: {
    ConfirmationToggle,
  },

  i18nOptions: {
    keyPrefix: 'automation.edit.mailAutomationTriggers',
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      headers: [],
      matchAll: false,

      mailHeaderName: {
        null: 'Mail header field',
        subject: 'Subject',
        to: 'To',
        from: 'From',
        cc: 'CC',
        bcc: 'BCC',
        replyTo: 'Reply To',
      },

      mailHeaderOperator: {
        null: 'Operator',
        'prefix-ci': 'Match prefix',
        'suffix-ci': 'Match suffix',
        'equal-ci': 'Match full',
        'regex': 'Regex',
        'user': 'Existing user',
      },
    }
  },

  watch: {
    headers: {
      deep: true,
      handler () { this.emitChange() },
    },

    matchAll: {
      deep: true,
      handler () { this.emitChange() },
    },

    value: {
      immediate: true,
      handler () {
        if (this.value) {
          let { headers = [], matchAll = false } = JSON.parse(this.value)
          this.headers = headers
          this.matchAll = matchAll
        }
      },
    },
  },

  created () {
    if (this.headers.length === 0) {
      this.addHeaderMatcher()
    }
  },

  methods: {
    onAddHeaderMatcher () {
      this.addHeaderMatcher()
    },

    onDeleteHeaderMatcher (i) {
      this.headers.splice(i, 1)
      if (this.headers.length < 2) {
        this.matchAll = false
      }
    },

    addHeaderMatcher () {
      this.headers.push({
        name: '',
        op: '',
        match: '',
      })
    },

    emitChange () {
      this.$emit('input', JSON.stringify({
        headers: this.headers,
        matchAll: this.matchAll,
      }))
    },
  },
}
</script>
