<script setup>
import myHello from './components/myHello.vue'
</script>

<template>
  <div class="text-slate-500 mb-5">
    <myHello title="Кроссовки Puma" :price="92100" :isAdded="true"> </myHello>
  </div>
  <div class="text-slate-500 mb-5">
    <myHello />
  </div>
</template>

<style scoped></style>
