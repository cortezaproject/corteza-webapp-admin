<template>
  <div class="w-100 mt-3">
    <b-container class="mw-100">
      <b-row class="mb-5">
        <b-col cols="3">
          <aside class="h-100">
            <h4
              class="font-weight-bold"
            >
              {{ catalogue }}
            </h4>
            <ul
              class="pl-0 list-unstyled"
            >
              <li
                v-for="value in componentData.components"
                :key="value.cmp.name"
                class="h5 mt-0"
                @click="current=value"
              >
                <font-awesome-icon
                  :icon="['fas', 'puzzle-piece']"
                />
                {{ value.cmp.name || value.cmpName }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          v-if="current"
          cols="8"
        >
          <component
            :is="current.cmp"
            v-if="current"
            v-bind="current.def.props"
          />
        </b-col>
        <b-col
          v-else
          class="d-flex align-items-center justify-content-center"
          cols="7"
        >
          <h3>
            {{ cmpSelect }}
          </h3>
        </b-col>
      </b-row>
      <b-row
        v-if="current"
        class="w-50 my-0 mx-auto"
      >
        <b-col>
          <h3>
            {{ presetControls }}
          </h3>
          <ul
            class="pl-0"
          >
            <li
              v-for="s in current.def.scenarios"
              :key="s.label"
              class="mb-1 h5 list-unstyled"
              @click="current.def.props=s.props"
            >
              <span
                v-if="s.label === 'Full form'"
              >
                <font-awesome-icon
                  :icon="['fas', 'file-alt']"
                />
              </span>
              <span
                v-else
              >
                <font-awesome-icon
                  :icon="['fas', 'file']"
                />
              </span>
              {{ s.label }}
            </li>
          </ul>
        </b-col>
        <b-col>
          <h3>
            {{ populatedControls }}
          </h3>
          <b-form-group
            v-for="c in current.def.controls"
            :key="c.label"
            :label="c.label"
            content-cols-lg="8"
          >
            <component
              :is="c.type"
              v-if="c.type === 'b-form-checkbox'"
              class="pl-1 form-check-input text-center"
              :checked="c.value(current.def.props)"
              @change="c.handle(current.def.props, $event)"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-radio'"
              class="pl-1 form-check-input text-center"
              :value="c.value(current.def.props)"
              @change="c.handle(current.def.props, $event)"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-select'"
              v-model="current.def.props.queue.consumer"
              :options="current.def.props.consumers"
              :value="current.def.props.queue.consumer"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-input' || c.type === 'b-form-textarea'"
              :value="typeof c.value === 'function' ? c.value(current.def.props) : c.value"
              v-bind="current.def.props"
              @update="c.handle(current.def.props, $event)"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import componentData from '../../components/C3'

export default {
  name: 'C3',

  data () {
    return {
      componentData,
      current: null,
      populatedControls: 'Controls',
      catalogue: 'Component Catalogue',
      presetControls: 'Pre-set Controls',
      cmpSelect: 'Select a component from the Component Catalogue and start hacking :)',
    }
  },
}
</script>
