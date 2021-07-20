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
            // this loop is wrong, please figure out and redo it
            <ul
              v-for="value in componentData.components"
              :key="value.cmp.name[value]"              
              style="list-style: none"
            >
              <li
                class="ml-list h5 mt-0"
                @click="current=value"
              >
                - {{ value.cmp.name }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          cols="8"
        >
          <component
            :is="current.cmp"
            v-if="current"
            v-bind="current.def.props"
          />
        </b-col>
      </b-row>
      <b-row
        v-if="current"
        class="w-50 my-0 mx-auto"
      >
        <b-col>
          <h3>Pre-set Controls</h3>
          <ul>
            <li
              v-for="s in current.def.scenarios"
              :key="current.def.scenarios[s]"
              @click="current.def.props=s.props"
            >
              {{ s.label }}
            </li>
          </ul>
        </b-col>
        <b-col>
          <h3>Controls</h3>
          <b-form-group
            v-for="c in current.def.controls"
            :key="current.def.controls[c]"
            :label="c.label"
            content-cols-lg="8"
          >
            <component
              :is="c.type"
              v-model="c.value"
              @change="c.handle(current.def.props, $event)"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import componentData from './dataInstances'

export default {
  name: 'CC3',

  data () {
    return {
      componentData,
      current: null,
    }
  },

  methods: {
    onInfoSubmit (application) {
    },
    onDelete () {
    },
    onUnifySubmit () {
    },
  },
}
</script>

<style scoped lang="scss">
.ml-list {
  margin-left: -30px;
}

.forms:hover,
.form-container {
  background-color: rgb(231, 231, 231);
}

.form,
.form-container {
  border-radius: 5px;
}

.forms {
  cursor: pointer;
  padding: 5px 0 5px 5px;
}

.form-container {
  border-radius: 5px;
  margin-bottom: 5px;

  .m-ul {
    list-style-type: none;
    margin-left: -40px;
    margin-bottom: -3px;
  }
}
</style>
