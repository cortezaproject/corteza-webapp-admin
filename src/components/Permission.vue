<template>
  <tr>
    <td class="short">
      <permission-value v-model="value"
                        :current="current"
                        :enabled="enabled"
                        v-on="$listeners"></permission-value>
    </td>
    <td class="text">
      <b>{{ title }}</b>
      <div>{{ description }}</div>
    </td>
    <td class="short">
      <b-button variant="link" @click="selected = current" v-show="isChanged">Reset back to "{{ current }}"</b-button>
    </td>
  </tr>
</template>

<script>
import PermissionValue from '@/components/PermissionValue'

export default {
  components: {
    PermissionValue,
  },

  props: {
    resource: {
      type: String,
      required: true,
    },

    operation: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    default: {
      type: String,
      required: false,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    value: {
      type: String,
      required: false,
    },

    current: {
      type: String,
      required: false,
    },
  },

  computed: {
    isChanged () {
      return this.value !== this.current
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';

td {
  vertical-align: top;
  border-top: none;
  height: 40px;

  &.short {
    width: 170px;
  }

  &.text {
    div {
      font-size: 10px;
      font-style:italic;
    }
  }
}

</style>
