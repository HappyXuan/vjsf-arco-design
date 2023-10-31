<script setup>
import {inject, nextTick, onMounted, ref} from "vue";

const props = defineProps({
  directory: {
    type: Boolean,
    default: false
  },
  single: {
    type: Boolean,
    default: false
  },
  attrs: {
    type: Object,
    default() {
      return {}
    }
  }
})
const btn = ref(null)
const uploader = inject('uploader').proxy.uploader
const support = uploader.support;

onMounted(() => {
  console.log(props.single)
  nextTick(() => {
    uploader.assignBrowse(btn.value, props.directory, props.single, props.attrs);
  })
})
</script>

<template>
  <div class='uploader-btn-container' ref='btn' v-show='support'>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.uploader-btn-container {
  display: inline;
  margin-right: 10px;
}
</style>
