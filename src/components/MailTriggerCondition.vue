<template>
  <b-card-body>
    <b-input-group
      v-for="(m, i) in headers"
      :key="i"
    >
      <b-select
        v-model="m.name"
        :options="mailHeaderName"
        plain
      />
      <b-select
        v-model="m.op"
        :options="mailHeaderOperator"
        plain
      />
      <b-input
        v-if="m.op!='user'"
        v-model="m.match"
        :placeholder="$t('matcher.match')"
      />
      <b-button
        :disabled="headers.length < 2"
        variant="danger"
        @click="onDeleteHeaderMatcher(i)"
      >
        -
      </b-button>
    </b-input-group>
    <b-container>
      <b-row>
        <b-col
          cols="6"
          class="pl-0"
        >
          <b-checkbox
            v-model="matchAll"
            :disabled="headers.length < 2"
          >
            {{ $t('matchAll') }}
          </b-checkbox>
        </b-col>
        <b-col
          cols="6"
          class="text-right pr-0"
        >
          <b-button
            variant="link"
            class="m-0 p-0"
            @click="onAddHeaderMatcher"
          >
            {{ $t('addMatcher') }}
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-card-body>
</template>
<script>

export default {
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
    const f = (k) => this.$t('matcher.fields.' + k)
    const o = (k) => this.$t('matcher.operators.' + k)

    return {
      headers: [],
      matchAll: false,

      mailHeaderName: {
        null: f('placeholder'), // 'Mail header field',
        subject: f('subject'), // 'Subject',
        to: f('to'), // 'To',
        from: f('from'), // 'From',
        cc: f('cc'), // 'CC',
        bcc: f('bcc'), // 'BCC',
        replyTo: f('replyTo'), // 'Reply To',
      },

      mailHeaderOperator: {
        null: o('placeholder'), // 'Operator',
        'prefix-ci': o('prefix-ci'), // 'Match prefix',
        'suffix-ci': o('suffix-ci'), // 'Match suffix',
        'equal-ci': o('equal-ci'),
        'regex': o('regex'), // 'Regex',
        'user': o('user'), // 'Existing user',
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
