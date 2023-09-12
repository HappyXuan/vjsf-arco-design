/**
 * Created by Liu.Jun on 2021/2/23 10:21 下午.
 */

import { h } from 'vue'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const baseComponent = {
  name: 'SliderWidget',
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () =>
      h(resolveComponent('a-slider'), {
        ...attrs,
      })
  },
}

export default resolveComponent(baseComponent)
