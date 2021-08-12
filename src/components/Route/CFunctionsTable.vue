<template>
  <div>
    <b-table-simple
      class="function-table"
      hover
    >
      <b-thead>
        <b-tr>
          <b-th>
            <b-form-checkbox
              v-model="checkAll"
              class="light"
              @change="functionCheckAll()"
            />
          </b-th>
          <b-th>{{ $t('functions.list.functions') }}</b-th>
          <b-th>{{ $t('functions.list.status') }}</b-th>
          <b-th>{{ $t('functions.list.actions') }}</b-th>
        </b-tr>
      </b-thead>

      <draggable
        v-if="sortableFunctions.length"
        v-model="sortableFunctions"
        tag="b-tbody"
        @end="checkMove"
      >
        <b-tr
          v-for="(func, index) in sortableFunctions"
          :key="index"
          class="pointer"
          :class="[selectedRow===index ? 'row-selected' : 'row-not-selected']"
          @click.stop="onRowClick(func,index)"
        >
          <b-td
            class="cursor-default"
            @click.stop
          >
            <b-form-checkbox
              v-model="func.options.checked"
              class="light"
              @change.stop="functionChecked(index)"
            />
          </b-td>
          <b-td>
            {{ func.label }}
          </b-td>
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
      </draggable>
      <b-tbody v-else>
        <b-tr class="mt-2 text-danger">
          {{ $t('functions.list.noFunctionsMsg') }}
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <c-function-modal
      :func="selectedFunction"
      :step="step"
      @addFunction="onAddFunction"
      @updateFunction="onUpdateFunction"
    />
  </div>
</template>

<script>
import CFunctionModal from 'corteza-webapp-admin/src/components/Route/CFunctionModal'
import draggable from 'vuedraggable'
export default {
  components: {
    CFunctionModal,
    draggable,
  },
  props: {
    functions: {
      type: Array,
      required: true,
    },
    step: {
      type: Number,
      default: () => 0,
    },
  },

  data () {
    return {
      selectedRow: 0,
      selectedFunction: {},
    }
  },
  computed: {
    sortableFunctions: {
      get: function () {
        return this.functions
      },
      set: function (v) {
        this.$emit('sortFunctions', v)
      },
    },
    checkAll: {
      get: function () {
        return this.functions.every(f => f.options.checked === true)
      },
      set: function () {
      },
    },
  },
  methods: {

    onUpdateFunction (func) {
      this.$emit('updateFunction', func)
    },
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
      this.selectedFunction = func
      this.$bvModal.show('functionModal' + this.step)
    },
    onSelectLastRow () {
      this.selectedRow = this.functions.length
    },
    onSelectFirstRow () {
      this.selectedRow = 0
    },
    checkMove (evt) {
      this.selectedRow = evt.newDraggableIndex
      this.$emit('functionSelect', this.sortableFunctions[evt.newDraggableIndex])
    },
    functionChecked (index) {
      this.functions[index].options.checked = !this.functions[index].options.checked
    },
    functionCheckAll () {
      if (this.checkAll) {
        this.functions.forEach(f => { f.options.checked = false })
      } else {
        this.functions.forEach(f => { f.options.checked = true })
      }
    },
  },
}
</script>

<style lang="scss">
.function-table .row-selected{
  background: #F3F3F5;
}
.cursor-default{
  cursor: default;
}
</style>
