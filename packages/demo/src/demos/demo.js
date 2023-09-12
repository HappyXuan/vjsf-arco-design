import { ref } from 'vue'

export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        title: '用户名',
        default: 'Liu.Jun',
        minLength: 10,
        'ui:options': {
          'allow-clear': true,
        },
        'err:required': '必须输入Last Name111',
        'err:minLength': '签名最小长度10个字符串',
      },
      age: {
        type: 'number',
        title: '年龄',
        'err:required': '必须输入Last Name',
      },
      bio: {
        type: 'string',
        title: '签名',
        minLength: 10,
        default: '知道的越多、就知道的越少',
      },
      select: {
        type: 'boolean',
        title: 'select box',
        description: 'This is the select-description',
      },
      time: {
        title: '时间选择',
        type: 'string',
        format: 'time',
      },
      done: {
        type: 'boolean',
        title: 'Done',
        default: false,
      },
      date: {
        title: '日期',
        type: 'string',
        format: 'date',
      },
      dateTime: {
        title: '日期时间',
        type: 'string',
        format: 'date-time',
      },
      radio: {
        type: 'boolean',
        title: 'radio buttons',
        description: 'This is the radio-description',
      },
      multipleChoicesList: {
        type: 'array',
        title: 'A multiple choices list',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'fuzz', 'qux'],
        },
        uniqueItems: true,
      },
      slider: {
        type: 'number',
        title: 'slider',
      },
      cascader: {
        type: 'string',
        title: 'cascader',
        format: 'cascader',
        enum: [
          JSON.stringify({
            value: 'beijing',
            label: 'Beijing',
          }),
        ],
        enumNames: ['Beijing'],
      },
      inputTag: {
        type: 'array',
        title: 'inputTag',
        items: {
          type: 'string',
        },
        'ui:widget': 'InputTagWidget',
      },
      textarea: {
        type: 'string',
        title: 'textarea',
        'ui:widget': 'TextareaWidget',
      },
      transfer: {
        type: 'array',
        title: 'transfer',
        items: {
          type: 'string',
        },
        'ui:widget': 'TransferWidget',
        'ui:options': {
          data: [
            {
              value: 'option1',
              label: 'option1',
            },
          ],
        },
      },
      treeSelect: {
        type: 'string',
        title: 'treeSelect',
        'ui:widget': 'TreeSelectWidget',
        'ui:options': {
          data: [
            {
              key: 'node1',
              title: 'Trunk',
              disabled: true,
              children: [
                {
                  key: 'node2',
                  title: 'Leaf',
                },
              ],
            },
            {
              key: 'node3',
              title: 'Trunk2',
              children: [
                {
                  key: 'node4',
                  title: 'Leaf',
                },
                {
                  key: 'node5',
                  title: 'Leaf',
                },
              ],
            },
          ],
        },
      },
    },
  },
  uiSchema: {
    bio: {
      'ui:options': {
        placeholder: '请输入你的签名',
        type: 'textarea',
        rows: 1,
      },
    },
    select: {
      'ui:widget': 'SelectWidget',
    },
    radio: {
      'ui:widget': 'RadioWidget',
    },
    multipleChoicesList: {
      'ui:widget': 'CheckboxesWidget',
    },
    slider: {
      'ui:widget': 'SliderWidget',
    },
    cascader: {
      enumOptions: [
        {
          value: 'beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'ChaoYang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
              children: [
                {
                  value: 'jinrongjie',
                  label: 'Jinrongjie',
                },
                {
                  value: 'tianqiao',
                  label: 'Tianqiao',
                },
              ],
            },
          ],
        },
        {
          value: 'shanghai',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  },
  default: ref({}),
}
