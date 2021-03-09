export default {
  navItem: {
    label: 'Templates',
  },

  list: {
    title: 'Templates',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading templates',
    numFound: `{{count}} template found`,
    numFound_plural: `{{count}} templates found`,

    filterForm: {
      handle: {
        label: 'Filter templates list',
        placeholder: 'Filter templates by handle',
      },

      excluded: {
        label: 'Without',
      },

      inclusive: {
        label: 'Including',
      },

      exclusive: {
        label: 'Only',
      },

      deleted: {
        label: 'deleted templates',
      },
    },

    columns: {
      meta: {
        short: 'Short name',
      },
      handle: 'Handle',
      language: 'Language',
      createdAt: 'Created',
      actions: '',
    },
  },

  editor: {
    title: 'Edit template',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      handle: 'Handle',
      type: 'Template type',
      partial: 'Partial template',
      partialDescription: 'Partial templates may be used inside other templates such as headers and footers. Partial templates may not be used on their own.',

      meta: {
        short: 'Short name',
        description: 'Description',
      },

      contentType: {
        text_html: 'HTML',
        text_plain: 'Plain text',
      },

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },

    content: {
      title: 'Template content',

      partial: 'Partial template',

      toolbox: {
        title: 'Toolbox',
        partials: 'Partials',
        snippets: {
          label: 'Snippets',

          interpolate: 'Interpolate value',
          iterator: 'Iterate over a set',
          funcCall: 'Call a function',
        },
        samples: {
          label: 'Samples',

          defaultHTML: 'Default HTML',
        },
      },

      editor: {
        unsupported: 'Unsupported editor',
      },

      preview: {
        title: 'Preview output',
        html: 'As HTML',
        pdf: 'As PDF',
      },
    },
  },
}
