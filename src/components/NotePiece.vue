<template>
  <q-card ref="parentCard" dark bordered
          class="bg-grey-9 my-card flex column no-wrap overflow-hidden no-wrap">
    <q-card-section class="flex">
      <div class="text">

        <div class="text-h6">{{ noteEditableData.name }}</div>
        <q-popup-edit
          v-model="noteEditableData.name"
          auto-save
          v-slot="scope"
          @save="changeNoteValues({noteId: note.id, key: 'name', newValue: noteEditableData.name})">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
        <div class="text-subtitle2">{{ new Date(note.dateStart).toDateString() }}</div>
        <div v-if="!outstanding"
             class="text-subtitle2">{{ new Date(note.dateFinish).toDateString() }}
        </div>

      </div>
      <q-btn
        icon="delete"
        flat color="red"
        class="q-ml-auto"
        @click="removeNote(note.id)"
      ></q-btn>
    </q-card-section>
    <q-separator dark inset/>
    <div class="todos" style="flex-grow: 1">

      <q-card-section>
        <div class="todos-list">
          <div class="todo flex items-center" v-for="todo in todosLocal" :key="todo.id">
            <q-checkbox
              :disable="!outstanding"
              v-model="todo.done"
              @click="onCheck(todo.done, todo.id)"
              color="teal"/>
            | {{todo.name}}
            <q-popup-edit
              v-model="todo.name"
              auto-save
              v-slot="scope"
              @update:model-value="changeTodoValues({todoId: todo.id, key: 'name',
              newValue: todo.name})">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </div>
        </div>
      </q-card-section>
    </div>

    <q-separator dark inset/>

    <q-card-section class="flex">
      <q-checkbox
        color="red"
        :disable="!areAllTodosDone"
        label="Completed"
        v-model="isNoteCompleted"
        @click="onComplete(note.id, isNoteCompleted)"
      >
      </q-checkbox>
    </q-card-section>
    <Confirm-dialog ref="confirmDialog"></Confirm-dialog>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
import { gsap } from 'gsap';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true,
    },
    todos: {
      type: Object,
      required: true,
    },
    outstanding: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  components: {
    ConfirmDialog,
  },
  mounted() {
    this.isNoteCompleted = this.note.completed;
    // eslint-disable-next-line no-global-assign
    this.noteEditableData = { name: this.note.name };
    this.todosLocal = this.todos;
  },
  computed: {
    areAllTodosDone() {
      return this.todos.every((i) => i.done);
    },
  },
  data() {
    return {
      isNoteCompleted: false,
      confirm: false,

      noteEditableData: {},
      todosLocal: {},
    };
  },
  methods: {
    ...mapActions([
      'changeTodoValues', 'deleteNote', 'changeNoteValues',
    ]),

    onCheck(todoId, key, checked) {
      this.changeTodoValues({
        todoId,
        key,
        newValue: checked,
      });
    },
    async onComplete(noteId, status) {
      let ok = false;
      if (status) { // CHECK IF NEW STATUS === CHECKED OR NOT
        ok = await this.$refs.confirmDialog.show({
          title: 'Complete',
          message: 'Do you want to mark it as completed?',
          okButton: 'Complete',
        });
      }
      if (ok) {
        const el = this.$refs.parentCard.$el;
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          onComplete: () => {
            this.changeNoteValues({
              noteId,
              key: 'completed',
              newValue: status,
            });
            if (status && this.note.dateFinish === 0) {
              const dateFinish = new Date();
              this.changeNoteValues({
                noteId,
                key: 'dateFinish',
                newValue: dateFinish,
              });
            }
            gsap.to(el, {
              opacity: 1,
              height: 'auto',
            });
          },
        });
      } else {
        this.isNoteCompleted = false;
      }
    },
    async removeNote(noteId) {
      const ok = await this.$refs.confirmDialog.show({
        message: 'Do you really want to delete the note and all its data?',
        okButton: 'YES',
        okColor: 'red',
        icon: 'remove',
        iconColor: 'red',
      });

      if (ok) {
        const el = this.$refs.parentCard.$el;
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 1,
          onComplete: () => {
            this.deleteNote(noteId);
            gsap.to(el, {
              opacity: 1,
              height: 'auto',
            });
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.todo {
  font-size: 21px;
  font-weight: 700;
}
</style>
