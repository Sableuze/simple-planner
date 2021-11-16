<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw;" ref="card">
      <q-card-section class="row items-center q-pb-none">
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md q-py-md" @submit.prevent="onSubmit">
          <q-input
            v-model="form.note.name"
            label="Type the note's name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']">
          </q-input>
          <div
            class="flex items-baseline q-gutter-x-md q-gutter-y-xs"
            v-for="todo in this.form.todos"
            :key="todo.id">
            <q-input
              outlined
              v-model="todo.name"
              label="Сделать..."
              style="flex-grow: 1"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"></q-input>
            <q-btn icon="remove" @click="removeTodoInput(todo.id)"></q-btn>
          </div>
          <div class="flex justify-between">
            <q-btn :disabled="this.form.todos.length >= 5"
                   @click="addTodoInput"
                   icon="add"
            ></q-btn>
            <q-btn icon="check" color="green" type="submit"></q-btn>
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddNote',
  computed: {
    ...mapGetters(['lastTodoId', 'lastNoteId', 'lastNoteSortIndex']),
    lastTodoIdLocal() {
      return Math.max(0, ...this.form.todos.map((i) => i.id));
    },
  },
  mounted() {
    this.form.note.id = this.lastNoteId + 1;
    this.form.todos[0].id = this.lastTodoId + 1;
    this.form.note.sortIndex = this.lastNoteSortIndex + 1;
  },
  data() {
    return {
      form: {
        note: {
          id: 0,
          sortIndex: 0,
          dateStart: 0,
          dateFinish: 0,
          name: '',
          completed: false,
        },
        todos: [
          {
            id: 0,
            name: '',
            done: false,
          },
        ],
      },
      formExample: {
        note: {
          id: 0,
          sortIndex: 0,
          dateStart: 0,
          dateFinish: 0,
          name: '',
          completed: false,
        },
        todo:
          {
            id: 0,
            name: '',
            done: false,
          },
      },

    };
  },
  methods: {
    ...mapActions(['addNotes']),
    addTodoInput() {
      const { todos } = this.form;
      const newTodo = { ...this.formExample.todo };
      newTodo.id = this.lastTodoIdLocal + 1;
      todos.push(newTodo);
      this.$nextTick(() => {
        const { card } = this.$refs;
        card.$el.scrollTo({
          top: card.$el.scrollHeight,
          behavior: 'smooth',
        });
      });
    },
    removeTodoInput(todoId) {
      const startIndex = this.form.todos.findIndex((i) => i.id === todoId);
      this.form.todos = this.form.todos.filter((i) => i.id !== todoId);

      this.form.todos.slice(startIndex)
        // eslint-disable-next-line no-plusplus
        .map((i) => i.id === 0 || --i.id);
    },
    onSubmit() {
      this.form.note.dateStart = new Date();
      this.addNotes(this.form);
      this.$forceUpdate();
      this.$emit('submit');
    },
  },
};
</script>

<style scoped>

</style>
