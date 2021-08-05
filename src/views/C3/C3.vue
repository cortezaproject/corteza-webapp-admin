<template>
  <div class="w-100 mt-3">
    <b-container class="mw-100">
      <b-row class="mb-5">
        <b-col cols="3">
          <aside class="h-100">
            <h4
              class="font-weight-bold"
            >
              Component Catalogue
            </h4>
            <ul
              class="pl-0 list-unstyled"
            >
              <li
                v-for="(cmp, i) in catalogue"
                :key="i"
                class="h5 mt-0"
                @click="setCurrent(cmp)"
              >
                <font-awesome-icon
                  :icon="['fas', 'puzzle-piece']"
                />
                {{ cmp.component.name || cmp.name || 'Untitled' }}
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
            Select a component from the Component Catalogue and start hacking :)
          </h3>
        </b-col>
      </b-row>
      <b-row
        v-if="current"
        class="w-50 my-0 mx-auto"
      >
        <b-col>
          <h3>
            Pre-set Controls
          </h3>
          <ul
            class="pl-0"
          >
            <li
              v-for="(s, i) in current.scenarios"
              :key="i"
              class="mb-1 h5 list-unstyled"
              @click="setScenario(s)"
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
            Controls
          </h3>
          <component
            :is="c.component"
            v-for="(c, i) in current.controls"
            :key="i"
            :label="c.label"
            :value="c.value(current.props)"
            @update="c.update(current.props, $event)"
          />
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
      current: {},
    }
  },

  methods: {
    setCurrent (component) {
      this.current = { props: {}, ...component }
      this.setScenario(this.current)
    },

    setScenario ({ props = {} }) {
      // do a deep copy and loose all references
      this.current.props = JSON.parse(JSON.stringify(props))
    },
  },
}
</script>
