<template>
  <header
    class="d-flex py-2 px-3 bg-primary text-light align-items-center"
  >
    <h1 class="m-0">
      Corteza Admin &blk14;
    </h1>
    <div
      class="flex-fill text-center"
    >
      <!--
      <b-spinner
        v-if="isLoading"
        variant="light"
        type="grow"
        small
      />
      -->
    </div>

    <div
      class="text-right ml-auto"
    >
      <p class="m-0 d-inline">
        John Doe &blk14;
      </p>
      <a
        href="#"
        class="text-white ml-3 h5"
      >
        <font-awesome-icon
          :icon="['fas', 'power-off']"
        />
      </a>
    </div>
  </header>
</template>
<script>
// import { mapGetters } from 'vuex'

export default {
  // computed: {
  //   ...mapGetters({
  //     isLoading: 'ui/isLoading',
  //   }),
  // },
}
</script>
