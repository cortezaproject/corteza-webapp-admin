<template>
  <b-card
    class="shadow-sm h-100"
    header-bg-variant="white"
    footer-bg-variant="white"
    no-body
  >
    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <b-card
      v-for="sec in sections"
      :key="sec.key"
      no-body
      class="mb-1"
    >
      <b-card-header
        header-tag="header"
        class="p-1"
        role="tab"
      >
        <b-btn
          variant="link"
          class="w-100"
          @click="openSection(sec.key)"
        >
          {{ $t(sec.key) }}
        </b-btn>
      </b-card-header>
      <b-collapse
        :visible="expandedSections[sec.key]"
        role="tabpanel"
        class="py-2 px-0"
      >
        <b-list-group flush>
          <b-list-group-item
            v-for="(opt, i) in sec.options"
            :key="opt.label + i"
            @click="opt.onClick || (() => {})"
          >
            {{ opt.label }}
            <b-btn
              variant="link"
              @click="copyToCb(opt.copyValue())"
            >
              <font-awesome-icon
                v-if="opt.copyValue"
                :icon="['far', 'copy']"
              />
            </b-btn>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
    </b-card>
  </b-card>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  i18nOptions: {
    namespaces: [ 'system.templates' ],
    keyPrefix: 'editor.content.toolbox',
  },

  props: {
    template: {
      type: Object,
      required: true,
      default: () => ({}),
    },

    partials: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data () {
    return {
      expandedSections: {},
    }
  },

  computed: {
    sections () {
      const partials = this.partials.map(p => ({
        label: p.meta.short || p.handle,
        copyValue: () => `{{template "${p.handle}" }}`,
      }))

      const rr = []
      if (partials.length) {
        rr.push({
          key: 'partials',
          options: partials,
        })
      }

      rr.push({
        key: 'snippets.label',
        options: [
          {
            label: this.$t('snippets.interpolate'),
            copyValue: () => `{{.parameter}}`,
          },
          {
            label: this.$t('snippets.iterator'),
            copyValue: () => `{{range $index, $element := .ListOfItems}}\n\n{{end}}`,
          },
          {
            label: this.$t('snippets.funcCall'),
            copyValue: () => `{{funcName param1 param2 paramN}}`,
          },
        ],
      },
      {
        key: 'samples.label',
        options: [
          {
            label: this.$t('samples.defaultHTML'),
            copyValue: () => `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Title</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>`,
          },
        ],
      })

      return rr
    },
  },

  methods: {
    openSection (sec) {
      this.$set(this.expandedSections, sec, !this.expandedSections[sec])
    },
    copyToCb: copy,
  },

}
</script>