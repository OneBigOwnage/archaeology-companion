<template>
  <div>
    <v-btn icon dark v-on:click="isOpen = true">
      <v-icon>swap_horiz</v-icon>
    </v-btn>

    <v-dialog v-model="isOpen" max-width="500">
      <v-card tile>
        <v-toolbar tile flat dark color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Import / export state</v-toolbar-title>
        </v-toolbar>
        <v-container class="reset">
          <v-row justify="center">
            <v-col cols="7">
              <input
                type="text"
                ref="import-input"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              />
              <button v-on:click="importState()">Import</button>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="7">
              <input
                type="text"
                ref="export-input"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              />
              <button v-on:click="exportState()">Export</button>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions right>
          <v-spacer></v-spacer>
          <v-btn color="amber" tile depressed v-on:click="isOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'vuex';

export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    importState() {
      const input = this.$refs['import-input'];
      const state = input.value;

      try {
        JSON.parse(state);
      } catch {
        console.error('The given string is not valid JSON.');
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, state);
    },
    exportState() {
      const input = this.$refs['export-input'];
      const state = localStorage.getItem(LOCAL_STORAGE_KEY);

      input.value = state;
      input.select();

      document.execCommand('copy');
    },
  },
}
</script>

<style>
.reset {
  margin-top: 20px;
}

.reset button {
  background-color: rgb(240, 240, 240);
  border-style: outset;
  color: black;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
}

.reset input {
  background-color: rgb(255, 255, 255);
  border-style: inset;
  color: black;
}
</style>
