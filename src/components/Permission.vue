<template>
  <tr>
    <td class="short">
      <b-form-group>
        <b-form-radio-group buttons
                            v-model="selected"
                            :disabled="!enabled"
                            button-variant="outline-info"
                            :options="permissionOptions" />
        </b-form-group>
    </td>
    <td class="table-details">
      <b>{{ title }}</b>
      <br>
      {{ subtitle }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    default: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  data () {
    return {
      selected: 'allow',
      permissionOptions: [
        { text: 'Allow', value: 'allow' },
        { text: 'Inherit', value: 'inherit' },
        { text: 'Forbid', value: 'forbid' },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';

td {
  vertical-align: middle;
  border-bottom: 1px solid $appcream;
  border-top: none;
}
.short {
  width: 170px;
}

</style>
