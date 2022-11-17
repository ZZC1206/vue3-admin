<template>
  <svg
    aria-hidden="true"
    class="svg-class"
    :class="svgClassName"
  >
    <use
      :xlink:href="symbolId"
      :fill="props.color"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  svgClassName: {
    type: String,
    default: ''
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss">
.svg-class {
  width: 1.3em;
  height: 1.3em;
  margin-right: 5px;
}

.is-active {
  .svg-class {
    width: 1.3em;
    height: 1.3em;
    margin-right: 5px;
    fill: #F04E37 !important;
  }
}
</style>
