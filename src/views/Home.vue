<template>
  <div class="home">
    <div class="have-notes" v-if="outstandingNotes.length">

      <q-btn @click="show = true" flat icon="add" color="red">Add a Note</q-btn>
      <NoteList>
      </NoteList>
    </div>

    <div v-else class="noting flex column"><p>
      There is nothing here yet</p>
      <q-btn @click="show = true" flat icon="add" color="red">Add a Note</q-btn>
    </div>
    <AddNote @submit="show = false" :key="lastNoteId" v-model="show"></AddNote>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteList from '@/components/NoteList.vue';
import AddNote from '@/components/AddNote.modal.vue';

export default {
  name: 'Home',
  components: {
    NoteList,
    AddNote,
  },
  data() {
    return {
      icon: false,
      show: false,
      confirm: false,
    };
  },
  computed: {
    ...mapGetters(['lastNoteId', 'notes']),
    outstandingNotes() {
      return this.notes.filter((i) => i.note.completed !== true);
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.noting {
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: 700;
  font-size: 36px;
  transform: translate(-50%, -50%);
}
</style>
