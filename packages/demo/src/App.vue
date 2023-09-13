<script setup lang="ts">
import demos from './demos'
import {getCurrentInstance, reactive, ref, watchEffect} from 'vue'
import './style/baseForm.less'
import CodeEditor from './components/CodeEditor.vue'
import VueForm from '@vjsf-arco-design/theme'
import DivisionDetail from './modal/division/instance.js'

const instance = getCurrentInstance();
const demoList = ref(demos)
const selected = ref(0)
const demo = reactive({
  schema: null,
  data: {},
  uiSchema: {},
  schemaCode: '',
  dataCode: '',
  uiSchemaCode: '',
  customValidate: undefined,
})
const toJson = (data: any) => JSON.stringify(data, null, 2)
watchEffect(() => {
  const index = selected.value
  const d: any = demos[index]
  demo.schema = d.schema
  demo.data = d.default
  demo.uiSchema = d.uiSchema
  demo.schemaCode = toJson(d.schema)
  demo.dataCode = toJson(d.default.value)
  demo.uiSchemaCode = toJson(d.uiSchema)
  demo.customValidate = d.customValidate
})

const handleChange = (v: any) => {
  demo.data = v
  demo.dataCode = toJson(v)
}

function handleCodeChange(
  field: 'schema' | 'data' | 'uiSchema',
  value: string
) {
  try {
    const json = JSON.parse(value)
    ;(demo as any)[field] = json(demo as any)[`${field}Code`] = value
  } catch (err) {
    // something
  }
}

const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
const handleDataChange = (v: string) => handleCodeChange('data', v)
const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

const vueFormRef = ref()
const handleValidate = async () => {
  console.log(await vueFormRef.value.$$uiFormRef.validate())
}

const toEdit = async (div, isDetail = false) => {
  const editedStudent = await DivisionDetail.toEdit(
      div,
      isDetail,
      instance?.appContext
  );
  console.log(editedStudent);
};
</script>

<template>
  <div class="container">
    <div class="menu">
      <h1>Vue3 JsonSchema Form</h1>
      <div>
        <button
          :class="{ menuButton: true, menuSelected: index === selected }"
          v-for="(item, index) in demoList"
          :key="index"
          @click="selected = index"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
    <div class="content">
      <div class="code">
        <CodeEditor
          :code="demo.schemaCode"
          class="codePanel"
          @change="handleSchemaChange"
          title="Schema"
        />
        <div class="uiAndValue">
          <CodeEditor
            :code="demo.uiSchemaCode"
            class="codePanel"
            @change="handleUISchemaChange"
            title="UISchema"
          />
          <CodeEditor
            :code="demo.dataCode"
            class="codePanel"
            @change="handleDataChange"
            title="Value"
          />
        </div>
      </div>
      <div class="form">
        <VueForm
          v-model="demo.data"
          :ui-schema="demo.uiSchema"
          :schema="demo.schema"
          :form-footer="{ show: false }"
          :form-props="{}"
          ref="vueFormRef"
        />
        <a-button type="primary" @click="handleValidate">校验</a-button>
        <a-button type="primary" @click="toEdit" style="margin-left: 10px">弹窗</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1400px;
  margin: 0 auto;

  .menu {
    margin-bottom: 20px;

    .menuButton {
      appearance: none;
      border-width: 0;
      background-color: transparent;
      cursor: pointer;
      display: inline-block;
      padding: 15px;
      border-radius: 5px;
      margin-right: 10px;

      &:hover {
        background: #efefef;
      }
    }

    .menuSelected {
      background-color: #337ab7;
      color: #fff;

      &:hover {
        background-color: #337ab7;
      }
    }
  }

  .content {
    display: flex;

    .code {
      width: 690px;
      flex-shrink: 0;

      .codePanel {
        width: 100%;
        height: 50%;
        min-height: 400px;
        margin-bottom: 20px;
      }

      .uiAndValue {
        display: flex;
        justify-content: space-between;

        & > * {
          width: 46%;
        }
      }
    }

    .form {
      padding: 0 20px;
      flex-grow: 1;
      margin-left: 10px;
    }
  }
}
</style>
