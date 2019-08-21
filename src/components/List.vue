<template>
  <div>
    <ul class="todo-list">
      <li v-for="item in list" :key="item.id">
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="item.completed"
            @click="(e) => onCheck(e, item.id)"
          />
          <label @dblclick="onEditing(item.id, item.title)">{{ item.title}}</label>
          <button class="destroy" @click="onDel(item.id)"></button>
        </div>
        <input
          type="text"
          :ref="item.id"
          class="edit"
          :value="item.title"
          @blur="(e) => onUpdate(e, item.id)"
          @keyup.enter="(e) => onUpdate(e, item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: Array
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onDel(id) {
      this.$emit('onDel', id)
    },
    onCheck(e, id) {
      let value = e.target.checked
      this.$emit('onCheck', id, value)
    },
    onEditing(id, value) {
      Object.keys(this.$refs).forEach(key => {
        if (this.$refs[key] && this.$refs[key].length > 0) {
          let edit = this.$refs[key][0]
          edit.style.display = 'none'
        }
      })
      let input = this.$refs[id][0]
      input.style.display = 'block'
      input.value = value
      input.focus()
    },
    onUpdate(e, id) {
      let val = e.target.value
      if (!val || val.trim() === '') {
        if (e.type === 'blur') {
          e.target.style.display = 'none'
        }
        return
      }
      this.$emit('onUpdate', id, val)
      e.target.style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped>
.view {
  text-align: left !important;
  input[type='checkbox']:checked + label {
    color: #d9d9d9;
    text-decoration: line-through !important;
  }
}
.edit {
  top: 6px;
  position: absolute !important;
  left: 48px;
  width: 494px;
}
</style>


