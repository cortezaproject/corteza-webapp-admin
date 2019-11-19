<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      @submit.prevent="$emit('submit', email)"
    >
      <b-form-group
        :label="$t('header')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-textarea
            v-model="email['general.mail.header.en']"
            class="overflow-auto"
            max-rows="20"
          />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('footer')"
        label-cols="2"
        class="mb-0"
      >
        <b-input-group>
          <b-form-textarea
            v-model="email['general.mail.footer.en']"
            class="overflow-auto"
            max-rows="20"
          />
        </b-input-group>
      </b-form-group>
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
        @submit="$emit('submit', email)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CSystemEditorEmail',

  i18nOptions: {
    namespaces: [ 'system.settings' ],
    keyPrefix: 'editor.email',
  },

  components: {
    CSubmitButton,
  },

  props: {
    email: {
      type: Object,
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
  },
}
</script>
