<script setup>
import { onMounted, ref, watch, provide, computed } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const AddedItems = ref([])
const drawerOpen = ref(false)
const filter = ref('name')

const sortedItems = () => {
  switch (filter.value) {
    case 'priceUp':
      items.value.sort((a, b) => a.price - b.price)
      break
    case 'priceDown':
      items.value.sort((a, b) => b.price - a.price)
      break
    case 'name':
      items.value.sort((a, b) => a.title.localeCompare(b.title))
      break
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      }
      item.isFavorite = true
      const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://a3ca5502346e0c49.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}
const addToCart = async (item) => {
  try {
    if (!item.isAdded) {
      const obj = {
        parentId: item.id,
      }
      item.isAdded = true
      const { data } = await axios.post('https://a3ca5502346e0c49.mokky.dev/cartadded', obj)
      item.addedId = data.id
    } else {
      item.isAdded = false
      await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.addedId}`)
      item.addedId = null
    }
  } catch (err) {
    console.log(err)
  }
  fetchAdded()
}

const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/items')
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
      addedId: null,
    }))
    sortedItems()
  } catch (err) {
    console.log(err)
  }
}
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://a3ca5502346e0c49.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchAdded = async () => {
  try {
    const { data } = await axios.get('https://a3ca5502346e0c49.mokky.dev/cartadded')
    AddedItems.value = data
    items.value = items.value.map((item) => {
      const added = data.find((added) => added.parentId === item.id)
      if (!added) {
        return item
      }
      return {
        ...item,
        isAdded: true,
        addedId: added.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const openDrawer = () => {
  drawerOpen.value = true
}
const closeDrawer = () => {
  drawerOpen.value = false
}
const DrawerAddedItems = computed(() => {
  return AddedItems.value
    .map((addeditem) => {
      return items.value.find((item) => item.id === addeditem.parentId)
    })
    .filter(Boolean)
})

const totalSummCart = computed(() => {
  return items.value.filter((item) => item.isAdded).reduce((sum, item) => sum + item.price, 0)
})

const removeFromDrawer = async (item) => {
  try {
    const DeleteId = Number(item.target.dataset.parentId)
    await axios.delete(`https://a3ca5502346e0c49.mokky.dev/cartadded/${item.target.dataset.id}`)
    const ItemFetchId = items.value.find((obj) => obj.id === DeleteId)
    if (ItemFetchId) {
      ItemFetchId.isAdded = false
    }
    fetchAdded()
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
  await fetchAdded()
}) //подгрузка

watch(
  filter,
  () => {
    sortedItems()
  },
  { immediate: true },
  fetchItems,
)
provide('openDrawer', openDrawer)
provide('closeDrawer', closeDrawer)
provide('addToCart', addToCart) //первое - ключ, второе - значение
provide('DrawerAddedItems', DrawerAddedItems)
provide('totalSummCart', totalSummCart)
provide('removeFromDrawer', removeFromDrawer)
</script>
<template>
  <Drawer v-if="drawerOpen" :items="items" :AddedItems="AddedItems" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex gap-4">
          <select v-model="filter" class="py-2 px-3 border rounded-xl outline-none">
            <option value="name">По названию</option>
            <option value="priceUp">По цене(дешевые)</option>
            <option value="priceDown">По цене(дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
            <input
              @input="onChangeSearchInput"
              placeholder="Поиск..."
              class="focus:border-gray-400 border rounded-md py-2 pl-10 pr-4 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <CardList :items="items" @addToFavorite="addToFavorite" />
    </div>
  </div>
</template>

<style scoped></style>
