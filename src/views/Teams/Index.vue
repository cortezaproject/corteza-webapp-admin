<template>
  <section id="teams">
    <div class="row">
      <div class="col-sm-10">
        <h1 class="header-title">Teams</h1>
        <div class="row admin-table-header">
          <div class="col-sm-4">
            <div class="header-row">
              7 Members – <a href="#" class="header-link">Prune</a>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="header-row">
              <div class="float-right header-row-search">
                <form onsubmit="alert('search action');return false;">
                  <input class="search-input" type="text" placeholder="Search"/>
                  <button class="search-button" type="submit">
                    <img src="../../assets/images/search.png" alt="Search" title="Search" />
                  </button>
                </form>
              </div>
              <div class="float-right header-row-role">
                <div class="float-right">
                  <form onsubmit="alert('search action');return false;">
                    <select class="custom-select">
                      <option selected>@everyone</option>
                      <option value="1">@other1</option>
                      <option value="2">@other2</option>
                      <option value="3">@other3</option>
                    </select>
                  </form>
                </div>
                <div class="float-right header-role-text" >
                  Display role:
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table admin-table table-hover">
          <tbody>
            <tr>
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">HeadRoom</a>
                <br>
                @Headroom#1234
              </td>
              <td class="table-channels">
                <ul>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @monotek</a>
                  </li>
                  <li>
                    <a href="#" class="table-add-channel btn" onclick="alert('add channel');return false;">+</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">Bot</a>
                <span class="table-detail-label">bot</span>
                <br>
                @bot#1234
              </td>
              <td class="table-channels">
                <ul>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @monotek</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test-test</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test-test-test</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test-test-test-test</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test-test-test-test-test</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @test-test-test-test-test-test</a>
                  </li>
                  <li>
                    <a href="#" class="table-add-channel btn" onclick="alert('add channel');return false;">+</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">titpetric</a>
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <br>
                @titpetric#1303
              </td>
              <td class="table-channels">
                <ul>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @monotek</a>
                  </li>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @errorhub</a>
                  </li>
                  <li>
                    <a href="#" class="table-add-channel btn" onclick="alert('add channel');return false;">+</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">I'm a bot with multiple icons and a very very very very long name!</a>
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <img class="table-details-icon" src="../../assets/images/icon-crown.png" />
                <span class="table-detail-label">test</span>
                <span class="table-detail-label yellow">one</span>
                <span class="table-detail-label red">another</span>
                <span class="table-detail-label green">and another</span>
                <span class="table-detail-label lime">test </span>
                <span class="table-detail-label grey">and one with a long name</span>
                <span class="table-detail-label cream">cream coloured one</span>
                <span class="table-detail-label white">and a white one</span>
                <br>
                @botbotbot#1234
              </td>
              <td class="table-channels">
                <ul>
                  <li>
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span> @monotek</a>
                  </li>
                  <li>
                    <a href="#" class="table-add-channel btn" onclick="alert('add channel');return false;">+</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-2">
        <div class="close-block">
          <button class="btn big-close-button" onclick="alert('close');"></button>
          <br>
          ESC
        </div>
      </div>
    </div>

    <!-- HERE SOME OTHER BITS -->

    <hr>
    <h1>Permissions</h1>

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
