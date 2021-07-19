<template>
  <b-table-simple
    class="function-table"
    hover
  >
    <b-thead>
      <b-tr>
        <b-th>{{ $t('functions.list.functions') }}</b-th>
        <b-th>{{ $t('functions.list.status') }}</b-th>
        <b-th>{{ $t('functions.list.actions') }}</b-th>
      </b-tr>
    </b-thead>
    <b-tbody v-if="functions.length">
      <b-tr
        v-for="(func, index) in functions"
        :key="index"
        class="pointer"
        :class="[selectedRow===index ? 'row-selected' : 'row-not-selected']"
        @click.stop="onRowClick(func,index)"
      >
        <b-td>{{ func.ref }}</b-td>
        <b-td>{{ $t('functions.list.active') }}</b-td>
        <b-td>
          <b-button
            variant="danger"
            class="my-1"
            size="sm"
            @click.stop="onRemoveFunction(func)"
          >
            {{ $t('functions.list.remove') }}
          </b-button>
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tbody v-else>
      <b-tr class="mt-2 text-danger">
        {{ $t('functions.list.noFunctionsMsg') }}
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
export default {
  props: {
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
    onSelectLastRow () {
      this.selectedRow = this.functions.length
    },
    onSelectFirstRow () {
      this.selectedRow = 0
    },
  },
}
</script>

<style lang="scss">
  .function-table .row-selected{
    background: #F3F3F5;
  }
</style>
