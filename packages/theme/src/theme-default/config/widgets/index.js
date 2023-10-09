import {resolveComponent} from '@lljj/vjsf-utils/vue3Utils'
import SelectWidget from './SelectWidget'
import TimePickerWidget from './TimePickerWidget'
import DatePickerWidget from './DatePickerWidget'
import DateTimePickerWidget from './DateTimePickerWidget'
import RadioWidget from './RadioWidget'
import CheckboxesWidget from './CheckboxesWidget'
import SliderWidget from './SliderWidget'
import CascaderWidget from './CascaderWidget'
import InputTagWidget from './InputTagWidget'
import TextareaWidget from './TextareaWidget'
import TransferWidget from './TransferWidget'
import TreeSelectWidget from './TreeSelectWidget'
import InputPasswordWidget from "./InputPasswordWidget";

const widgetComponents = {
  CheckboxesWidget,
  SelectWidget,
  TimePickerWidget,
  DatePickerWidget,
  DateTimePickerWidget,
  RadioWidget,
  SliderWidget,
  CascaderWidget,
  InputTagWidget,
  TextareaWidget,
  TransferWidget,
  TreeSelectWidget,
  InputPasswordWidget,
  SwitchWidget: resolveComponent('a-switch'),
  InputWidget: resolveComponent('a-input'),
  InputNumberWidget: resolveComponent('a-input-number'),
}

export default widgetComponents
