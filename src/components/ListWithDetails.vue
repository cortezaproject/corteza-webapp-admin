<template>
  <section id="users">
    <header v-if="title">
      <h2 class="header-title">{{ title }}</h2>
    </header>
    <div class="content row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-lg-2 list">
            <slot></slot>
          </div>
          <transition name="slide">
            <router-view class="col-lg-10 details" :key="$route.fullPath"></router-view>
          </transition>
        </div>
      </div>
    </div>
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

.details {
  border-left: 2px solid $appcream;
}

.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(1000px);
}

</style>
