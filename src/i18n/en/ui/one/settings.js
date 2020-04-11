export default {
  navItem: {
    label: 'Settings',
  },

  editor: {
    title: 'Corteza One Settings',

    panels: {
      label: 'Panel #{{ index }}',
      sticky: { label: 'Tabs in this panel can not be removed, added or reordered' },

      tab: {
        label: 'Tab #{{ index }}',

        add: { label: 'Add tab' },
        remove: { label: 'Remove tab' },

        title: { label: 'Title' },
        url: { label: 'URL' },
        logo: { label: 'Logo' },
        icon: { label: 'Icon' },
        active: { label: 'Active' },
        sticky: { label: 'Can not be removed' },
      },
      title: 'Panels',
      submit: 'Save changes',
    },
  },
}
