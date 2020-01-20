<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <c-corredor-manual-buttons
        ui-page="dashboard"
        ui-slot="toolbar"
        resource-type="system'"
        class="mr-1"
        @click="dispatchCortezaSystemEvent($event)"
      />
    </c-content-header>
    <b-row>
      <b-col
        cols="12"
        lg="7"
        xl="8"
      >
        <b-card
          class="shadow-sm mb-3"
        >
          <b-card-title>
            <router-link
              class="display-3"
              :to="{ name: 'system.user.list' }"
            >
              {{ users.valid }}
            </router-link>
          </b-card-title>
          <b-card-sub-title>{{ $t('users.title') }}</b-card-sub-title>

          <canvas
            ref="userChart"
            style="height: 100px; width: 100%"
          />

          <b-container class="mt-3">
            <b-row>
              <b-col
                cols="4"
              >
                <router-link
                  :to="{ name: 'system.user.list', query: { deleted: 1, suspended: 1 } }"
                >
                  {{ users.total }}
                </router-link>
              </b-col>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.user.list', query: { deleted: 1, suspended: 2 } }"
                >
                  {{ users.suspended }}
                </router-link>
              </b-col>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.user.list', query: { deleted: 2, suspended: 1 } }"
                >
                  {{ users.deleted }}
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('users.total') }}
              </b-col>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('users.suspended') }}
              </b-col>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('users.deleted') }}
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
      <b-col
        cols="12"
        lg="5"
        xl="4"
      >
        <b-card
          class="shadow-sm"
        >
          <b-card-title>
            <h1>
              <router-link
                class="display-4"
                :to="{ name: 'system.role.list' }"
              >
                {{ roles.valid }}
              </router-link>
            </h1>
          </b-card-title>
          <b-card-sub-title>{{ $t('roles.title') }}</b-card-sub-title>

          <b-container class="mt-3">
            <b-row>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.role.list', query: { deleted: 1, archived: 1 } }"
                >
                  {{ roles.total }}
                </router-link>
              </b-col>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.role.list', query: { deleted: 1, archived: 2 } }"
                >
                  {{ roles.archived }}
                </router-link>
              </b-col>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.role.list', query: { deleted: 2, archived: 1 } }"
                >
                  {{ roles.deleted }}
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('roles.total') }}
              </b-col>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('roles.archived') }}
              </b-col>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('roles.deleted') }}
              </b-col>
            </b-row>
          </b-container>
        </b-card>
        <b-card
          class="shadow-sm mt-3"
        >
          <b-card-title>
            <h1>
              <router-link
                class="display-4"
                :to="{ name: 'system.application.list' }"
              >
                {{ applications.valid }}
              </router-link>
            </h1>
          </b-card-title>
          <b-card-sub-title>{{ $t('applications.title') }}</b-card-sub-title>

          <b-container class="mt-3">
            <b-row>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.application.list', query: { deleted: 2 } }"
                >
                  {{ applications.total }}
                </router-link>
              </b-col>
              <b-col cols="4">
                <router-link
                  :to="{ name: 'system.application.list', query: { deleted: 1 } }"
                >
                  {{ applications.deleted }}
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('applications.total') }}
              </b-col>
              <b-col
                cols="4"
                class="text-secondary"
              >
                {{ $t('applications.deleted') }}
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ChartJS from 'chart.js'
import * as moment from 'moment'

export default {
  i18nOptions: {
    namespaces: [ 'dashboard' ],
  },

  data () {
    return {
      userChart: null,
      users: {
        total: 0,
        valid: 0,
        deleted: 0,
        suspended: 0,
        dailyCreated: [],
        dailyUpdated: [],
        dailySuspended: [],
        dailyDeleted: [],
      },
      roles: {
        total: 0,
        valid: 0,
        archived: 0,
        deleted: 0,
      },
      applications: {
        total: 0,
        valid: 0,
        deleted: 0,
      },
    }
  },

  computed: {
    userTimeline () {
      const d = this.users.dailyCreated
      const unit = this.getComfortableTimeUnit(d)

      let aux = {}
      for (let i = 0; i < d.length; i += 2) {
        const ts = moment.unix(d[i]).startOf(unit).toISOString()
        aux[ts] = (aux[ts] || 0) + d[i + 1]
      }

      let fmt = []
      for (let x in aux) {
        fmt.push({ x, y: aux[x] })
      }

      return fmt
    },
  },

  async created () {
    await this.$SystemAPI.statsList().then(({ users, roles, applications }) => {
      this.users = users
      this.roles = roles
      this.applications = applications

      this.initUserChart()
    })
  },

  mounted () {
    this.$nextTick(() => {
      this.$EventBus.Dispatch({
        resourceType: 'ui:admin:dashboard',
        eventType: 'afterMount',
        args: { data: this.$data, $el: this.$el },
      })
    })
  },

  updated () {
    this.$nextTick(() => {
      this.$EventBus.Dispatch({
        resourceType: 'ui:admin:dashboard',
        eventType: 'afterUpdate',
        args: { data: this.users, $el: this.$el },
      })
    })
  },

  methods: {
    initUserChart () {
      const d = this.users.dailyCreated
      const unit = this.getComfortableTimeUnit(d)
      const ctx = this.$refs.userChart.getContext('2d')

      this.userChart = new ChartJS(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Created users',
              data: this.userTimeline,
              fill: false,
              borderColor: 'gray',
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: unit,
                  minUnit: unit,
                },
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        },
      })
    },

    /**
     * Takes standard array with date+value pairs and returns comfortable time unit
     * depending on time span between min & max unit
     *
     * @param {number[]} range
     */
    getComfortableTimeUnit (range) {
      if (range.length === 0) {
        return undefined
      }

      if (range.length === 2) {
        return 'day'
      }

      const ts = range.filter((v, i) => i % 2 === 0).sort()
      const min = ts[0]
      const max = ts[ts.length - 1]
      const diffInDays = (max - min) / (60 * 60 * 24)

      if (diffInDays > 360) {
        return 'year'
      }

      if (diffInDays > 120) {
        return 'month'
      }

      if (diffInDays > 14) {
        return 'week'
      }

      return 'day'
    },
  },
}
</script>
