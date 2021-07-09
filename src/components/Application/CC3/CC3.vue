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
        </b-col>
      </b-row>
      <b-row
        class="mw-50"
      >
        <b-col
          cols="3"
        />
        <b-col>
          <h3>Pre-set Controls</h3>

          <ul>
            <li
              v-for="(s) in scenarios"
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
            :label="c.label"
          >
            <b-form-input
              @change="c.handle(props, value)"
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
import data from './formData'

export default {
  name: 'CC3',
  components: {
    CApplicationEditorInfo,
  },

  data () {
    return {
      props: data.fullForm,
      scenarios: data.scenarios,
      controls: data.controls,

      // emptyForm: data.emptyForm,
      // appData: data.appData,

      components: this.$options.components,
      isEmptyFormPopulated: false,
      isFullFormPopulated: false,
      isPropertyClicked: false,
    }
  },

  methods: {
    update (objectName, propertyName, value) {
      if (typeof (value) === 'boolean') {
        value = !value
      }

      this.$set(objectName, propertyName, value)
    },
    editProperty () {
      this.isPropertyClicked = !this.isPropertyClicked
    },
    populateEmptyForm () {
      this.isEmptyFormPopulated = !this.isEmptyFormPopulated

      if (this.isFullFormPopulated) {
        this.isFullFormPopulated = !this.isFullFormPopulated
      }
    },
    populateFullForm () {
      this.isFullFormPopulated = !this.isFullFormPopulated

      if (this.isEmptyFormPopulated) {
        this.isEmptyFormPopulated = !this.isEmptyFormPopulated
      }
    },
    onInfoSubmit (application) {
    },
    onDelete () {
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
