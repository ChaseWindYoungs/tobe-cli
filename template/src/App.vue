<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { changeThemeValue } from '@/utils';
import { onMounted } from 'vue';

onMounted(() => {
  changeThemeValue('dark');
});
</script>
