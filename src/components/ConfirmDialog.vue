<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="lg" :icon="this.icon || 'toll'"
                  flat :text-color="this.iconColor || 'dark'"/>
        <span class="q-ml-sm message">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" @click="_cancel" color="primary" v-close-popup/>
        <q-btn
          flat
          :label="this.okButton" @click="_confirm" :color="this.okColor || 'primary'"
          v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
export default {
  name: 'ConfirmDialog',
  data() {
    return {
      message: undefined, // Main text content
    };
  },
  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.okButton = opts.okButton;
      this.okColor = opts.okColor;
      this.icon = opts.icon;
      this.iconColor = opts.iconColor;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.dialog.show();
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },

    // eslint-disable-next-line no-underscore-dangle
    _confirm() {
      this.$refs.dialog.hide();
      this.$emit('hide');
      this.resolvePromise(true);
    },

    // eslint-disable-next-line no-underscore-dangle
    _cancel() {
      this.$refs.dialog.hide();
      this.$emit('hide');
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped>
.message{
  font-weight: 600;
  font-size: 18px;
}
</style>
