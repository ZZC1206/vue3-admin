<template>
  <el-button type="primary">
    添加一级分类
  </el-button>
  <hr class="spacing-hr">
  <el-row>
    <el-col :span="12">
      <el-tree
        :data="treeData.data"
        :props="treeData.defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <template #default="{ node }">
          <!-- <template #default="{ node,data }"> -->
          <el-col class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="info"
                plain
              >添加子菜单</el-button>
              <el-button
                type="success"
                plain
              >编辑</el-button>
              <el-button
                type="danger"
                plain
              >删除</el-button>
            </span>
          </el-col>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="12">
      <div class="input-container">
        <h4 class="column">
          分类名称
        </h4>
        <el-form>
          <el-form-item
            label="父级分类"
            class="flex-center"
          >
            <el-input
              placeholder="请输入"
              size="large"
            />
          </el-form-item>
          <el-form-item
            label="子级分类"
            class="flex-center"
          >
            <el-input
              placeholder="请输入"
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="el-button-block"
              size="large"
            >
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

defineOptions({
  name: 'Category'
})

interface Tree {
  label: string
  children?: Tree[]
}

const treeData = reactive({
  data: [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            {
              label: 'Level three 1-1-1'
            }
          ]
        }
      ]
    },
    {
      label: 'Level one 2',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1'
            }
          ]
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1'
            }
          ]
        }
      ]
    },
    {
      label: 'Level one 3',
      children: [
        {
          label: 'Level two 3-1',
          children: [
            {
              label: 'Level three 3-1-1'
            }
          ]
        },
        {
          label: 'Level two 3-2',
          children: [
            {
              label: 'Level three 3-2-1'
            }
          ]
        }
      ]
    }
  ],
  defaultProps: {
    children: 'children',
    label: 'label'
  }
})

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

</script>

<style lang="scss" scoped>
.spacing-hr {
  border: none;
  border-top: 1px solid #e9e9e9;
  margin: 30px 0;
}

.custom-tree-node {
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 8px 8px 8px 0px;
}

:deep(span.el-tree-node__label) {
  width: 100%;
}

:deep(.el-tree-node__content) {
  height: auto;
}

.column {
  height: 44px;
  padding: 0 20px;
  margin: 0 0 30px 0;
  line-height: 44px;
  border-radius: 6px;
  background-color: #f3f3f3;
}
.input-container{
  width: 60%;
  margin: 0 auto;
}
</style>
