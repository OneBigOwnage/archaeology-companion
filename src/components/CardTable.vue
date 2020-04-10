<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.label">
      <v-row>
        <v-col :cols="labelCols">
          <v-list-item-title>{{ item.label }}:</v-list-item-title>
        </v-col>
        <v-col :cols="textCols">
          <v-list-item-title style="color: rgba(0, 0, 0, 0.6)">
            <template v-if="item.link">
              <v-chip link :to="item.link">{{ item.text }}</v-chip>
            </template>
            <template v-else>{{ item.text }}</template>
          </v-list-item-title>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
    },
    labelCols: {
      type: Number,
      required: false,
      default: 3,
    },
    textCols: {
      type: Number,
      required: false,
      default: 9,
    },
  },
}
</script>

<style>
</style>
