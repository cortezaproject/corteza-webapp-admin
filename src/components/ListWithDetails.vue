<template>
  <section>
    <header v-if="title">
      <h2 class="header-title">
        {{ title }}

        <b-button-group class="toolbar">
          <permissions-button
            v-if="permissionsResourceType"
            :resource="permissionsResourceType"
          >
            {{ permissionsButtonLabel }}
          </permissions-button>

          <b-button
            v-if="createButtonLabel"
            class="ml-1 create-button"
            @click.prevent="$emit('create')"
          >
            {{ createButtonLabel }}
          </b-button>
        </b-button-group>
      </h2>
    </header>
    <main>
      <aside>
        <div>
          <slot />
        </div>
      </aside>
      <transition name="slide">
        <router-view
          :key="$route.fullPath"
          class="details"
          v-on="$listeners"
        />
      </transition>
    </main>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },

    createButtonLabel: {
      type: String,
      required: false,
      default: '',
    },

    permissionsButtonLabel: {
      type: String,
      default: '',
    },

    permissionsResourceType: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;

  header {
    flex: 1;

    .toolbar {
      float: right;
    }
  }

  main {
    flex: 1;

    display: flex;
    flex-direction: row;

    aside {
      flex: 1;
      max-width: 225px;
      z-index: 1;
      background: $white;
      border-right: 2px solid $light;
      padding-top: 40px;

      & > div {
        height: calc(100vh - 100px);
        overflow-y: auto;
      }
    }

    .details {
      flex: 1;
      padding: 20px;
      overflow: auto;
      height: calc( 100vh - 80px );
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
