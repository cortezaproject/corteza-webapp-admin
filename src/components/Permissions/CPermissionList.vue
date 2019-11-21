<template>
  <b-card
    class="shadow-sm m-0"
    body-class="py-0 px-3"
  >
    <div
      v-if="loaded"
    >
      <b-row
        class="bg-light text-center"
      >
        <b-col
          class="border-bottom py-2"
          cols="3"
        />
        <b-col
          v-for="role in roles"
          :key="role.roleID"
          class="border-bottom border-left py-2 overflow-hidden text-nowrap"
        >
          <div
            class="text-truncate"
          >
            {{ role.name }}
          </div>
        </b-col>
        <!--
        <b-col
          class="border-bottom border-left py-2 bg-light"
        >
          Effective
        </b-col>
        -->
      </b-row>
      <div
        v-for="(operations, resource) in permissions"
        :key="resource"
      >
        <b-row
          class="bg-secondary"
        >
          <b-col
            cols="3"
            class="py-2 text-left font-weight-bold"
          >
            {{ getTranslation(resource) }}
          </b-col>
          <b-col
            v-for="role in roles"
            :key="role.roleID"
            class="py-2 not-allowed"
          />
        </b-row>
        <b-row
          v-for="operation in operations"
          :key="operation"
          class="text-center"
        >
          <b-col
            class="border-bottom text-left py-2"
            cols="3"
          >
            {{ getTranslation(resource, operation) }}
          </b-col>
          <b-col
            v-for="role in roles"
            :key="role.roleID"
            class="border-bottom border-left py-2 pointer active-cell"
            @click="ruleChange($event, role.roleID, `${resource}${operation}`)"
          >
            <font-awesome-icon
              v-if="checkRule(role.roleID, `${resource}${operation}`, 'allow')"
              :icon="['fas', 'check']"
              class="text-success"
            />
            <font-awesome-icon
              v-if="checkRule(role.roleID, `${resource}${operation}`, 'deny')"
              :icon="['fas', 'times']"
              class="text-danger"
            />
          </b-col>
          <!--
          <b-col
            class="border-bottom border-left py-2 bg-light not-allowed"
          >
            <font-awesome-icon
              v-if="effective[permission]"
              :icon="['fas', 'check']"
              class="text-success"
            />
            <font-awesome-icon
              v-else-if="effective[permission] === false"
              :icon="['fas', 'times']"
              class="text-danger"
            />
          </b-col>
          -->
        </b-row>
      </div>
    </div>

    <div
      v-else
      class="text-center m-5"
    >
      <div>
        <b-spinner
          small
          class="align-middle m-2"
        />
      </div>
      <div>{{ $t('rules.loading') }}</div>
    </div>

    <template #header>
      <span class="h3 m-0">
        {{ $t('rules.title') }}
      </span>
      <small class="float-right text-primary">
        Click on permission/role cell to allow a specific operation.
        <br>
        Use Alt-Click to set explicit deny on operation.
      </small>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        @submit="$emit('submit', rolePermissions)"
      >
        {{ $t('rules.submit') }}
      </c-submit-button>
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  components: {
    CSubmitButton,
  },

  props: {
    roles: {
      type: Array,
      required: true,
    },

    permissions: {
      type: Object,
      required: true,
    },

    rolePermissions: {
      type: Array,
      required: true,
    },

    effective: {
      type: Object,
      default: () => {},
    },

    loaded: {
      type: Boolean,
      value: false,
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

  methods: {
    checkRule (roleID, permission, access) {
      return this.rolePermissions.find(r => r.roleID === roleID).rules[permission] === access
    },

    ruleChange (event, roleID, permission) {
      let rule = this.rolePermissions.find(r => r.roleID === roleID).rules[permission]

      if (event.altKey) {
        if (rule === 'deny') {
          rule = 'inherit'
        } else {
          rule = 'deny'
        }
      } else {
        if (rule === 'allow') {
          rule = 'inherit'
        } else {
          rule = 'allow'
        }
      }

      this.$set(this.rolePermissions.find(r => r.roleID === roleID).rules, permission, rule)
    },

    getTranslation (resource, operation = '') {
      resource = resource.replace(/:/g, '.').replace(/\*/g, '').replace(/\//g, '')
      if (resource.charAt(resource.length - 1) !== '.') {
        resource = `${resource}.`
      }
      if (operation) {
        return this.$t(`rules.${resource}${operation}`)
      } else {
        return this.$t(`rules.${resource}title`)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.not-allowed {
  cursor: not-allowed;
}
.active-cell:hover {
  background-color: #F3F3F5;
}
</style>
