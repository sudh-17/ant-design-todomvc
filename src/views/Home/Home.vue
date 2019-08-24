<template>
  <div class="container">
    <a-card class="panel">
      <header>
        <a-input
          @keyup.enter="addItem"
          class="newtodo"
          placeholder="What needs to be completed?"
          v-model="newtodo"
          size="large"
          autoFocus
        >
          <!-- <a-icon v-if="newtodo !== null && newtodo.trim() !== ''" slot="suffix" type="close-circle" @click="() => {}" /> -->
        </a-input>
      </header>
      <section v-if="list.length > 0">
        <a-list itemLayout="horizontal" :dataSource="todos">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a slot="actions">
              <a-icon type="edit" @click="onEditing(item.id, item.title)" />
            </a>
            <a slot="actions">
              <a-icon type="delete" style="color: rgb(216, 0, 0)" @click="delItem(item.id)" />
            </a>
              <a-icon
                class="toggle"
                :type="item.completed? 'smile': 'frown'"
                :style="{color: item.completed ? 'rgb(24, 160, 24)': '#000'}"
                @click="onCheck(item.id, !item.completed)"
              />
            <div class="todo-content">
              <label v-if="!(editingId === item.id)" class="con" :class="{completed: item.completed}">{{item.title}}</label>
              <input
                type="text"
                v-if="editingId === item.id"
                :data-id="item.id"
                class="edit"
                :value="item.title"
                size="large"
                @blur="(e) => onUpdate(item.id, e.target.value)"
                @keyup.enter="(e) => onUpdate(item.id, e.target.value)"
              />
            </div>
          </a-list-item>
        </a-list>
      </section>
      <footer class="toolbar" v-if="list.length > 0">
        <span class="todo-count">
          <strong>{{ unCompletedCount }}</strong>
          {{ unCompletedCount > 1 ? 'items left': 'item left' }}
        </span>
        <a-radio-group :value="filter" buttonStyle="solid">
          <a-radio-button @click="onFilt('all')" value="all">All</a-radio-button>
          <a-radio-button @click="onFilt('active')" value="active">Active</a-radio-button>
          <a-radio-button @click="onFilt('completed')" value="completed">Completed</a-radio-button>
        </a-radio-group>
        <div style="min-width: 109px;">
          <a
            href="javascript:;"
            v-if="completedCount > 0"
            class="clear-completed"
            @click="clearCompleted"
          >Clear completed</a>
        </div>
      </footer>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
  completedAll,
  clearCompleted
} from '../../api/todo.js'

export default {
  name: 'home',
  data() {
    return {
      list: [],
      newtodo: '',
      editingId: null
    }
  },
  created() {
    getAll().then(res => {
      this.list = res.data
    })
  },
  methods: {
    // eslint-disable-next-line
    onEditing(id, title) {
      this.editingId = id
      this.$nextTick(() => {
        let edit = document.querySelector(`[data-id="${ id }"]`)
        edit.focus()
      })
    },
    // eslint-disable-next-line
    addItem(e) {
      if (this.newtodo !== null && this.newtodo.trim() !== '') {
        addTodo({ title: this.newtodo }).then(res => {
          if (res.status == 200) {
            this.list.push(res.data)
            this.newtodo = ''
          }
        })
      }
    },
    delItem(id) {
      deleteTodo(id).then(res => {
        if (res.status == 200) {
          let removeId = res.data
          let index = this.list.findIndex(item => item.id === removeId)
          this.list.splice(index, 1)
        }
      })
    },
    onCheck(id, value) {
      updateTodo({
        id: id,
        completed: value
      }).then(res => {
        if (res.status === 200) {
          let index = this.list.findIndex(item => item.id === id)
          this.list[index].completed = value
          this.list = JSON.parse(JSON.stringify(this.list))
        }
      })
    },
    onUpdate(id, value) {
      this.editingId = null
      if (value.trim() === '') {
        return
      }
      updateTodo({
        id: id,
        title: value
      }).then(res => {
        if (res.status === 200) {
          let index = this.list.findIndex(item => item.id === id)
          this.list[index].title = value
          this.list = JSON.parse(JSON.stringify(this.list))
        }
      })
    },
    onCheckAll(e) {
      let value = e.target.checked
      completedAll(value).then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    },
    clearCompleted() {
      clearCompleted().then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    },
    onFilt(value) {
      if (value === 'completed') {
        this.$store.commit('SET_FILTER_TYPE', 'completed')
      } else if (value === 'active') {
        this.$store.commit('SET_FILTER_TYPE', 'active')
      } else {
        this.$store.commit('SET_FILTER_TYPE', 'all')
      }
    }
  },
  computed: {
    ...mapState({
      filter: state => state.app.filter
    }),
    todos() {
      if (this.filter === 'active') {
        return JSON.parse(
          JSON.stringify(this.list.filter(item => item.completed === false))
        )
      } else if (this.filter === 'completed') {
        return JSON.parse(
          JSON.stringify(this.list.filter(item => item.completed === true))
        )
      } else {
        return JSON.parse(JSON.stringify(this.list))
      }
    },
    unCompletedCount() {
      let count = 0
      this.list.forEach(item => {
        if (!item.completed) {
          count++
        }
      })
      return count
    },
    completedCount() {
      return this.list.filter(item => item.completed === true).length
    },
    isAllChecked() {
      return this.list.findIndex(item => item.completed === false) === -1
    }
  }
}
</script>

<style lang="less">
@import url('../../css/global.css');

.container {
  // .ant-input-affix-wrapper .ant-input {
  //   // height: 49px;
  //   // font-size: 29px;
  //   &::-webkit-input-placeholder {
  //     font-style: italic;
  //   }
  //   &::-moz-placeholder {
  //     font-style: italic;
  //   }
  //   &::input-placeholder {
  //     font-style: italic;
  //   }
  // }
}
</style>
<style lang="less" scoped>
.panel {
  width: 600px;
  position: absolute;
  top: 130px;
  left: 50%;
  margin-left: -300px;
  header {
    height: 40px;
    // border-bottom: 1px solid #ddd;
    .newtodo {
      font-size: 25px;
    }
  }
  section {
    border-top: 1px solid #ddd;
    margin-top: 12px;
      .toggle {
        font-size: 22px;
        font-size: 22px;
        vertical-align: middle;
        height: 100%;
      }
    .todo-content {
      position: relative;
      min-height: 35px;
      .state {
        font-size: 22px;
      }
      .con {
        padding-left: 20px;
        font-size: 22px;
        color: #000;
        max-width: 428px;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .completed {
        text-decoration: line-through;
        color: rgb(124, 124, 124);
      }
      .edit {
        &:hover {
          border-color: #40a9ff;
          border-right-width: 1px !important;
        }
        position: absolute;
        left: 8px;
        right: 0;
        top: -3px;
        width: 448px;
        height: 40px;
        font-size: 16px;
        font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont,
          'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
          'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
        font-variant: tabular-nums;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0 10px;
        list-style: none;
        font-size: 22px;
        color: rgba(0, 0, 0, 0.65);
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
      }
    }
  }
  footer {
    padding-top: 18px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    .todo-count {
      padding-right: 20px;
    }
  }
}
</style>