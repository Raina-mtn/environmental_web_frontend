<template>
  <div class="itable clearfix">
    <el-table
      v-loading="loading"
      :border="border"
      :stripe="stripe"
      :data="tableData"
      :height="height"
      row-key="id"
      v-bind="expandOptions"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      @sort-change="resort"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        fixed
        v-bind="Object.assign({}, defaultColumnConfig, selection)"
      />
      <el-table-column v-if="expand" type="expand">
        <template slot-scope="props">
          <slot name="expand" :data="props" />
        </template>
      </el-table-column>
      <template v-for="(column, index) of tableColumns">
        <el-table-column v-if="column.render" :key="index" v-bind="Object.assign({}, defaultColumnConfig, column)">
          <template slot-scope="scope">
            <extend :render="column.render" :params="scope" />
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" v-bind="Object.assign({},  defaultColumnConfig, column)" />
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="fr"
      :page-size.sync="tableCurrentPagination.pageSize"
      :page-sizes="tableCurrentPagination.pageArray"
      :current-page.sync="tableCurrentPagination.pageIndex"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
    />
  </div>
</template>

<script>
import extend from './extend'
const _pageArray = [10, 20, 50, 100]
export default {
  name: 'BaseTable',
  components: {
    extend
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    defaultColumnConfig: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number,
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    tableHeight: {
      type: Number,
      default: 0
    },
    otherHeight: {
      type: Number,
      default: undefined
    },
    minHeight: {
      type: Number,
      default: 150
    },
    pagination: {
      type: Object,
      default: null
    },
    selection: {
      type: Object,
      default: null
    },
    expandOptions: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableCurrentPagination: {
        pageSize: this.total,
        pageIndex: 1
      },
      height: undefined
    }
  },
  watch: {
    'pagination.pageIndex': function (val, oldVal) {
      this.$set(this.tableCurrentPagination, 'pageIndex', val)
    },
    'pagination.pageSize': function (val, oldVal) {
      this.$set(this.tableCurrentPagination, 'pageSize', val)
    },
    'tableCurrentPagination.pageIndex': function (val, oldVal) {
      this.$emit('handleIndexChange', val)
    },
    tableHeight: function (val, oldVal) {
      this.height = val
    }
  },
  mounted () {
    const newPagination = { ...this.pagination }
    if (this.pagination && !this.pagination.pageSizes) {
      newPagination.pageArray = _pageArray
    }
    this.tableCurrentPagination = JSON.parse(JSON.stringify(newPagination)) || {
      pageSize: this.total,
      pageIndex: 1
    }
    if (this.otherHeight) {
      this.height = window.innerHeight - this.otherHeight > this.minHeight ? window.innerHeight - this.otherHeight : this.minHeight
      window.addEventListener('resize', this.resizeHandler)
    } else if (this.tableHeight) {
      this.height = this.tableHeight
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    handleSizeChange (e) {
      if (this.pagination) {
        this.$emit('handleSizeChange', e)
      }
    },
    handleIndexChange (e) {
      this.$emit('handleIndexChange', e)
    },

    rowClick (row) {
      this.$emit('rowClick', row)
    },
    handleSelectionChange (data) {
      this.$emit('selectionChange', data)
    },
    resort (e) {
      this.$emit('sortChange', e)
    },
    resizeHandler () {
      this.height = window.innerHeight - this.otherHeight > this.minHeight ? window.innerHeight - this.otherHeight : this.minHeight
    }
  }
}
</script>
<style lang="scss" scoped>
.itable {
  .el-pagination {
    float: right;
    margin-top: 20px;
  }
}

</style>
