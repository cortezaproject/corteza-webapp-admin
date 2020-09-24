<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group>
        <b-button
          variant="link"
          @click="generate.modal = true"
        >
          {{ $t('new') }}
        </b-button>
      </b-button-group>
      <b-button-group>
        <b-button
          variant="link"
          @click="openPairModal()"
        >
          {{ $t('pair.label') }}
        </b-button>
      </b-button-group>
    </c-content-header>

    <c-resource-list
      primary-key="federationID"
      edit-route="system.federation.edit"
      :loading-text="$t('loading')"
      :total-text="$t('numFound', { count: totalItems })"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
      :total-items="totalItems"
      @confirm-pending="openConfirmPending($event)"
    >
      <template #filter>
        <b-form-group
          class="p-0 m-0"
        >
          <b-input-group>
            <b-form-input
              v-model.trim="filter.query"
              :placeholder="$t('filterForm.query.placeholder')"
              @keyup="filterList"
            />
          </b-input-group>
        </b-form-group>
      </template>
    </c-resource-list>

    <b-modal
      v-model="generate.modal"
      hide-header
      hide-footer
      centered
      size="lg"
      body-class="px-5"
    >
      <div
        class="text-center px-5"
      >
        <font-awesome-icon
          size="7x"
          :icon="['fas', 'share-alt']"
          class="text-light mb-2"
        />
        <h2>
          {{ $t('generate.description') }}
        </h2>
      </div>

      <b-input-group
        size="xl"
        class="mt-5"
      >
        <b-form-input
          v-model="generate.email"
          type="email"
          placeholder="email@example.com"
        />
        <b-input-group-append>
          <b-button
            variant="outline-primary"
            class="px-4"
          >
            {{ $t('generate.sendEmail') }}
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <div
        class="mt-3"
      >
        <p>
          {{ $t('generate.subject') }} <strong>{{ $t('generate.invitation') }}</strong>
        </p>

        <p
          class="mt-4"
        >
          {{ $t('generate.hello') }}
        </p>

        <p>
          {{ $t('generate.body', { userLabel }) }}
        </p>

        <p
          class="text-center"
        >
          <i>
            {{ generatedUrl }}
          </i>
        </p>

        <p>
          {{ $t('generate.kindRegards') }}
        </p>
      </div>

      <hr
        class="my-3"
      >

      <b-button
        variant="link"
        size="sm"
        :to="{}"
        class="p-1"
        @click="copyUrl()"
      >
        <font-awesome-icon
          :icon="['far', 'copy']"
          class="text-secondary pointer"
        />
      </b-button>
      {{ generatedUrl }}
    </b-modal>

    <b-modal
      v-model="pair.modal"
      hide-header
      hide-footer
      centered
      size="lg"
      body-class="px-5"
    >
      <div
        v-if="!pair.status"
      >
        <div
          class="text-center px-5"
        >
          <font-awesome-icon
            size="7x"
            :icon="['fas', 'share-alt']"
            class="text-light mb-2"
          />
          <h2>
            {{ $t('pair.undefined.description') }}
          </h2>
        </div>

        <b-input-group
          size="xl"
          class="mt-5"
        >
          <b-form-input
            v-model="pair.url"
            type="url"
            placeholder="corteza://federation:12345678@corteza.com"
          />
          <b-input-group-append>
            <b-button
              variant="outline-primary"
              class="px-4"
              @click="pairNode()"
            >
              Confirm
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <p
          class="mt-4"
        >
          <strong>{{ $t('pair.note') }}</strong> {{ $t('pair.networkEstablished') }}
        </p>
      </div>

      <div
        v-else-if="pair.status === 'pending'"
      >
        <div
          class="text-center px-5"
        >
          <font-awesome-icon
            size="7x"
            :icon="['far', 'check-circle']"
            class="text-light mb-4"
          />
          <h2>
            {{ $t('pair.pending.description') }}
          </h2>
        </div>
      </div>

      <div
        v-else-if="pair.status === 'confirm-pending'"
        class="text-center"
      >
        <div
          class="px-5"
        >
          <font-awesome-icon
            size="7x"
            :icon="['fas', 'share-alt']"
            class="text-light mb-4"
          />
          <h2>
            {{ $t('pair.confirmPending.description', { email: 'james.doe@crust.tech', name: 'Community Server' }) }}
          </h2>
        </div>
        <b-button
          variant="outline-primary"
          class="px-5 mt-4"
          @click="confirmPending()"
        >
          Confirm
        </b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import moment from 'moment'
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  name: 'FederationList',
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.federation' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'federation',

      generate: {
        modal: false,
        email: '',
      },

      pair: {
        modal: false,
        url: '',
        status: undefined,
        confirmID: '',
      },

      filter: {
        query: '',
        suspended: 0,
        deleted: 0,
      },

      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'enabled',
          sortable: true,
        },
        {
          key: 'createdAt',
          label: 'Created',
          sortable: true,
          formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'enabled',
          sortable: true,
        },
        {
          key: 'status',
          sortable: true,
        },
        {
          key: 'tags',
          label: '',
          sortable: false,
          tdClass: 'w-25',
        },
        {
          key: 'actions',
          label: '',
          tdClass: 'text-right',
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: this.$t(`columns.${c.key}`),
      })),
    }
  },

  computed: {
    userLabel () {
      return this.$auth.user.name || this.$auth.user.handle
    },

    generatedUrl () {
      return 'corteza://federation:428fw77rg@latest.cortezaproject.org?name=Community%20Server'
    },
  },

  methods: {
    items () {
      // return this.procListResults(this.$SystemAPI.userList(this.encodeListParams()))
      return [
        { federationID: '0', name: 'Bromley High School', enabled: 'True', status: 'Paired', tags: ['Education', 'HR'], createdAt: new Date() },
        { federationID: '1', name: 'Northwood College for Girls', enabled: 'True', status: 'Pending', tags: ['Education'], createdAt: new Date() },
      ]
    },

    openPairModal () {
      this.pair.status = undefined
      this.pair.modal = true
    },

    pairNode () {
      this.pair.status = 'pending'
      this.pair.url = ''
    },

    openConfirmPending (federationID) {
      this.pair.status = 'confirm-pending'
      this.pair.confirmID = federationID
      this.pair.modal = true
    },

    confirmPending () {
      // Update federation status
      this.pair.modal = false
    },

    copyUrl () {
      navigator.clipboard.writeText(this.generatedUrl)
    },
  },
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
