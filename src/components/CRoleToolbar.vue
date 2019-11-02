<template>
  <b-button-toolbar>
    <b-button-group>
      <b-button variant="link">
        New
      </b-button>
    </b-button-group>
    <b-button-group>
      <b-button variant="link">
        Permissions
      </b-button>
    </b-button-group>
    <b-dropdown
      variant="link"
      right

      menu-class="shadow-sm"
      text="Export"
    >
      <b-dropdown-item-button variant="link">
        YAML
      </b-dropdown-item-button>
    </b-dropdown>
    <b-button-group>
      <b-button variant="link">
        Help
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
export default {
  name: 'CRoleToolbar',
}
</script>
