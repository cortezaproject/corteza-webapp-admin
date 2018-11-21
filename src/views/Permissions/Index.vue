<template>
  <section id="teams">
    <h1>Permissions</h1>

    {{teams}}

    <p v-if="error">{{error}}</p>

    <div class="row">
      <div class="col-sm-10">
        <div class="row admin-table-header">
          <div class="col-sm-4">
            <div class="header-row">
              <h2 class="float-left header-subtitle">
                Roles / Members
              </h2>
              <div class="float-right">
                <button class="btn small-open-button" onclick="alert('close');"></button>
              </div>
            </div>
            <div class="list-links">
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
              </ul>
            </div>
          </div>
          <div class="col-sm-8">
            <h2 class="header-row header-subtitle">
              General permissions
            </h2>
            <table class="table admin-table table-hover">
              <tbody>
                <tr>
                  <td class="table-details">
                    <a href="#">Create instant invite</a>
                    <br>
                    Here some extra text
                  </td>
                  <td class="table-column-short">
                    <div class="btn-group" role="group">
                      <button class="btn btn-deny btn-selected"></button>
                      <button class="btn btn-unset"></button>
                      <button class="btn btn-grant"></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="table-details">
                    <a href="#">A long title for a general permission with no extra text.</a>
                    <br>
                  </td>
                  <td class="table-column-short">
                    <div class="btn-group" role="group">
                      <button class="btn btn-deny"></button>
                      <button class="btn btn-unset btn-selected"></button>
                      <button class="btn btn-grant"></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="table-details">
                    <a href="#">Another permission</a>
                    <br>
                    Here some extra text, but now with a very long text, saying what this option does and why you should grant or not grant access to certain roles.
                  </td>
                  <td class="table-column-short">
                    <div class="btn-group" role="group">
                      <button class="btn btn-deny"></button>
                      <button class="btn btn-unset"></button>
                      <button class="btn btn-grant btn-selected"></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="table-details">
                    <a href="#">And onther one</a>
                    <br>
                    This one has none selected.
                  </td>
                  <td class="table-column-short">
                    <div class="btn-group" role="group">
                      <button class="btn btn-deny"></button>
                      <button class="btn btn-unset"></button>
                      <button class="btn btn-grant"></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="close-block">
          <button class="btn big-close-button" onclick="alert('close');"></button>
          <br>
          ESC
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
}
</script>
