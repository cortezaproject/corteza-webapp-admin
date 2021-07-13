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
                class="ml-list mt-0"
              >
                - {{ value.name }}
              </li>
            </ul>
          </aside>
        </b-col>
        <b-col
          v-if="!isEmptyFormPopulated && !isFullFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="appData.application"
            :processing="appData.info.processing"
            :success="appData.info.success"
            :can-create="appData.canCreate.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
        <b-col
          v-if="isEmptyFormPopulated && !isFullFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="emptyForm.application"
            :processing="emptyForm.info.processing"
            :success="emptyForm.info.success"
            :can-create="emptyForm.canCreate.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
        <b-col
          v-if="isFullFormPopulated && !isEmptyFormPopulated"
          cols="8"
        >
          <c-application-editor-info
            :application="fullForm.application"
            :processing="fullForm.info.processing"
            :success="fullForm.info.success"
            :can-create="fullForm.canCreate.canCreate"
            @submit="onInfoSubmit"
            @delete="onDelete"
          />
        </b-col>
      </b-row>
      <b-row
        class="mw-50"
      >
        <b-col>
          <h3>Pre-set Controls</h3>
          <h5
            class="forms mb-1"
            @click="populateEmptyForm"
          >
            - Generate Empty Form
          </h5>
          <div
            v-if="isEmptyFormPopulated"
            class="form-container pl-3 pt-2"
          >
            <ul
              v-for="(value, key) in emptyForm"
              :key="key"
              class="m-ul"
            >
              <h6>{{ key }}: {</h6>
              <li
                v-for="(v, k, i) in value"
                :key="i"
              >
                <label
                  class="pl-2"
                >
                  {{ k }}:
                </label>
                <span
                  class="text-secondary"
                >
                  {{ v }}
                </span>
              </li>
              <h6>}</h6>
            </ul>
          </div>
          <h5
            class="forms mb-1"
            @click="populateFullForm"
          >
            - Generate Full Form
          </h5>
          <div
            v-if="isFullFormPopulated"
            class="form-container pl-3 pt-2 mb-3"
          >
            <ul
              v-for="(value, key) in fullForm"
              :key="key"
              class="m-ul"
            >
              <h6>{{ key }}: {</h6>
              <li
                v-for="(v, k, i) in value"
                :key="i"
              >
                <label
                  class="pl-2"
                >{{ k }}:</label>
                <span
                  class="text-secondary"
                >
                  {{ v }}
                </span>
              </li>
              <h6>}</h6>
            </ul>
          </div>
        </b-col>
        <b-col>
          <h3>Controls</h3>
          <div
            v-if="!isEmptyFormPopulated && !isFullFormPopulated"
          >
            <ul
              v-for="(value, key) in appData"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <li
                v-for="(v, k) in value"
                :key="k"
              >
                <label>{{ k }}:</label>
                <input
                  class="ml-2 pl-1"
                  :value="v"
                  @input="update('name', $event.target.value)"
                >
              </li>
            </ul>
          </div>
          <div
            v-if="isEmptyFormPopulated && !isFullFormPopulated"
          >
            <ul
              v-for="(value, key) in emptyForm"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <li
                v-for="(v, k) in value"
                :key="k"
              >
                <label>{{ k }}:</label>
                <input
                  class="ml-2 pl-1"
                  :value="v"
                  @input="update('name', $event.target.value)"
                >
              </li>
            </ul>
          </div>
          <div
            v-if="isFullFormPopulated && !isEmptyFormPopulated"
          >
            <ul
              v-for="(value, key) in fullForm"
              :key="key"
              style="list-style: none"
              class="m-ul"
            >
              <li
                v-for="(v, k) in value"
                :key="k"
              >
                <label>{{ k }}:</label>
                <input
                  class="ml-2 pl-1"
                  :value="v"
                  @input="update('name', $event.target.value)"
                >
              </li>
            </ul>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CApplicationEditorInfo from './CApplicationEditorInfo.vue'

const emptyForm = {
  application: {
    applicationID: '0',
    canDeleteApplication: false,
    canUpdateApplication: false,
    createdAt: '',
    enabled: false,
    name: '',
  },
  info: {
    processing: false,
    success: false,
  },
  canCreate: {
    canCreate: false,
  },
}

const fullForm = {
  application: {
    applicationID: '234900176853008386',
    canDeleteApplication: false,
    canUpdateApplication: true,
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  info: {
    processing: false,
    success: false,
  },
  canCreate: {
    canCreate: true,
  },
}

const appData = {
  application: {
    applicationID: '234900176853008386',
    canDeleteApplication: false,
    canGrant: true,
    canUpdateApplication: true,
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  info: {
    processing: false,
    success: false,
  },
  canCreate: {
    canCreate: true,
  },
}

export default {
  name: 'CSurprise',
  components: {
    CApplicationEditorInfo,
  },

  data () {
    return {
      appData,
      components: this.$options.components,
      isEmptyFormPopulated: false,
      isFullFormPopulated: false,
      emptyForm,
      fullForm,
    }
  },

  computed: {
    app: {
      get () {
        return this.application
      },

      set (a) {
        this.$emit('update:application', a)
      },
    },
  },

  created () {
    console.log()
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
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
      console.log('triggerred onInfoSubmit')
      console.log(application)
    },
    onDelete () {
      console.log('triggerred onDelete')
    },
    editApp (a) {
      console.log(a)
    },
  },
}
</script>

<style scoped lang="scss">
.ml-list {
  margin-left: -30px;
}

.m-ul {
  list-style-type: none;
  margin-left: -40px;
  margin-bottom: -3px;
}

.forms {
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 0 5px 5px;

  &:hover {
    background-color: rgb(228, 228, 228);
  }
}

.form-container {
  background-color: rgb(231, 231, 231);
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>
