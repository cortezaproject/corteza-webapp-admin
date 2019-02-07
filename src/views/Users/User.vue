<template>
  <div class="settings">
    <router-link :to="{ name: 'users' }" class="float-right">close</router-link>
    <h2 class="header-subtitle header-row">
      User Information
    </h2>
    <div class="row list-settings">
      { {{ user }} }
      <div class="col-lg-7">
        <b-input-group prepend="Username">
          <b-form-input></b-form-input>
        </b-input-group>
      </div>
      <div class="col-lg-7">
        <b-input-group prepend="Something with dropdown">
          <b-form-input></b-form-input>
          <b-dropdown text="Dropdown" variant="outline-secondary" slot="append">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
        </b-input-group>
      </div>
      <div class="col-lg-7">
        <b-input-group prepend="Something else">
          <b-form-input></b-form-input>
        </b-input-group>
      </div>
      <div class="col-lg-7">
        <b-input-group prepend="Something">
          <b-form-input></b-form-input>
        </b-input-group>
      </div>
      <div class="col-lg-7">
        <b-form-group label="Radio buttons example">
          <b-form-radio-group plain>
            <b-form-radio value="first">First</b-form-radio>
            <b-form-radio value="second">Second</b-form-radio>
            <b-form-radio value="third" disabled>Disabled</b-form-radio>
            <b-form-radio value="fourth">Fourth</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="col-lg-7">
        <b-form-group label="Stacked radio buttons example">
          <b-form-radio-group plain stacked>
            <b-form-radio value="first">First</b-form-radio>
            <b-form-radio value="second">Second</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="col-lg-7">
        <b-form-group label="Inline checkboxes (default)">
          <b-form-checkbox-group plain>
            <b-form-checkbox value="first">First</b-form-checkbox>
            <b-form-checkbox value="second">Second</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="col-lg-7">
        <b-form-group label="Stacked  checkboxes">
          <b-form-checkbox-group stacked plain>
            <b-form-checkbox value="first">Radio</b-form-checkbox>
            <b-form-checkbox value="second">Second</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userID: {
      type: String,
      required: true,
    },
  },

  watch: {
    userID: {
      immediate: true,
      handler () {
        this.fetchUsers()
      },
    },
  },

  data () {
    return {
      user: null,
    }
  },

  methods: {
    fetchUsers () {
      this.$system.userRead({ userID: this.userID }).then(u => {
        this.user = u
      })
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

.settings {
  h2 {
    padding-top: 15px;
  }
  .list-settings {
    max-height: calc(100vh - 110px);
    overflow: scroll;
  }
}

</style>
