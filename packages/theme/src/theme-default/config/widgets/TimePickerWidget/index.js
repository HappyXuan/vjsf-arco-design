/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'TimePickerWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-time-picker'), {
        'value-format': 'HH:mm:ss',
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
