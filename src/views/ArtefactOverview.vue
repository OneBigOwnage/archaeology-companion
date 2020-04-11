<template>
  <v-container fluid>
    <h1>Artefacts</h1>

    <v-btn fab fixed bottom right dark color="amber" v-on:click="openCreateDialog()">
      <v-icon>add</v-icon>
    </v-btn>

    <app-create-artefact-dialog></app-create-artefact-dialog>

    <v-row>
      <v-col
        v-for="(artefact, i) in this.$store.state.artefacts.all"
        :key="i"
        cols="3"
        class="items-column"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-on:click="detailView(artefact)"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            class="artefact-overview--card"
          >
            <v-card-title>{{ artefact.name }}</v-card-title>
            <v-card-text class="text--primary">
              <div>
                <span class="font-weight-medium">Excavation:</span>
                {{ artefact.excavationSlug }}
              </div>

              <div>
                <span class="font-weight-medium">Experience:</span>
                {{ artefact.xp }}
              </div>

              <div>
                <span class="font-weight-medium">Base chronotes value:</span>
                {{ artefact.chronotes }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';
import AppCreateArtefactDialog from '@/components/CreateArtefactDialog';

export default {
  components: {
    AppCreateArtefactDialog,
  },
  methods: {
    detailView(artefact) {
      this.$router.push({ name: 'artefact-details', params: { slug: artefact.slug() } });
    },
    openCreateDialog() {
      EventBus.$emit('artefacts.dialogs.create.open');
    },
  },
}
</script>

<style>
.v-card.artefact-overview--card:hover {
  cursor: pointer;
}

.v-card.artefact-overview--card {
  height: 100%;
}

.v-col.items-column {
  align-items: stretch;
}
</style>
