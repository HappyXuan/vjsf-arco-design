<template>
  <div class="uploader-drop" :class="dropClass" ref="drop" v-show="support">
    <slot></slot>
  </div>
</template>

<script>
  import { inject, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'

  const COMPONENT_NAME = 'uploader-drop'

  export default {
    name: COMPONENT_NAME,
    setup () {
      const uploader = inject('uploader').proxy.uploader;
      let drop = ref(null)
      let dropClass = ref('')
      const support = uploader.support
      const onDragEnter = () => {
        dropClass = 'uploader-dragover'
      }
      const onDragLeave = () => {
        dropClass = ''
      }
      const onDrop = () => {
        dropClass = 'uploader-droped'
      }
      onMounted(() => {
        nextTick(() => {
          const dropEle = drop.value
          uploader.assignDrop(dropEle)
          uploader.on('dragenter', onDragEnter)
          uploader.on('dragleave', onDragLeave)
          uploader.on('drop', onDrop)
        })
      })
      onBeforeUnmount(() => {
        const dropEle = drop.value
        uploader.off('dragenter', onDragEnter)
        uploader.off('dragleave', onDragLeave)
        uploader.off('drop', onDrop)
        uploader.unAssignDrop(dropEle)
      })
      return {
        drop,
        dropClass,
        support,
        onDragEnter,
        onDragLeave,
        onDrop
      }
    }
  }
</script>

<style>
  .uploader-drop {
    position: relative;
    padding: 10px;
    color: var(--color-text-1);
    text-align: left;
    background-color: var(--color-fill-1);
    border: 1px dashed var(--color-neutral-3);
    border-radius: var(--border-radius-small);
    transition: all .2s ease;
  }
  .uploader-dragover {
    border: 1px dashed var(--color-neutral-3);
    border-radius: var(--border-radius-small);
    background-color: var(--color-neutral-4);
  }
</style>
