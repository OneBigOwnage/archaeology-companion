<template>
  <v-dialog v-model="isShown" max-width="500">
    <v-card class="confirmation-dialog-content">
      <v-toolbar dark flat :color="color">
        <v-btn icon dark v-on:click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">{{ headingText }}</v-toolbar-title>
      </v-toolbar>
      <v-card-title>{{ bodyText }}</v-card-title>
      <v-card-actions>
        <v-btn v-on:click="close()">Nevermind</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-on:click="confirm()" color="red lighten-2">I am sure</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  props: {
    onConfirm: {
      type: Function,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'amber',
    },
    headingText: {
      type: String,
      required: false,
      default: 'Are you sure?',
    },
    bodyText: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    open() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
    confirm() {
      this.onConfirm.call();

      this.isShown = false;
    },
  }
}
</script>

<style>
.confirmation-dialog-content .v-toolbar__content > .v-btn.v-btn--icon:first-child + .v-toolbar__title {
  padding-left: 0;
}

.v-dialog > .confirmation-dialog-content.v-card > .v-card__title {
  word-break: normal;
  font-size: 0.9rem;
  font-weight: normal;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: .5rem;
}
</style>
