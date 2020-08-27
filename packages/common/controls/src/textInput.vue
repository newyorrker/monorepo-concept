<template>
  <div class="text-input">
    {{ keks || kekus }}
    <input type="text">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // import style from './style.module.scss'

  export default Vue.extend({
  name: 'text-input',
    components: {

    },
    props: {
      keks: String,
    },
    data() {
      return {
        kekus: 'kekus',
      // style: style
      };
    },
  });
</script>