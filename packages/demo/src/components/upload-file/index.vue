<script>
import {nextTick, onMounted, ref, watch, watchEffect} from 'vue'
import {File as UploaderFile} from 'simple-uploader.js'
import UploaderBtn from './components/btn.vue';
import UploaderUnSupport from './components/unsupport.vue'
import UploaderDrop from './components/drop.vue'

export default {
  components: {
    UploaderBtn,
    UploaderUnSupport,
    UploaderDrop,
  },
  props: {
    modelValue: {
      type: Array
    },
    /**
     * 文件校验
     */
    checkFile: {
      type: Function,
      default: (file) => true
    },
    /**
     * 文件上传携带的额外参数
     */
    extraParam: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 需要安装的插件
     */
    showFileList: {
      type: Boolean,
      default: true
    },
    /**
     * 运行上传的文件类型
     */
    btnAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 提示文字
     */
    tip: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const uploaderRef = ref(null);
    let CHUNK_SIZE = 20 * 1024 * 1024
    const options = {
      target: `/fileStorage/upload`, // '//jsonplaceholder.typicode.com/posts/',
      testChunks: true,
      autoStart: true,
      // singleFile: true,
      // 真正上传的时候使用的 HTTP 方法,默认 POST
      uploadMethod: 'post',
      // 分片大小
      chunkSize: CHUNK_SIZE,
      // 并发上传数，默认为 3
      simultaneousUploads: 3,
      checkChunkUploadedByResponse: (chunk, message) => {
        const response = JSON.parse(message)
        chunk.file.remoteFileUrl = response?.data?.url || ''
        return false
      },
      parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
        // 格式化时间
        return parsedTimeRemaining
            .replace(/\syears?/, '年')
            .replace(/\days?/, '天')
            .replace(/\shours?/, '小时')
            .replace(/\sminutes?/, '分钟')
            .replace(/\sseconds?/, '秒')
      },
      processParams: function (params) {
        return {...params, ...props.extraParam}
      }
    }
    const statusText = {
      success: '上传成功',
      error: '上传错误',
      uploading: '正在上传',
      paused: '停止上传',
      waiting: '等待中'
    }
    const filesRef = ref([]);
    const complete = () => {
      emit('update:modelValue', filesRef.value);
    }
    const onFileAdded = (file) => {
      file.fileType = file.getExtension();
      const check = props.checkFile
      const checkResult = check(file);
      if (checkResult) {
        filesRef.value.push(file);
        console.log(filesRef.value)
      }
      return checkResult
    }
    const formatFileSize = (bytes, decimalPoint = 2) => {
      if (bytes === 0) return '0 Bytes'
      let k = 1000,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k))
      return (
          parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
      )
    }
    const showDetail = (props) => {
      let fileName = props.file.name
      let isComplete = props.isComplete
      let formatUpload = formatFileSize(props.uploadedSize, 2)
      let fileSize = `${props.formatedSize}`
      let timeRemaining = !isComplete ? ` 剩余时间:${props.formatedTimeRemaining}` : ''
      let uploaded = !isComplete ? ` 已上传:${formatUpload} / ${fileSize}` : ` 大小:${fileSize}`
      let speed = !isComplete ? ` 速度:${props.formatedAverageSpeed}` : ''
      if (props.error) {
        return `${fileName} \n 上传失败`
      }
      return `<div style="margin-bottom: 10px;">文件名: ${fileName}</div>
              <div style="margin-bottom: 10px;">${speed}</div>
              <div style="margin-bottom: 10px;">${uploaded}</div>
              <div style="margin-bottom: 10px;">${timeRemaining}</div>`
    }
    const percentage = (props) => {
      // if (props.file.completed) return 1
      let progress = Number((props.progress / 100).toFixed(2))
      return progress
    }

    const deleteFile = (props) => {
      const {uniqueIdentifier} = props.file;
      //调用接口
      console.log(uniqueIdentifier)
    }
    const downloadFile = () => {
      console.log('downloadFile')
    }

    onMounted(() => {
      nextTick(() => {
        window.uploader = uploaderRef.value.uploader;
      });
      if (props.modelValue && props.modelValue.length > 0) {
        const moduleValue = [...props.modelValue]
        let files = moduleValue.map(file => {
          const uploaderFile = new UploaderFile(uploaderRef.value.uploader,
              new File([new Uint8Array(0).buffer], file.name), uploaderRef.value.uploader);
          Object.keys(file).forEach(key => {
            uploaderFile[key] = file[key]
          });
          return uploaderFile
        });
        filesRef.value = files
      }
    });

    return {
      uploaderRef,
      options,
      statusText,
      filesRef,
      complete,
      onFileAdded,
      showDetail,
      percentage,
      deleteFile,
      downloadFile
    }
  }
}
</script>
<template>
  <uploader
      :options="options"
      :file-status-text="statusText"
      class="uploader-example"
      ref="uploaderRef"
      @complete="complete"
      @file-added="onFileAdded"
  >
    <uploader-un-support></uploader-un-support>
    <uploader-drop>
      <uploader-btn v-bind="{...btnAttrs}">
        <a-button type="primary">{{ btnAttrs?.btnContent || '选择文件' }}</a-button>
      </uploader-btn>
      <p v-if="tip" class="tip">{{ tip }}</p>
    </uploader-drop>
    <uploader-list v-if="showFileList">
      <a-collapse class="file-list-wrapper" :default-active-key="['1']" expand-icon-position="right">
        <a-collapse-item key="1">
          <template #header>
            文件列表
          </template>
          <div class="file-list">
            <a-list v-if='filesRef.length > 0'>
              <a-list-item v-for='file in filesRef' :key='file.id'>
                <uploader-file :file="file" :list="true" ref="uploaderFileList">
                  <template v-slot="props">
                    <div class="file-list-item">
                      <div class="item-progress">
                        <div v-html="showDetail(props)"></div>
                        <a-progress :percent="percentage(props)"
                                    :color="{'0%': 'rgb(var(--primary-6))','100%': 'rgb(var(--success-6))',}"/>
                      </div>
                      <a-space>
                        <a-button type="primary" status="danger" @click="deleteFile(props)">
                          <template #icon>
                            <icon-delete/>
                          </template>
                        </a-button>
                        <a-button type="primary" v-if="props.file.isComplete()">
                          <template #icon>
                            <icon-cloud-download/>
                          </template>
                        </a-button>
                      </a-space>
                    </div>
                  </template>
                </uploader-file>
              </a-list-item>
            </a-list>
            <a-empty v-else/>
          </div>
        </a-collapse-item>
      </a-collapse>
    </uploader-list>
  </uploader>
</template>

<style scoped lang="less">
.uploader-example {
  width: 100%;
  padding: 15px;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.tip {
  color: var(--color-neutral-6);
  font-size: 12px;
}

.file-list-wrapper {
  margin-top: 10px;

  :deep(.arco-collapse-item-header-title) {
    position: relative;
    padding-left: 10px;

    &::before {
      position: absolute; /* 定位背景横线的位置 */
      top: 3px;
      left: 0;
      width: 3px;
      height: 20px;
      background: rgb(var(--arcoblue-6)); /* 宽和高做出来的背景横线 */
      content: ''; /* CSS伪类用法 */
    }
  }

  .file-list {
    .uploader-file {
      border-bottom: none;
      height: 100%;
      line-height: 100%;

      .file-list-item {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        .item-progress {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .item-btn {
          width: 10%
        }
      }
    }
  }
}

</style>
