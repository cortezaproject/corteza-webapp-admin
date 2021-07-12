<template>
  <table
    class="my-3 w-100"
  >
    <th>
      Functions
    </th><th>
      Status
    </th>
    <th class="text-center">
      Actions
    </th>
    <template v-if="functions.length">
      <tr
        v-for="(func, index) in functions"
        :key="index"
        class="pointer"
        :class="[selectedRow===index ? 'row-selected' : 'row-not-selected']"
        active
        @click.stop="onRowClick(func,index)"
      >
        <td>
          {{ func.label }}
        </td>
        <td>
          Active
        </td>
        <td class="text-center">
          <b-button
            variant="danger"
            class="my-1"
            size="sm"
            @click.stop="onRemoveFunction(func)"
          >
            Remove
          </b-button>
        </td>
      </tr>
    </template>
    <template v-else>
      <tr class="mt-2 text-danger">
        Please add a function!
      </tr>
    </template>
  </table>
</template>

<script>
export default {
  props: {
    avaliableFunctions: {
      type: Array,
      required: true,
    },
    functions: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      selectedRow: 0,
    }
  },

  methods: {
    onAddFunction (func) {
      if (!this.functions.find(f => f.ref === func.ref)) {
        this.functions.push({ ...func })
      }
      if (this.functions.length === 1) {
        this.$emit('functionSelect', this.functions[0])
      }
    },
    onRemoveFunction (func) {
      this.$emit('removeFunction', func)
    },
    onRowClick (func, index) {
      this.selectedRow = index
      this.$emit('functionSelect', func)
    },
  },
}
</script>

<style scoped lang="scss">
th{
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    padding: 0.7rem 0;
}
td{
    border-top: 1px solid #dee2e6;
}
tr:hover{
        background: rgba(240,240,240,0.5);
}
.row-selected{
  background: rgba(240,240,240,1) !important;
}
</style>
