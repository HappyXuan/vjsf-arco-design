import { h, ref, onMounted, defineComponent } from 'vue'
import createVue3Core, { fieldProps, SchemaField } from '@vjsf-arco-design/core'

import i18n from '@lljj/vjsf-utils/i18n'
import * as vueUtils from '@lljj/vjsf-utils/vue3Utils'
import * as formUtils from '@lljj/vjsf-utils/formUtils'
import * as schemaValidate from '@lljj/vjsf-utils/schema/validate'
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState'
import WIDGET_MAP from './config/widgets/WIDGET_MAP.js'

import { modelValueComponent } from './config/utils'
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils'

const globalOptions = {
  WIDGET_MAP,
  COMPONENT_MAP: {
    form: defineComponent({
      inheritAttrs: false,
      setup(props, { attrs, slots }) {
        // 处理 labelPosition 参数和layout之间转换
        const labelPositionMap = {
          top: {
            layout: 'vertical',
          },
          left: {
            layout: 'horizontal',
            labelAlign: 'left',
          },
          right: {
            layout: 'horizontal',
            labelAlign: 'right',
          },
        }

        // 返回当前的 form ref
        const formRef = ref(null)
        if (attrs.setFormRef) {
          onMounted(() => {
            // form组件实例上附加一个 validate 方法
            formRef.value.$$validate = (callBack) => {
              formRef.value
                .validate()
                .then((res) => {
                  callBack(true, res)
                })
                .catch((err) => {
                  callBack(false, err.errorFields)
                })
            }
            attrs.setFormRef(formRef.value)
          })
        }

        return () => {
          const {
            // eslint-disable-next-line no-unused-vars
            setFormRef,
            labelPosition,
            labelWidth,
            model,
            ...otherAttrs
          } = attrs

          if (otherAttrs.inline) {
            Object.assign(otherAttrs, {
              layout: 'inline',
              // labelCol: undefined,
              // wrapperCol: undefined
            })
          }

          return h(
            vueUtils.resolveComponent('a-form'),
            {
              ref: formRef,
              model: model.value,
              ...labelPositionMap[labelPosition || 'top'],
              ...otherAttrs,
              colon: false,
            },
            slots
          )
        }
      },
    }),
    formItem: defineComponent({
      inheritAttrs: false,
      setup(props, { attrs, slots }) {
        const formItemRef = ref(null)
        return () => {
          const { prop, rules, ...originAttrs } = attrs
          const validateTrigger = (rules || []).map((rule) => rule.trigger)
          const field =
            prop && Array.isArray(prop) && !prop.startsWith('__')
              ? prop[0]
              : prop
          const validateRule = rules && rules[0]

          // 判断是否存在帮助信息
          const defaultComponents = slots.default()
          const hasDes = Boolean(
            defaultComponents[0]?.props?.class === 'genFromWidget_des'
          )

          return h(
            vueUtils.resolveComponent('a-form-item'),
            {
              ...originAttrs,
              ref: formItemRef,
              field,
              'validate-trigger': validateTrigger,
              rules: [
                {
                  validator: (value, cb) => {
                    validateRule.validator.apply(this, [value, cb])
                  },
                },
              ],
              name: prop ? prop.split('.') : prop,
            },
            {
              ...slots,
              default: function proxySlotDefault() {
                return slots.default()
              },
            }
          )
        }
      },
    }),
    button: 'a-button',
    popover: defineComponent({
      setup: function setup(props, _ref3) {
        let attrs = _ref3.attrs,
          slots = _ref3.slots
        return function () {
          return h(resolveComponent('a-popover'), attrs, {
            default: slots.reference,
            content: slots.default,
          })
        }
      },
    }),
  },
  HELPERS: {
    // 是否mini显示 description
    isMiniDes(formProps) {
      return (
        formProps &&
        (['left', 'right'].includes(formProps.labelPosition) ||
          formProps.layout === 'horizontal' ||
          formProps.inline === true)
      )
    },
  },
}

const JsonSchemaForm = createVue3Core(globalOptions)

export default JsonSchemaForm

export {
  globalOptions,
  SchemaField,
  getDefaultFormState,
  fieldProps,
  vueUtils,
  formUtils,
  schemaValidate,
  i18n,
  modelValueComponent,
}
