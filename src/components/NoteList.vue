<template>

    <transition-group
      class="notes-list"
      tag="div"
      name="staggered-fade"
     >
      <NotePiece
        class="note list-item"
        v-for="(note, index) in outstanding ? outstandingNotes: completedNotes"
        :key="note.note.id"
        :css="false"
        :note="note.note"
        :todos="note.todos"
        :outstanding="outstanding"
        :data-index="index"
      >
      </NotePiece>
    </transition-group>
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters, mapActions } from 'vuex';
import NotePiece from '@/components/NotePiece.vue';

export default {
  name: 'NoteList',
  props: {
    outstanding: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  components: {
    NotePiece,
  },
  computed: {
    ...mapGetters(['notes', 'singleNoteCnt']),
    outstandingNotes() {
      return this.notes.filter((i) => i.note.completed === false);
    },
    completedNotes() {
      return this.notes.filter((i) => i.note.completed);
    },
  },
  methods: {
    ...mapActions(['changeNoteValues']),
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: 'auto',
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },

  },

};
</script>

<style scoped lang="scss">
.notes-list {
  margin-top: 60px;

  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  // padding-left: 90px;

  justify-content: center;

  &::v-deep .note {
    width: 400px;
  }

  @media (min-width: 995px) {
    margin: 0 auto;
    margin-top: 60px;
    // margin-left: 120px;
  }
  @media (min-width: 501px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;

    .note {
      width: 100%;
    }
  }
}

</style>
