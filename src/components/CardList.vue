<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
const { addToCart, addToFavorite } = inject('addToSomethere')
const searchedItems = inject('searchedItems')
</script>
<template>
  <div class="grid grid-cols-4 gap-5 ml-5 mr-5" v-auto-animate>
    <Card
      v-for="item in searchedItems"
      :key="item.id"
      :price="item.price"
      :is-added="item.isAdded"
      :title="item.title"
      :image-url="item.imageUrl"
      :is-favorite="item.isFavorite"
      :onClickAdd="() => addToCart(item)"
      :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>
