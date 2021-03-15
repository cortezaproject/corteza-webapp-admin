<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', panels)"
    >
      <div
        v-for="(panel, p) in panels"
        :key="'panel-' + p"
      >
        <b-container
          fluid
          class="p-0"
        >
          <b-row no-gutters>
            <b-col
              cols="6"
            >
              <b-form-checkbox
                v-if="p === 0"
                :disabled="true"
                :checked="true"
              >
                {{ $t('label', { index: p + 1 }) }}
              </b-form-checkbox>
              <b-form-checkbox
                v-else
                v-model="panels[p].visible"
              >
                {{ $t('label', { index: p + 1 }) }}
              </b-form-checkbox>
            </b-col>
            <b-col
              cols="6"
              class="text-right"
            >
              <b-button
                variant="link"
                @click="panels[p].tabs.push({})"
              >
                {{ $t('tab.add.label') }}
              </b-button>
            </b-col>
          </b-row>
          <b-form-group
            v-if="panels[p].tabs.length > 0"
          >
            <b-form-checkbox
              v-model="panels[p].sticky"
            >
              {{ $t('sticky.label') }}
            </b-form-checkbox>
          </b-form-group>
        </b-container>
        <draggable
          :list.sync="panels[p].tabs"
          group="tabs"
          ghost-class="bg-light"
          chosen-class="bg-light"
          :sort="true"
          handle=".card-header"
        >
          <b-card
            v-for="(tab, t) in panels[p].tabs"
            :key="'panel-' + p + '-tab-' + t"
            class="mb-3"
            no-body
          >
            <b-card-header class="p-0 m-0">
              <b-container
                fluid
                class="p-1"
              >
                <b-row no-gutters>
                  <b-col
                    cols="6"
                    class="h3 m-0 p-1"
                  >
                    {{ $t('tab.label', { index: t + 1}) }}: "{{ panels[p].tabs[t].title }}"
                  </b-col>
                  <b-col
                    cols="6"
                    class="text-right"
                  >
                    <b-button
                      variant="link"
                      class="py-1"
                      @click="panels[p].tabs.splice(t, 1)"
                    >
                      {{ $t('tab.remove.label') }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-header>
            <b-card-body
              v-if="panels[p].tabs[t]"
              class="p-3 m-0"
            >
              <b-form-group
                label-cols-sm="2"
                :label="$t('tab.title.label')"
              >
                <b-input
                  v-model="panels[p].tabs[t].title"
                />
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
                :label="$t('tab.url.label')"
              >
                <b-input
                  v-model="panels[p].tabs[t].url"
                />
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
                :label="$t('tab.icon.label')"
              >
                <b-input
                  v-model="panels[p].tabs[t].icon"
                />
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
                :label="$t('tab.logo.label')"
              >
                <b-input
                  v-model="panels[p].tabs[t].logo"
                />
              </b-form-group>
              <b-form-group
                label-cols-sm="2"
              >
                <b-radio
                  v-model="panels[p].activeTabIndex"
                  :value="t"
                >
                  {{ $t('tab.active.label') }}
                </b-radio>
                <b-form-checkbox
                  v-model="panels[p].tabs[t].sticky"
                >
                  {{ $t('tab.sticky.label') }}
                </b-form-checkbox>
              </b-form-group>
            </b-card-body>
          </b-card>
        </draggable>
      </div>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :disabled="!canManage"
        :processing="processing"
        :success="success"
        @submit="$emit('submit', panels)"
      />
    </template>
  </b-card>
</template>

<script>
import draggable from 'vuedraggable'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import { pick } from 'lodash'

// Values to use for panel tab defaults
const tabDefaults = {
  title: 'Untitled',
  url: '',
  logo: '/applications/default_logo.jpg',
  icon: '/applications/default_icon.png',
  sticky: false,
}

// Known and valid properties for panel tabs
const tabProps = Object.getOwnPropertyNames(tabDefaults)

export default {
  name: 'COneEditorPanels',

  i18nOptions: {
    namespaces: [ 'ui.one.settings' ],
    keyPrefix: 'editor.panels',
  },

  components: {
    draggable,
    CSubmitButton,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },

    canManage: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      panels: [],
    }
  },

  watch: {
    // As soon as we get new value from the parent
    // reset & normalize panels
    //
    // Why is this not in created/mounted?
    // Because the value is loaded and updated in the parent component AFTER
    // this component has been rendered
    value: {
      immediate: true,
      handler (p) {
        this.panels = JSON.parse(JSON.stringify(
          // Normalize panels
          (p || []).map(({ visible, ...panel }, index) => ({
            activeTabIndex: 0,
            visible: index === 0 || visible,
            ...panel,
            // Normalize tabs
            tabs: (panel.tabs || []).map(tab => ({
              ...tabDefaults,
              ...pick(tab, tabProps),
            })),
          }))
        ))
      },
    },
  },
}
</script>
<style lang="scss">
.card-header {
  cursor: move;
}
</style>
