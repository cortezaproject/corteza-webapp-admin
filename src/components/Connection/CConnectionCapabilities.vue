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
      @submit.prevent="$emit('submit', connection)"
    >
      <b-row
        v-for="cap in capabilityTypes"
        :key="cap"
        align-v="center"
        class="mb-3"
      >
        <b-col
          cols="auto"
        >
          <b-form-radio-group
            v-model="capabilities[cap].support"
            :options="supportOptions"
            buttons
            button-variant="outline-primary"
            size="lg"
            class="capabilities rounded"
            @change="changeSupportType(cap, $event)"
          />
        </b-col>
        <b-col
          cols="2"
        >
          <div
            class="d-flex align-items-center text-capitalize text-primary h6 mb-0 mr-5"
          >
            {{ cap.split('corteza::dal:capability:')[1] }}
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="text-dark ml-2"
            />
          </div>
        </b-col>
        <b-col>
          <b-form-checkbox
            v-model="capabilities[cap].enabled"
            :disabled="capabilities[cap].support != 'supported'"
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
        @submit="updateCapabilities"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'external',
  },

  components: {
    CSubmitButton,
  },

  props: {
    connection: {
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
      capabilities: {
        'corteza::dal:capability:create': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:update': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:delete': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:search': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:lookup': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:paging': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:stats': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:sorting': { support: 'unsupported', enabled: false },
        'corteza::dal:capability:RBAC': { support: 'unsupported', enabled: false },
      },

      supportOptions: [
        { text: 'Enforced', value: 'enforced' },
        { text: 'Supported', value: 'supported' },
        { text: 'Not supported', value: 'unsupported' },
      ],
    }
  },

  computed: {
    capabilityTypes () {
      return Object.keys(this.capabilities)
    },
  },

  watch: {
    'connection.capabilities': {
      immediate: true,
      handler (capabilities) {
        ['enforced', 'supported', 'unsupported'].forEach(support => {
          (capabilities[support] || []).forEach(c => {
            this.capabilities[c] = { support, enabled: (capabilities.enabled || []).includes(c) }
          })
        })
      },
    },
  },

  methods: {
    changeSupportType (name, supportType) {
      if (supportType === 'enforced') {
        this.capabilities[name].enabled = true
      } else if (supportType === 'unsupported') {
        this.capabilities[name].enabled = false
      }
    },

    updateCapabilities () {
      const capabilities = {
        enabled: [],
        enforced: [],
        supported: [],
        unsupported: [],
      }

      this.capabilityTypes.forEach(cap => {
        const { support, enabled } = this.capabilities[cap]
        capabilities[support].push(cap)
        if (enabled) {
          capabilities.enabled.push(cap)
        }
      })

      this.$emit('submit', { ...this.connection, capabilities })
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
