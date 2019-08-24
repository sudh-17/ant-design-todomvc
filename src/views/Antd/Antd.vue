<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        @keyup.enter="addItem"
        class="new-todo"
        placeholder="What needs to be completed?"
        autoFocus
      />
    </header>

    <section class="main" style="display: block;">
      <template v-if="list.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          @click="onCheckAll"
          :checked="isAllChecked"
        />
        <label for="toggle-all">Mark all as complete</label>
      </template>
      <List :list="todos" @onDel="delItem" @onCheck="onCheck" @onUpdate="onUpdate" />
    </section>

    <footer v-if="list.length > 0" class="footer">
      <span class="todo-count">
        <strong>{{ unCompletedCount }}</strong>
        {{ unCompletedCount > 1 ? 'items left': 'item left' }}
      </span>
      <ul class="filters">
        <li>
          <a href="javascript:;" :class="{selected: filter === 'all'}" @click="onFilt('all')">All</a>
        </li>
        <li>
          <a
            href="javascript:;"
            :class="{selected: filter === 'active'}"
            @click="onFilt('active')"
          >Active</a>
        </li>
        <li>
          <a
            href="javascript:;"
            :class="{selected: filter === 'completed'}"
            @click="onFilt('completed')"
          >Completed</a>
        </li>
      </ul>
      <button
        v-if="completedCount > 0"
        class="clear-completed"
        @click="clearCompleted"
      >Clear completed</button>
    </footer>
  </section>
</template>

<script>
// import './base.css'
// import './common.css'
import List from '../../components/List.vue'
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
      list: []
    }
  },
  components: {
    List
  },
  created() {
    getAll().then(res => {
      this.list = res.data
    })
  },
  methods: {
    addItem(e) {
      let val = e.target.value
      if (!val || val.trim() === '') {
        return
      }
      addTodo({ title: val }).then(res => {
        if (res.status == 200) {
          this.list.push(res.data)
          e.target.value = ''
        }
      })
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

<style scoped>
/* @import url('./base.css');
@import url('./common.css'); */
</style>

