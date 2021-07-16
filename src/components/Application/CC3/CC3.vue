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
              v-for="(value, key, index) in components"
              :key="index"
              style="list-style: none"
            >
              <li
                v-if="index !== Object.keys(components).length - 1"
                class="ml-list h5 mt-0"
              >
                - {{ value.name }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          cols="8"
        >
          <c-application-editor-info
            v-bind="props"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
          <c-application-editor-unify
            v-if="props.unify && props.application.applicationID"
            class="mt-3"
            v-bind="props"
            @submit="onUnifySubmit"
            @delete="onDelete"
          />
        </b-col>
      </b-row>
      <b-row
        class="w-50 my-0 mx-auto"
      >
        <b-col>
          <h3>Pre-set Controls</h3>
          <ul>
            <li
              v-for="(s) in scenarios"
              :key="scenarios[s]"
              @click="props=s.props"
            >
              {{ s.label }}
            </li>
          </ul>
        </b-col>
        <b-col>
          <h3>Controls</h3>
          <b-form-group
            v-for="(c) in controls"
            :key="controls[c]"
            :label="c.label"
            content-cols-lg="8"
          >
            <component
              :is="c.type"
              v-model="c.value"
              @change="c.handle(props, $event)"
            />
          </b-form-group>
          {{ controls }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CApplicationEditorInfo from '../CApplicationEditorInfo.vue'
import CApplicationEditorUnify from '../CApplicationEditorUnify.vue'

import data from './dataInstances'

export default {
  name: 'CC3',
  components: {
    CApplicationEditorInfo,
    CApplicationEditorUnify,
  },

  data () {
    return {
      props: data.props,
      scenarios: data.scenarios,
      controls: data.controls,
      components: this.$options.components,
      isPropertyClicked: false,
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
