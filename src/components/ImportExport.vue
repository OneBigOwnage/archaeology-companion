<template>
  <div>
    <v-btn icon dark v-on:click="isOpen = true">
      <v-icon>swap_horiz</v-icon>
    </v-btn>

    <v-dialog v-model="isOpen" max-width="500">
      <v-card>
        <v-toolbar dark color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Import / export state</v-toolbar-title>
        </v-toolbar>
        <v-container style="margin-top: 20px;">
          <v-row no-gutters>
            <v-col cols="7">
              <v-text-field solo class="rounded-left" id="import-field" />
            </v-col>
            <v-col cols="4">
              <v-btn
                tile
                color="amber"
                large
                height="48px"
                class="rounded-right btn-200"
                v-on:click="importState()"
              >Import state</v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="7">
              <v-text-field solo ref="export-field" class="rounded-left" id="export-field" />
            </v-col>
            <v-col cols="4">
              <v-btn
                tile
                color="amber"
                large
                height="48px"
                class="rounded-right btn-200"
                v-on:click="copyStateToClipBoard()"
              >Copy to clipboard</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions right>
          <v-spacer></v-spacer>
          <v-btn color="amber" v-on:click="isOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    importState() {
      const input__vanillaInstance = document.getElementById('import-field');
      const state = input__vanillaInstance.value;

      new Promise(resolve => {
        localStorage.setItem('vuex', state);

        resolve();
      }).then(() => {
        window.location.reload();
      });
    },
    copyStateToClipBoard() {
      const input__VueInstance = this.$refs['export-field'];
      const input__vanillaInstance = document.getElementById('export-field');

      new Promise(resolve => {
        const state = localStorage.getItem('vuex');

        input__vanillaInstance.value = state;
        input__vanillaInstance.select();
        document.execCommand('copy');

        resolve();
      }).then(() => {
        input__VueInstance.lazyValue = 'Copied to the clipboard...';
      }).then(() => {
        input__vanillaInstance.select();
      });
    },
  },
}
</script>

<style>
.rounded-right {
  border-radius: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.rounded-left {
  border-radius: 0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.btn-200 {
  width: 200px;
}
</style>
