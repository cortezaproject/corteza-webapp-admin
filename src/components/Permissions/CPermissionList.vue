<template>
  <div>
    <b-card
      class="shadow-sm"
      body-class="py-0 px-3"
      header-bg-variant="white"
      footer-bg-variant="white"
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
          <b-col
            v-if="roles.length < 9"
            class="border-bottom border-left py-2 overflow-hidden text-nowrap"
          >
            <div
              v-b-modal.addRole
              class="text-primary text-truncate pointer"
            >
              {{ $t('rules.add') }}
              <font-awesome-icon
                :icon="['fas', 'plus']"
              />
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
              :class="{
                'not-allowed bg-light': role.roleID.includes('-'),
                'bg-warning': checkChange(role.roleID, `${resource}${operation}`)
              }"
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
            <b-col
              v-if="roles.length < 9"
              class="border-bottom border-left py-2 not-allowed bg-light"
            />
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

      <template #footer>
        <small class="float-left text-primary">
          {{ $t('rules.tip1') }}
          <br>
          {{ $t('rules.tip2') }}
        </small>
        <c-submit-button
          class="float-right"
          :processing="processing"
          :success="success"
          @submit="onSubmit"
        >
          {{ $t('rules.submit') }}
        </c-submit-button>
      </template>
    </b-card>

    <b-modal
      id="addRole"
      :title="$t('rules.addRole')"
      :ok-only="true"
      :ok-title="$t('rules.add')"
      @ok="onAddRole"
    >
      <vue-select
        key="roleID"
        v-model="newRole"
        :options="rolesExcluded"
        label="name"
        :placeholder="$t('rules.noRole')"
      />
    </b-modal>
  </div>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import { VueSelect } from 'vue-select'

export default {
  components: {
    CSubmitButton,
    VueSelect,
  },

  props: {
    roles: {
      type: Array,
      required: true,
    },

    rolesExcluded: {
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

  data () {
    return {
      newRole: null,
      permissionChanges: [],
    }
  },

  methods: {
    checkRule (roleID, permission, access) {
      return (this.rolePermissions.find(r => r.roleID === roleID) || { rules: {} }).rules[permission] === access
    },

    checkChange (roleID, permission) {
      const current = (this.rolePermissions.find(r => r.roleID === roleID) || { rules: {} }).rules[permission]
      const initial = (this.permissionChanges.find(r => r.roleID === roleID) || { rules: {} }).rules[permission]

      if (initial) {
        return current !== initial
      } else {
        return false
      }
    },

    ruleChange (event, roleID, permission) {
      let access = (this.rolePermissions.find(r => r.roleID === roleID) || { rules: {} }).rules[permission]

      // Keep track of permission changes, record initial value before it changes
      if (!(this.permissionChanges.find(r => r.roleID === roleID) || { rules: {} }).rules[permission]) {
        this.permissionChanges.push({ roleID, rules: { } })

        if (!access) {
          access = 'inherit'
        }
        this.$set(this.permissionChanges.find(r => r.roleID === roleID).rules, permission, access)
      }

      if (event.altKey) {
        if (access === 'deny') {
          access = 'inherit'
        } else {
          access = 'deny'
        }
      } else {
        if (access === 'allow') {
          access = 'inherit'
        } else {
          access = 'allow'
        }
      }

      this.$set(this.rolePermissions.find(r => r.roleID === roleID).rules, permission, access)
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

    onSubmit () {
      this.$emit('submit', this.rolePermissions)
      this.permissionChanges = []
    },

    onAddRole () {
      const { roleID } = (this.newRole || {})
      if (roleID) {
        this.$emit('add', this.newRole)
      }
      this.newRole = null
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
