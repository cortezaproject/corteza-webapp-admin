<template>
  <section id="teams">
    <header>
      <h2>Manage Permissions</h2>
    </header>
    <p v-if="error">{{error}}</p>
    <div class="content row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-lg-2">
            <div class="list-teams">
              <h2 class="header-row header-subtitle">
                List of teams
              </h2>
              <ul>
                <li>
                  <a href="">@monotek</a>
                </li>
                <li>
                  <a href="">@monotek_dev</a>
                </li>
                <li>
                  <a href="">@one_with_a_very_long_name</a>
                </li>

                <li>
                  <a href="">@one-with-a-very-long-name</a>
                </li>
                <li>
                  <a class="selected" href="">@I-am-selected</a>
                </li>
                <li>
                  <a href="">@everyone</a>
                </li>
                <li>
                  <a href="">@monotek</a>
                </li>
                <li>
                  <a href="">@monotek_dev</a>
                </li>
                <li>
                  <a href="">@one_with_a_very_long_name</a>
                </li>

                <li>
                  <a href="">@one-with-a-very-long-name</a>
                </li>
                <li>
                  <a class="" href="">@I-am-selected</a>
                </li>
                <li>
                  <a href="">@everyone</a>
                </li>
                <li>
                  <a href="">@monotek</a>
                </li>
                <li>
                  <a href="">@monotek_dev</a>
                </li>
                <li>
                  <a href="">@one_with_a_very_long_name</a>
                </li>

                <li>
                  <a href="">@one-with-a-very-long-name</a>
                </li>
                <li>
                  <a class="" href="">@I-am-selected</a>
                </li>
                <li>
                  <a href="">@everyone</a>
                </li>
                <li>
                  <a href="">@monotek</a>
                </li>
                <li>
                  <a href="">@monotek_dev</a>
                </li>
                <li>
                  <a href="">@one_with_a_very_long_name</a>
                </li>

                <li>
                  <a href="">@one-with-a-very-long-name</a>
                </li>
                <li>
                  <a class="" href="">@I-am-selected</a>
                </li>
                <li>
                  <a href="">@everyone</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-10">
            <div class="list-permission">
              <h2 class="header-subtitle header-row">
                General permissions
              </h2>
              <table class="table table-hover">
                <tbody>
                  <permission
                    title="Title"
                    subtitle="Here some extra text">
                  </permission>
                  <permission
                    title="A long title for a general permission with no extra text.">
                  </permission>
                  <permission
                    title="Title"
                    subtitle="Here some extra text">
                  </permission>
                  <permission
                    title="Title"
                    subtitle="Here some extra text">
                  </permission>
                  <permission
                    title="Another permission"
                    subtitle="Here some extra text">
                  </permission>
                  <permission
                    title="Another permission"
                    subtitle="Here some extra text">
                  </permission>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Permission from '@/components/Permission'

export default {
  data () {
    return {
      error: '',
      teams: [],
    }
  },
  async created () {
    try {
      this.teams = await this.$system.teamList({ query: '' })
    } catch (err) {
      this.error = err.message
    }
  },
  components: {
    Permission,
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/sass/_0.commons.scss';
  @import '@/assets/sass/menu-layer.scss';

.list-teams {
  border-right: 2px solid $appcream;
  h2 {
    padding: 10px 0 0 15px;
  }
  ul {
    height: calc(100vh - 110px);
    overflow: scroll;
  }
}

.list-permission {
  .table {
    max-height: calc(100vh - 110px);
    overflow: scroll;
  }
  h2 {
    padding-top: 10px;
  }
}

</style>
