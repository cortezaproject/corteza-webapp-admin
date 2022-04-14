<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template #header>
      <h3>Capabilities and Attributes</h3>
    </template>

    <b-form
      @submit.prevent="$emit('submit', datasource)"
    >
      <b-row
        v-for="cap in capabilities"
        :key="cap.name"
        align-v="center"
        class="mb-3"
      >
        <b-col
          cols="auto"
        >
          <b-form-radio-group
            v-model="cap.supportType"
            :options="supportOptions"
            buttons
            button-variant="outline-primary"
            size="lg"
            class="capabilities rounded"
            @change="changeSupportType(cap.name, $event)"
          />
        </b-col>
        <b-col
          cols="2"
        >
          <div
            class="d-flex align-items-center text-capitalize text-primary h6 mb-0 mr-5"
          >
            {{ cap.name }}
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="text-dark ml-2"
            />
          </div>
        </b-col>
        <b-col>
          <b-form-checkbox
            v-model="cap.enabled"
            :disabled="cap.supportType != 'supported'"
          >
            Enabled
          </b-form-checkbox>
        </b-col>
      </b-row>

      <!--
        include hidden input to enable
        trigger submit event w/ ENTER
      -->
      <input
        type="submit"
        class="d-none"
      >
    </b-form>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        @submit="$emit('submit', datasource)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CDatasourceEditorCapabilities',

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'external',
  },

  components: {
    CSubmitButton,
  },

  props: {
    datasource: {
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

  data () {
    return {
      capabilities: [
        { name: 'immutable', supportType: 'supported', enabled: false },
        { name: 'encrypted', supportType: 'supported', enabled: false },
        { name: 'accessControl', supportType: 'supported', enabled: false },
        { name: 'softDelete', supportType: 'supported', enabled: false },
        { name: 'revisioned', supportType: 'supported', enabled: false },
        { name: 'automation', supportType: 'supported', enabled: false },
        { name: 'pagination', supportType: 'supported', enabled: false },
        { name: 'filtering', supportType: 'supported', enabled: false },
        { name: 'search', supportType: 'supported', enabled: false },
        { name: 'ownership', supportType: 'supported', enabled: false },
        { name: 'timestamps', supportType: 'supported', enabled: false },
        { name: 'auditLog', supportType: 'supported', enabled: false },
      ],

      supportOptions: [
        { text: 'Enforced', value: 'enforced' },
        { text: 'Supported', value: 'supported' },
        { text: 'Not supported', value: 'unsupported' },
      ],
    }
  },

  methods: {
    changeSupportType (name, supportType) {
      const cap = this.capabilities.find(cap => cap.name === name) || {}

      if (supportType === 'enforced') {
        cap.enabled = true
      } else if (supportType === 'unsupported') {
        cap.enabled = false
      }
    },
  },
}
</script>

<style lang="scss">
.capabilities {
  .btn {
    background-color: $light;
    border: none;
  }

  .btn:nth-child(2), .btn:nth-child(3) {
    margin-left: 0.2rem;
  }
}
</style>
