<template>
  <v-container fluid>
    <h1>Materials</h1>

    <v-btn fab fixed bottom right dark color="amber" v-on:click="openCreateDialog()">
      <v-icon>add</v-icon>
    </v-btn>

    <app-create-material-dialog></app-create-material-dialog>

    <v-row>
      <v-col
        v-for="(material, i) in this.$store.state.materials.all"
        :key="i"
        cols="2"
        class="items-column"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-on:click="detailView(material)"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            class="material-overview--card"
          >
            <v-card-title>{{ material.name }}</v-card-title>
            <v-card-text class="text--primary">
              <div>Level: {{ material.level }}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';
import AppCreateMaterialDialog from '@/components/CreateMaterialDialog';

export default {
  components: {
    AppCreateMaterialDialog,
  },
  methods: {
    detailView(material) {
      this.$router.push({ name: 'material-details', params: { slug: material.slug() } });
    },
    openCreateDialog() {
      EventBus.$emit('materials.dialogs.create.open');
    },
  }
}
</script>

<style>
.v-card.material-overview--card:hover {
  cursor: pointer;
}

.v-card.material-overview--card {
  height: 100%;
}

.v-col.items-column {
  align-items: stretch;
}
</style>
