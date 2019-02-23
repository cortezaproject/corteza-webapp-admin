<template>
  <section>
    <header v-if="title">
      <h2 class="header-title">{{ title }}</h2>
    </header>
    <main>
      <aside>
        <div>
          <slot></slot>
        </div>
      </aside>
      <transition name="slide">
        <router-view class="details" :key="$route.fullPath"></router-view>
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
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';

section {
  display: flex;
  flex-direction: column;

  header {
    flex: 1;
  }

  main {
    flex: 1;

    display: flex;
    flex-direction: row;

    aside {
      flex: 1;
      max-width: 200px;
      z-index: 1;
      background: $appwhite;
      border-right: 2px solid $appcream;
      padding-top: 40px;

      & > div {
        height: calc(100vh - 100px);
        overflow-y: scroll;
      }
    }

    .details {
      flex: 1;
      padding: 20px;
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
