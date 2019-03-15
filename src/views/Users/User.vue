<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'users' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('user.information') }}
      </h2>
    </div>
    <div class="user">
      <b-form-group :label="$t('user.email')" horizontal>
        <b-form-input v-model="user.email" required type="email" />
      </b-form-group>

      <b-form-group :label="$t('user.fullName')" horizontal>
        <b-form-input v-model="user.name" required />
      </b-form-group>

      <b-form-group :label="$t('user.handle')" horizontal>
        <b-form-input v-model="user.handle" />
      </b-form-group>

      <b-form-group :label="$t('user.kind')" horizontal v-if="false">
        <b-form-text>{{ user.kind }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('general.label.lastUpdate')" horizontal>
        <b-form-text>{{ user.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('general.label.created')" horizontal>
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
      this.$system.userRead({ userID: this.userID }).then(user => {
        this.user = user
        this.processing = false
      })
    },

    onDelete () {
      this.$system.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
    },

    onSubmit () {
      this.processing = true

      const payload = { ...this.user }

      if (this.userID) {
        this.$system.userUpdate(payload).then(this.handler)
      } else {
        this.$system.userCreate(payload)
          .then(this.handler)
          .then(({ userID }) => {
            this.$router.push({ name: 'users.user', params: { userID } })
          })
      }
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
