import { h, render } from 'vue';
import DivisionDetail from './division-detail.vue';

function toEdit(
  division,
  isDetail,
  appContext
) {
  return new Promise((resolve) => {
    const vnode = h(DivisionDetail, {
      onSave(editDivision) {
        resolve(editDivision);
      },
    });
    vnode.appContext = appContext;

    const container = document.createElement('div');
    // 进行渲染
    render(vnode, container);
    vnode.component?.exposed?.open(division, isDetail);
  });
}

export default {
  toEdit,
};
