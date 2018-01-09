<template>
  <div>
    <h2>fork-ts-checker-webpack-plugin-test</h2>
    <p>{{data}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Watch } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private data: string = 'hello world!';
  }
</script>

<style lang="scss">
  h2 {
    color: #09f;
  }
</style>
