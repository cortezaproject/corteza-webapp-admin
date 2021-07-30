<template>
  <div class="w-100 mt-3">
    <b-container class="mw-100">
      <b-row class="mb-5">
        <b-col cols="3">
          <aside class="h-100">
            <h4
              class="font-weight-bold"
            >
              {{ labels.catalogue }}
            </h4>
            <ul
              class="pl-0 list-unstyled"
            >
              <li
                v-for="(cmp, i) in catalogue"
                :key="`component-${i}`"
                class="h5 mt-0"
                @click="current=cmp"
              >
                <font-awesome-icon
                  :icon="['fas', 'puzzle-piece']"
                />
                {{ cmp.component.name || cmp.name || 'untitled' }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          v-if="current"
          cols="8"
        >
          <component
            :is="current.component"
            v-if="current"
            v-bind="current.props"
          />
        </b-col>
        <b-col
          v-else
          class="d-flex align-items-center justify-content-center"
          cols="7"
        >
          <h3>
            {{ labels.cmpSelect }}
          </h3>
        </b-col>
      </b-row>
      <b-row
        v-if="current"
        class="w-50 my-0 mx-auto"
      >
        <b-col>
          <h3>
            {{ labels.presetControls }}
          </h3>
          <ul
            class="pl-0"
          >
            <li
              v-for="(s, i) in current.scenarios"
              :key="`scenarios-${i}`"
              class="mb-1 h5 list-unstyled"
              @click="current.props=s.props"
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
            {{ labels.populatedControls }}
          </h3>
          <b-form-group
            v-for="(c, i) in current.controls"
            :key="`controls-${i}`"
            :label="c.label"
            content-cols-lg="8"
          >
            <component
              :is="c.type"
              v-if="c.type === 'b-form-checkbox'"
              class="pl-1 form-check-input text-center"
              :checked="c.value(current.props)"
              @change="c.handle(current.props, $event)"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-radio'"
              class="pl-1 form-check-input text-center"
              :value="c.value(current.props)"
              @change="c.handle(current.props, $event)"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-select'"
              v-model="current.props.queue.consumer"
              :options="current.props.consumers"
              :value="current.props.queue.consumer"
            />
            <component
              :is="c.type"
              v-if="c.type === 'b-form-input' || c.type === 'b-form-textarea'"
              :value="typeof c.value === 'function' ? c.value(current.props) : c.value"
              v-bind="current.props"
              @update="c.handle(current.props, $event)"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

export default {
  name: 'C3',

  props: {
    catalogue: {
      required: true,
      type: Object,
    },
  },

  data () {
    return {
      current: null,

      labels: {
        populatedControls: 'Controls',
        catalogue: 'Component Catalogue',
        presetControls: 'Pre-set Controls',
        cmpSelect: 'Select a component from the Component Catalogue and start hacking :)',
      },
    }
  },
}
</script>
