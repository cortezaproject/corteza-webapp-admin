<template>
  <transition-group name="list" tag="tbody">
    <tr key="title" v-if="permissions.length > 0">
      <th colspan="3">{{ title }} ({{ permissions.length }})</th>
    </tr>
    <permission v-for="p in permissions"
                :key="p.resource +  p.operation"
                v-bind="p"
                :value.sync="p.value"
                v-on="$listeners"></permission>
  </transition-group>
</template>

<script>
import Permission from '@/components/Permission'

export default {
  components: {
    Permission,
  },

  props: {
    permissions: {
      type: Array,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';

th {
  color: $appgrey;
  font-size: 20px;
  padding: 10px 0px;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 200ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

</style>
