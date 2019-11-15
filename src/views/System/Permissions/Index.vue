<template>
  <div>
    <p>{{ $t('permission.managePermissions') }}</p>
    <ul class="menu-layer">
      <li>
        <permissions-button resource="system">
          {{ $t('permission.base.system') }}
        </permissions-button>
      </li>
      <li>
        <permissions-button resource="messaging">
          {{ $t('permission.base.messaging') }}
        </permissions-button>
      </li>
      <li>
        <permissions-button resource="compose">
          {{ $t('permission.base.compose') }}
        </permissions-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      roles: [],
    }
  },
}
</script>
<style scoped lang="scss">
div {
  margin: 10px;
}
</style>
