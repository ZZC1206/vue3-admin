<template>
  <el-form
    label-width="150px"
    size="large"
    class="form-container"
  >
    <el-form-item
      label="信息类别："
      class="flex-center"
    >
      <el-select v-model="data.category">
        <el-option
          v-for="item in data.category_opacity"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="信息标题："
      class="flex-center"
    >
      <el-input
        v-model="data.title"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item
      label="缩略图："
      class="flex-center"
    >
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="data.imageUrl"
          :src="data.imageUrl"
          class="avatar"
        >
        <el-icon
          v-else
          class="avatar-uploader-icon"
        >
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="发布日期："
      class="flex-center"
    >
      <el-date-picker
        v-model="data.date"
        type="datetime"
        placeholder="选择日期时间"
      />
    </el-form-item>
    <el-form-item
      label="内容："
      class="flex-center"
    >
      <div id="editor" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="el-button-block"
      >
        确定
      </el-button>
    </el-form-item>
  </el-form>
  <!-- <div ref="ed"></div> -->
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import WangEditor from 'wangeditor'
defineOptions({
  name: 'Detailed'
})

const data = reactive({
  imageUrl: '',
  category: '',
  title: '',
  date: '',
  category_opacity: [
    { label: '人工智能', value: 0 },
    { label: '技术', value: 1 }
  ]
})

const handleAvatarSuccess = () => { }

const beforeAvatarUpload = () => { }

const editor = ref<InstanceType<typeof WangEditor> | null>(null)
// let editorInstance = null
onMounted(() => {
  initEditor()
})

/** 初始化富文本编辑器 */
const initEditor = () => {
  editor.value = new WangEditor('#editor')
  // 配置 onchange 回调函数
  editor.value.config.onchange = () => {
    console.log('初始化富文本编辑器')
  }
  editor.value.config.zIndex = 500
  editor.value.config.placeholder = '请输入内容...'
  editor.value.create()
  // editor.value.txt.html(props.modelValue) // 注意：必须在 create 之后
}

// const ed = ref<HTMLElement>()
// const initEditor2 = () => {
//   const editorInstance = new WangEditor(ed.value)
//   Object.assign(editorInstance.config, {
//     onchange () {
//       console.log('初始化')
//     }
//   })
//   editorInstance.create()
// }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (editor.value == null) return
  editor.value.destroy()
})
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 150px;
  width: 150px;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 30px;
  color: #d9d9d9;
}

:deep(.avatar-uploader .el-upload:hover) {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}

.form-container {
  max-width: 1165px;
}
</style>
