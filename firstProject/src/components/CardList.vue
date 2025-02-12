<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
const addToCart = inject('addToCart')
defineProps({
  items: Array,
})
const emit = defineEmits(['addToFavorite'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5 ml-5 mr-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :price="item.price"
      :is-added="item.isAdded"
      :title="item.title"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :onClickAdd="() => addToCart(item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>
