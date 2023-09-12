<script setup lang="ts">
import {
  ref,
  defineProps,
  shallowRef,
  onMounted,
  onBeforeMount,
  watch,
} from 'vue'
import * as Monaco from 'monaco-editor'

const props = defineProps<{
  code: string
  onChange: (
    value: string,
    event: Monaco.editor.IModelContentChangedEvent
  ) => void
  title: string
}>()
const editorRef = shallowRef()
const containerRef = ref()
let _subscription: Monaco.IDisposable | undefined
let __prevent_trigger_change_event = false

onMounted(() => {
  const editor = (editorRef.value = Monaco.editor.create(containerRef.value, {
    value: props.code,
    language: 'json',
    formatOnPaste: true,
    tabSize: 2,
    minimap: {
      enabled: false,
    },
  }))

  _subscription = editor.onDidChangeModelContent((event) => {
    console.log('--------->', __prevent_trigger_change_event)
    if (!__prevent_trigger_change_event) {
      props.onChange(editor.getValue(), event)
    }
  })
})

onBeforeMount(() => {
  if (_subscription) _subscription.dispose()
})

watch(
  () => props.code,
  (v) => {
    const editor = editorRef.value
    const model = editor.getModel()
    if (v !== model.getValue()) {
      editor.pushUndoStop()
      __prevent_trigger_change_event = true
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: v,
          },
        ]
      )
      editor.pushUndoStop()
      __prevent_trigger_change_event = false
    }
    // if (v !== editorRef.value.getValue()) {
    //   editorRef.value.setValue(v)
    // }
  }
)
</script>

<template>
  <div class="container">
    <div class="title"></div>
    <div class="code" ref="containerRef"></div>
  </div>
</template>

<style lang="less" scoped>
.container {
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  .title {
    background-color: #eee;
    padding: 10px 0 10px 20px;
  }

  .code {
    flex-grow: 1;
  }
}
</style>
