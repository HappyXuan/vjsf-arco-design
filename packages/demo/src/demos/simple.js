export default {
  name: 'Simple',
  schema: {
    description: 'A Simple for example',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck',
        title: 'firstname',
        minLength: 10,
      },
      lastName: {
        type: 'string',
        title: 'lastname',
      },
      telephone: {
        type: 'string',
        title: 'telephone',
        minLength: 10,
      },
      staticArray: {
        type: 'array',
        items: [
          {
            type: 'string',
            title: 'staticArray',
            minLength: 10,
          },
          {
            type: 'number',
            title: 'staticArray',
          },
        ],
      },
      singleTypeArray: {
        type: 'array',
        title: 'singleTypeArray',
        items: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              default: 'Chuck',
              title: 'firstName',
            },
            lastName: {
              type: 'string',
              title: 'lastName',
            },
          },
        },
      },
      multiSelectArray: {
        type: 'array',
        title: 'multiSelectArray',
        items: {
          type: 'string',
          enum: ['123', '345', '789'],
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
      multiSelectArray: {
        multiple: true,
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: '75',
    bio: 'aaa',
    password: 'bbb',
    singleTypeArray: [
      {
        firstName: 'Chuck',
        lastName: 'Norris',
      },
    ],
  },
}
