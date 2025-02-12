<script setup>
import { defineProps, inject } from 'vue'
import CartItem from './CartItem.vue'
defineProps({
  items: Array,
  AddedItems: Array,
  addToCart: Function,
})
const DrawerAddedItems = inject('DrawerAddedItems')
// const DrawerAddedItems = computed(() => {
//   return props.items.filter((item) => item.isAdded === true)
// }) второй вариант загрузки карточек тут идет проверка по isAdded - не особо нравится, так как добавляются в корзину не по очереди добавления, а по изначальной очереди товаров

// const DrawerAddedItems = computed(() => {
//   return props.AddedItems.map((addeditem) => {
//     return props.items.find((item) => item.id === addeditem.parentId)
//   }).filter(Boolean)
// })
</script>
<template>
  <div class="flex flex-col gap-5 flex-1">
    <CartItem
      v-for="item in DrawerAddedItems"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :addedId="item.addedId"
    />
  </div>
</template>
