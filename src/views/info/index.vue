<template>
  <el-row>
    <el-col :span="18">
      <el-form
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="类别">
          <el-select
            v-model="typeData.categroy"
            placeholder="请选择"
            class="width-160"
          >
            <el-option
              v-for="item in typeData.categroy_options"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-select
            placeholder="请选择"
            class="width-100"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入关键字"
            class="width-180"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-button
        type="success"
        class="pull-right"
      >
        新增
      </el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    @selection-change="handlerSelectionChange"
  >
    <!-- 复选框 -->
    <el-table-column
      type="selection"
      width="40"
    />
    <el-table-column
      prop="name"
      label="标题"
      width="500"
    />
    <el-table-column
      prop="address"
      label="类别"
      width="180"
    />
    <el-table-column
      prop="date"
      label="日期"
      width="180"
    />
    <el-table-column
      prop="address"
      label="操作"
    >
      <template #default="scope">
        <el-button
          type="danger"
          size="small"
        >
          编辑
        </el-button>
        <el-button
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col
      :span="6"
      class="flex-center"
    >
      <el-button
        type="danger"
        plain
      >
        批量删除
      </el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination
        class="pull-right height-50 page"
        background
        :current-page="currenPage"
        :page-size="10"
        :total="100"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="prevPage"
        @next-click="nextPage"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

defineOptions({
  name: 'Info'
})

const typeData = reactive({
  categroy: 0,
  categroy_options: [
    { label: '人工智能', value: 0 },
    { label: '技术', value: 1 }
  ]
})

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

/** 删除按钮 */
const deleteRow = (item: any) => { console.log(item) }

/** 多选事件 */
const handlerSelectionChange = (val: any) => {
  console.log(val)
}

const currenPage = ref<number>(1)
/** 每页条数事件 */
const handleSizeChange = (val: any) => { console.log(val) }
/** 当前页事件 */
const handleCurrentChange = (val: any) => {
  console.log(val)
  currenPage.value = val
}
/** 上一页 */
const prevPage = () => {
  currenPage.value--
  console.log('上一页')
}
/** 下一页 */
const nextPage = () => {
  console.log('下一页')
  currenPage.value++
}

</script>

<style lang="scss" scoped>
.width-180 {
  width: 180px;
}

.width-160 {
  width: 160px;
}

.width-100 {
  width: 100px;
}
.height-50{
  height: 50px;
}

:deep(.page.el-pagination.is-background .el-pager li:not(.is-disabled).is-active){
  background-color:var(--el-color-white);
  color: var(--el-color-primary) !important;
  font-weight: 700;
}
</style>
