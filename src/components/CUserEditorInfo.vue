<template>
  <b-card
    class="shadow-sm m-2"
  >
    <template v-slot:header>
      <h5 class="m-0">
        {{ $t('user.information') }}
      </h5>
    </template>
    <b-form @submit.prevent="onUserSubmit">
      <div
        v-if="error"
        class="bg-danger alert text-white"
      >
        {{ error }}
      </div>

      <div class="user">
        <b-form-group
          :label="$t('user.email')"
          label-cols="2"
        >
          <b-form-input
            v-model="user.email"
            required
            type="email"
          />
        </b-form-group>

        <b-form-group
          :label="$t('user.fullName')"
          label-cols="2"
        >
          <b-form-input
            v-model="user.name"
            required
          />
        </b-form-group>

        <b-form-group
          :label="$t('user.handle')"
          label-cols="2"
        >
          <b-form-input v-model="user.handle" />
        </b-form-group>

        <b-form-group
          v-if="false"
          :label="$t('user.kind')"
          horizontal
        >
          <b-form-text>{{ user.kind }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID"
          label-cols="2"
        />

        <b-form-group
          v-if="userID && user.updatedAt"
          :label="$t('general.label.lastUpdate')"
          label-cols="2"
        >
          <b-form-text>{{ user.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID"
          :label="$t('general.label.created')"
          label-cols="2"
        >
          <b-form-text>{{ user.createdAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID && user.suspendedAt"
          :label="$t('user.suspendedAt')"
          label-cols="2"
        >
          <b-form-text>{{ user.suspendedAt }}</b-form-text>
        </b-form-group>
      </div>
      <div class="footer">
        <confirmation-toggle
          v-if="userID"
          :disabled="processing"
          @confirmed="onDelete"
        >
          {{ $t('user.delete') }}
        </confirmation-toggle>
        <confirmation-toggle
          v-if="userID"
          :disabled="processing"
          cta-class="secondary"
          @confirmed="onStatusChange"
        >
          {{ statusButtonTitle }}
        </confirmation-toggle>
        <b-button
          :disabled="processing"
          type="submit"
          variant="primary"
          class="ml-3"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'CUserEditorInfo',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>
