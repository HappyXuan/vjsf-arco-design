<script setup lang="ts">
  import { ref } from 'vue';
  import VueForm from '@vjsf-arco-design/theme';

  const emit = defineEmits(['save']);
  const showDialog = ref(false);
  const division = ref({});
  const isForDetail = ref(false);

  const vueFormRef = ref();
  const validate = async () => {
    const valid = await vueFormRef.value.$$uiFormRef.validate();
    return valid === undefined;
  };
  async function saveDivision() {
    const valid = await validate();
    if (!valid) return false;
    emit('save', division.value);
    showDialog.value = false;
    return true;
  }

  defineExpose({
    open: (div, isDetail = false) => {
      showDialog.value = true;
      division.value = { ...div };
      isForDetail.value = isDetail;
    },
  });

  const schema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        'type': 'string',
        'err:required': '部门名称必填',
        'title': '部门名称',
      },
      props: {
        type: 'string',
        title: '其他属性',
      },
      remark: {
        'type': 'string',
        'title': '描述',
        'ui:widget': 'TextareaWidget',
      },
    },
  };
</script>

<template>
  <a-modal
    v-model:visible="showDialog"
    append-to-body
    width="600px"
    title="部门信息"
    :on-before-ok="saveDivision"
  >
    <VueForm
      ref="vueFormRef"
      v-model="division"
      :schema="schema"
      :form-footer="{ show: false }"
      :form-props="{ layoutColumn: 1, labelPosition: 'left' }"
    />
  </a-modal>
</template>

<style scoped lang="less"></style>
