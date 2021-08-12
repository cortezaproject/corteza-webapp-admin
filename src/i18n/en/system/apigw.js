export default {
  navItem: {
    label: 'API Gateway',
  },

  list: {
    title: 'API Gateway',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading routes',
    numFound: `{{count}} route found`,
    numFound_plural: `{{count}} routes found`,

    filterForm: {
      query: {
        label: 'Filter API Gateway list',
        placeholder: 'Filter routes by name',
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
        label: 'Deleted routes',
      },
    },

    columns: {
      endpoint: 'Endpoint',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  editor: {
    title: 'Edit route',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      id: 'ID',
      endpoint: 'Endpoint',
      method: 'Method',
      enabled: 'Enabled',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
      validEndpoint: 'Invalid endpoint format',
    },
    functions: {
      title: 'Function list',
      modal: {
        title: 'Query parameters verifier',
        ok: 'Save & Close',
      },
      step_title: {
        verifier: 'Access control',
        validator: 'Validation',
        processer: 'Processing',
        expediter: 'Expediting',
      },
      list: {
        remove: 'Remove',
        functions: 'Functions',
        status: 'Status',
        actions: 'Actions',
        active: 'Active',
        noFunctionsMsg: 'Please add a function!',
      },
      labels: {
        expr: 'Expression',
        location: 'Location',
        workflow: 'Workflow',
        status: 'HTTP Status',
      },

      add: 'Add',
      addFunction: 'Add function',
      params: 'Params',
      functionListEmpty: 'Function list is empty!',
    },
  },

}
