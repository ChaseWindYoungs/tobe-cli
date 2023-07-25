<template>
  <div class="welcome">
    <img :src="srcImg" class="logo vue" alt="Vue logo" />
    
    <div class="content">
      <p >Welcome to</p>
      <h3><%= name %> project</h3>
      <p>It created by <a :href="href" target="_blank">tobe-cli</a></p>
    </div>
  </div>
</template>
<script setup>
import { getAssetsFile } from '@/utils/index.js'
import { ref } from 'vue';
const srcImg = getAssetsFile('images/vue.svg');
const href = ref('https://www.npmjs.com/package/tobe-cli')
</script>
<style lang="scss" scoped>
.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  .logo {
    width: 300px;
    margin-right: 20px;
  }
  .content {
    padding: 20px;
    h3 {
      font-size: 40px;
      margin: 20px 0;
      color: $primary;
    }
  }
}
</style>