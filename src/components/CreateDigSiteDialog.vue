<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new dig site</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.name" outlined label="Dig site name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.level" outlined label="Level requirement" required></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col sm="12" lg="4" align="end">
                <v-btn color="amber" v-on:click="save()">Save</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DigSite from '@/models/digsite';
import EventBus from '@/eventbus';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      isOpen: false,
      form: {
        name: null,
        level: null,
      },
    };
  },
  methods: {
    save() {
      const digSite = new DigSite(uuidv4(), this.form.name, this.form.level);

      this.$store.dispatch('digSites/add', digSite);

      this.$router.push(digSite.route());
    },
  },
  created() {
    EventBus.$on('dig-sites.dialogs.create.open', () => this.isOpen = true);
    EventBus.$on('dig-sites.dialogs.create.hide', () => this.isOpen = false);
  },
}
</script>

<style>
</style>
