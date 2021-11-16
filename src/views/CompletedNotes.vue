<template>
  <NoteList :outstanding="false">
  </NoteList>

</template>

<script>
import NoteList from '@/components/NoteList.vue';

export default {
  name: 'CompletedNotes',
  components: {
    NoteList,
  },

};
</script>

<style scoped lang="scss">
.list-item {
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 1;
}
</style>
