<template>
  <section class="searcher-container">
    <div class="input-wrapper">
      <input
        v-model="search"
        @search="searchPokemon"
        type="search"
        class="input"
        placeholder="Search"
      />
      <IconLoupe class="input-icon" />
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import usePokemonStore from '@/stores/modules/pokemonStore'
import IconLoupe from '../components/icons/IconLoupe.vue'

const pokemonStore = usePokemonStore()
const { search } = storeToRefs(pokemonStore)

const searchPokemon = () => {
  pokemonStore.filterPokemonList()
}
</script>

<style lang="scss" scoped>
.searcher-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 20px 20px 20px;
}
.input-wrapper {
  position: relative;
  width: 60%;
}
.input {
  box-sizing: border-box;
  color: $text-dark-color;
  padding: 15px 15px 15px 40px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  font-family: $font-family;
  font-size: 16px;
  &:focus {
    outline: none;
  }
}
.input-icon {
  fill: $inactive-color;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
