import { setItem, getItem } from '@/helpers/localStorageHelper';

const state = {
  notes: getItem('notes') || [],
};

const getters = {
  notes: (state) => state.notes,
  singleNoteCnt: (state) => (noteId) => state.notes.find((i) => i.note.id === noteId),
  noteTodos: (state) => (noteId) => state.notes.find((i) => i.note.id === noteId).todos,
  todo: (state) => (todoId) => state.notes.map((i) => i.todos)
    .flat()
    .find((i) => i.id === todoId),
  lastNoteId: (state) => Math.max(0, ...state.notes.map((i) => i.note).flat()
    .map((i) => i.id)),
  lastNoteSortIndex: (state) => Math.max(0, ...state.notes.map((i) => i.note).flat()
    .map((i) => i.sortIndex)),
  lastTodoId: (state) => Math.max(0, ...state.notes.map((i) => i.todos)
    .flat()
    .map((i) => i.id)),

};
const mutations = {
  changeNotes(state, payload) {
    state.notes.push(payload);
    setItem('notes', state.notes);
  },
  changeNoteValue(state, { note, key, newValue }) {
    note.note[key] = newValue;

    setItem('notes', state.notes);
  },
  changeTodoValue(state, { todo, key, newValue }) {
    todo[key] = newValue;
    setItem('notes', state.notes);
  },

  deleteNote(state, noteId) {
    const startIndex = state.notes.map((i) => i.note)
      .findIndex((i) => i.id === noteId);
    state.notes = state.notes.filter((i) => i.note.id !== noteId);
    [...state.notes.map((i) => i.note)].slice(startIndex)
      // eslint-disable-next-line no-plusplus
      .map((i) => i.id === 0 || --i.id);
    setItem('notes', state.notes);
  },
};
const actions = {

  addNotes({ commit }, { note, todos }) {
    commit('changeNotes', { note, todos });
  },

  changeNoteValues({ commit }, { noteId, key, newValue }) {
    const note = this.getters.singleNoteCnt(noteId);

    commit('changeNoteValue', { note, key, newValue });
  },

  changeTodoValues({ commit }, { todoId, key, newValue }) {
    const todo = this.getters.todo(todoId);
    commit('changeTodoValue', { todo, key, newValue });
  },

  deleteNote({ commit }, noteId) {
    commit('deleteNote', noteId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
