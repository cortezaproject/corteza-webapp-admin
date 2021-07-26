<template>
  <div>
    <h3 class="mb-2">
      {{ title }}{{ value.handle ? `: ${value.handle}` : '' }}
    </h3>

    <b-form-group label-cols="2">
      <b-form-checkbox
        v-model="value.enabled"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('providerEnabled') }}
      </b-form-checkbox>
    </b-form-group>

    <b-form-group
      :label="$t('handle')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input
          v-model.trim="value.handle"
          :formatter="alphanum"
          :disabled="!fresh"
        />
      </b-input-group>
    </b-form-group>

    <b-form-group
      :label="$t('issuer')"
      label-cols="2"
    >
      <b-input-group>
        <b-form-input
          v-model.trim="value.issuer"
          :placeholder="$t('issuerPlaceholder')"
        />
      </b-input-group>
      <b-form-text
        v-html="$t('issuerHint')"
      />
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
  </div>
</template>
<script>

export default {
  name: 'OIDCExternalAuthProvider',

  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fresh () {
      return this.value.hasOwnProperty('fresh') && this.value.fresh
    },
  },

  methods: {
    alphanum (v) {
      return v.replace(/[^a-zA-Z0-9\-_]+/, '')
    },
  },
}
</script>
<style scoped lang="scss">
</style>
