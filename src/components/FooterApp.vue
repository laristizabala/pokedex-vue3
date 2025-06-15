<template>
  <footer class="footer-pokemon">
    <button
      :class="buttonStatus === 'all' ? 'active-button' : 'inactive-button'"
      @click="changeOption('all')"
    >
      <IconList class="icon" />All
    </button>
    <button
      :class="buttonStatus !== 'all' ? 'active-button' : 'inactive-button'"
      @click="changeOption('favorite')"
    >
      <IconStar class="icon" />Favorites
    </button>
  </footer>
</template>

<script setup>
import IconList from '../components/icons/IconList.vue'
import IconStar from '../components/icons/IconStar.vue'
import usePokemonStore from '@/stores/modules/pokemonStore'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { buttonStatus } = storeToRefs(pokemonStore)

// const activeButton = ref('all')

const changeOption = (optionName) => {
  buttonStatus.value = optionName
  //   activeButton.value = optionName
  pokemonStore.filterPokemonList()
}
</script>

<style lang="scss" scoped>
.footer-pokemon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 80px;
  background-color: $text-white-color;
  box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.active-button {
  // @include main-button;
  width: 24%;
  background-color: $primary-color;
  border-radius: 60px;
  padding: 11px 20px;
  color: $text-white-color;
  font-size: 18px;
  font-weight: bold;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background-color: $primary-color-hover;
  }
}

.inactive-button {
  // @include secondary-button;
  width: 24%;
  background-color: $inactive-color;
  border-radius: 60px;
  padding: 11px 20px;
  color: $text-white-color;
  font-size: 18px;
  font-weight: bold;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background-color: $text-light-color;
  }
}

.icon {
  width: 22px;
  fill: $text-white-color;
}
</style>
