<template>
  <div>
    <table class="w-100 mb-3">
      <tr
        v-for="(header, index) in headers"
        :key="index"
      >
        <td class="w-45">
          <b-form-group
            class="mb-0 mt-1"
            :label="$t(`filters.headers.name`)"
            label-cols="2"
          >
            <vue-select
              v-if="!header.custom"
              v-model="header.label"
              :options="sortedHeaderList"
              @input="onDropdownChange(index)"
            />
            <b-form-input
              v-else
              v-model="header.label"
              :placeholder="$t(`filters.headers.customPlaceholder`)"
              @change="onUpdateHeader"
            />
          </b-form-group>
        </td>
        <td />
        <td>
          <b-form-group
            class="ml-3 mb-0 mt-1"
            :label="$t(`filters.headers.value`)"
            label-cols="2"
          >
            <b-form-input
              v-model="header.value"
              @change="onUpdateHeader"
            />
          </b-form-group>
        </td>
        <td class="pl-1">
          <b-button
            :id="index"
            ref="delete"
            variant="link"
            class="d-flex mt-1 align-items-center"
            @click="deleteFilter(index)"
          >
            <font-awesome-icon
              :icon="['far', 'trash-alt']"
              size="sm"
            />
          </b-button>
        </td>
      </tr>

      <tr>
        <td class="pb-0">
          <b-button
            variant="link text-decoration-none"
            class="d-flex align-items-center pl-0"
            style="min-height: 38px; min-width: 84px;"
            @click="addDefaultHeader()"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
              size="sm"
              class="mr-1"
            />
            {{ $t(`filters.headers.add`) }}
          </b-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { VueSelect } from 'vue-select'

export default {
  components: {
    VueSelect,
  },

  props: {
    params: {
      type: Array,
      default: () => [],
    },
  },

  data () {
    return {
      headers: [],

      headerList: [
        'Content-Type',
        'Content-Length',
        'Host',
        'User-Agent',
        'Accept',
        'Accept-Encoding',
        'Connection',
        'Authorization',
      ],
    }
  },

  computed: {
    getDefaultHeader () {
      return { label: '', custom: false, value: '' }
    },

    sortedHeaderList () {
      let sortedList = [...this.headerList].sort()
      sortedList.unshift(this.$t(`filters.headers.custom`))
      return sortedList
    },
  },

  watch: {
    params: {
      immediate: true,
      handler () {
        if ((this.params[0] || {}).value) {
          this.headers = this.toHeadersArray(this.params[0].value)
        }
      },
    },
  },

  created () {
    if (!this.headers.length) {
      this.addDefaultHeader()
    }
  },

  methods: {
    onDropdownChange (index) {
      if (this.headers[index].label === this.$t(`filters.headers.custom`)) {
        this.headers[index].custom = true
        this.headers[index].label = ''
      }
    },

    onUpdateHeader () {
      this.params[0].value = this.toHeadersString(this.headers)
      this.$emit('update')
    },

    addDefaultHeader () {
      this.headers.push({ ...this.getDefaultHeader })
      this.onUpdateHeader()
    },

    deleteFilter (index) {
      this.headers.splice(index, 1)
      if (!this.headers.length) {
        this.addDefaultHeader()
      }
      this.onUpdateHeader()
    },

    // Convert to string for API call
    toHeadersString (headers) {
      if (headers.some(h => h.label.length > 0)) {
        return headers.map(h => {
          return `${h.label} == "${h.value}"`
        }).join(' and ')
      } else {
        return ''
      }
    },

    // Populate array from parameter string
    toHeadersArray (value) {
      const split = value.split(' and ')
      const headers = split.map(h => {
        let items = h.split(' == ')
        if (items.length > 1) {
          return { label: items[0], custom: !this.headerList.includes(items[0]), value: items[1].replaceAll('"', '') }
        }
      })
      return headers
    },
  },
}
</script>
<style lang="scss" scoped>
.w-45{
width: 45%;
}
</style>
