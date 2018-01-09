<template>
  <div>
    <p>test</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Watch } from 'vue-property-decorator';

  import '../../../css/common/base.scss';

  @Component
  export default class App extends Vue {

  }
</script>

<style lang="scss">
  p {
    color: #09f;
  }
</style>
