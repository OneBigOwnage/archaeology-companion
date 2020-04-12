<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit dig site: {{ digSite.name }}</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Dig site name"
                  required
                  v-model="form.name"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Level requirement"
                  required
                  v-model="form.level"
                  :rules="rules.level"
                ></v-text-field>
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
import { required, numeric, between } from '@/validationrules';

export default {
  data() {
    return {
      digSiteToUpdate: null,
      isOpen: false,
      isFormValid: false,
      form: {
        name: null,
        level: null,
      },
      rules: {
        name: [required()],
        level: [required(), numeric(), between(1, 120)],
      },
    };
  },
  methods: {
    loadDigSiteIntoForm() {
      this.form.name = this.digSite.name;
      this.form.level = this.digSite.level;
    },
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const isNameDiff = this.digSite.name !== this.form.name;

      this.digSiteToUpdate.name = this.form.name;
      this.digSiteToUpdate.level = this.form.level;

      this.$store.dispatch('digSites/update', this.digSiteToUpdate).then(() => {
        this.isOpen = false;

        if (isNameDiff) {
          this.$router.push({ name: 'dig-site-details', params: { slug: this.digSiteToUpdate.slug() } });
        }
      });
    },
  },
  props: {
    digSite: {
      type: DigSite,
      required: true,
    },
  },
  created() {
    EventBus.$on('dig-sites.dialogs.edit.open', () => this.isOpen = true);
    EventBus.$on('dig-sites.dialogs.edit.hide', () => this.isOpen = false);

    this.digSiteToUpdate = this.digSite;
    this.loadDigSiteIntoForm();
  },
}
</script>

<style>
</style>
