import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'UploadFileWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('upload-file'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
