/**
 * 文件名: WIDGET_MAP
 * 作者: xuan
 * 创建时间: 2023/9/5 19:45
 * 描述：WIDGET_MAP
 * 更新事件: 2023/9/5 19:45
 */
import widgetComponents from './index'

const {
  InputWidget,
  InputNumberWidget,
  SwitchWidget,
  TimePickerWidget,
  DatePickerWidget,
  DateTimePickerWidget,
  SelectWidget,
  RadioWidget,
  CheckboxesWidget,
  CascaderWidget,
} = widgetComponents

export default {
  types: {
    boolean: SwitchWidget,
    string: InputWidget,
    number: InputNumberWidget,
    integer: InputNumberWidget,
  },
  formats: {
    time: TimePickerWidget,
    date: DatePickerWidget, // 2018-11-13
    'date-time': DateTimePickerWidget, // 2018-11-13 20:20:39+00:00
    cascader: CascaderWidget,
  },
  common: {
    select: SelectWidget,
    radioGroup: RadioWidget,
    checkboxGroup: CheckboxesWidget,
  },
  widgetComponents,
}
