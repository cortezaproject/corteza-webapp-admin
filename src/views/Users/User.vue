<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'users' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('user.information') }}
      </h2>
    </div>
    <div class="user">
      <b-form-group :label="$t('user.email')" label-cols="3">
        <b-form-input v-model="user.email" required type="email" />
      </b-form-group>

      <b-form-group :label="$t('user.fullName')" label-cols="3">
        <b-form-input v-model="user.name" required />
      </b-form-group>

      <b-form-group :label="$t('user.handle')" label-cols="3">
        <b-form-input v-model="user.handle" />
      </b-form-group>

      <b-form-group :label="$t('user.kind')" horizontal v-if="false">
        <b-form-text>{{ user.kind }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('general.label.lastUpdate')" label-cols="3">
        <b-form-text>{{ user.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('general.label.created')" label-cols="3">
        <b-form-text>{{ user.createdAt }}</b-form-text>
      </b-form-group>
    </div>
    <div class="footer">
      <confirmation-toggle @confirmed="onDelete">{{ $t('user.delete') }}</confirmation-toggle>
      <b-button type="submit" variant="primary" :disabled="processing">{{ $t('user.submit') }}</b-button>
    </div>
  </b-form>
</template>

<script>
import ConfirmationToggle from '@/components/ConfirmationToggle'
export default {
  components: {
    ConfirmationToggle,
  },

  props: {
    userID: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      processing: false,
      user: {},
      error: null,
    }
  },

  watch: {
    userID: {
      immediate: true,
      handler () {
        if (this.userID) {
          this.fetchUsers()
        }
      },
    },
  },

  methods: {
    fetchUsers () {
      this.processing = true
      this.$SystemAPI.userRead({ userID: this.userID }).then(user => {
        this.user = user
      }).catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    onDelete () {
      this.processing = true
      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    onSubmit () {
      this.processing = true

      const payload = { ...this.user }

      if (this.userID) {
        this.$SystemAPI.userUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
          .finally(() => {
            this.processing = false
          })
      } else {
        this.$SystemAPI.userCreate(payload)
          .then(this.handler)
          .then(({ userID }) => {
            this.$router.push({ name: 'users.user', params: { userID } })
          }).catch(this.stdReject)
          .finally(() => {
            this.processing = false
          })
      }
    },

    stdReject ({ message = null } = {}) {
      this.error = message
    },

    handler (user) {
      this.processing = false

      // Inform parent component about user changes
      // @todo solve this with vuex
      this.$emit('update')
      this.user = user

      return Promise.resolve(user)
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';

form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    height: 150px;
  }

  .footer {
    flex: 1;
    text-align: right;
    height: 150px;
  }

  .user {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;
  }
}

</style>
