<template>
  <q-layout view="hHh lpr fff">

    <q-header elevated class="bg-primary text-white" height-hint="98">

      <q-tabs align="left">
        <q-route-tab to="/" label="Outstanding tasks"/>
        <q-route-tab to="/completed" label="Completed tasks"/>
      </q-tabs>
    </q-header>

    <q-page-container class="q-ma-md">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {

  name: 'LayoutDefault',

  components: {},
  methods: {
  },

};
</script>
