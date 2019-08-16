<template>
  <section class="d-flex flex-column">
    <header v-if="title" class="bg-white d-flex justify-content-between border-bottom shadow-sm p-3 flex-grow-1">
      <h5>
        {{ title }}
      </h5>
      <b-button-group>
        <permissions-button v-if="permissionsResourceType"
                            :resource="permissionsResourceType">{{ permissionsButtonLabel }}</permissions-button>

        <b-button class="ml-1"
                  @click.prevent="$emit('create')"
                  v-if="createButtonLabel">{{ createButtonLabel }}</b-button>
      </b-button-group>
    </header>
    <main class="d-flex flex-row flex-grow-1">
      <aside class="bg-white border-right flex-grow-1 vh-100">
        <div class="vh-100 overflow-auto">
          <slot></slot>
        </div>
      </aside>
      <transition name="slide">
        <router-view class="flex-grow-1"
                     :key="$route.fullPath" v-on="$listeners"></router-view>
      </transition>
    </main>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },

    createButtonLabel: {
      type: String,
      required: false,
    },

    permissionsButtonLabel: {
      type: String,
    },

    permissionsResourceType: {
      type: String,
    },
  },
}
</script>
<style scoped lang="scss">
section {
  main {
    aside {
      max-width: 200px;
      z-index: 1;
    }

    .slide-enter-active {
      transition: all .3s ease;
      opacity: 1;
    }
    .slide-leave-active {
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      opacity: 0;
    }

    .slide-enter {
      transform: translateX(100vw);
    }

    .slide-leave-to {
      transform: translateX(-100vw);
    }
  }
}

</style>
