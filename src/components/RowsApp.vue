<template>
  <section class="rows-container">
    <article
      v-for="(item, index) in pokemonListFiltered"
      :key="index"
      class="row-pokemon"
      @click="emit('loadModal', item.name)"
    >
      <p class="row-pokemon__text">{{ capitalizeFirstLetter(item.name) }}</p>
      <div class="row-pokemon__favorite-option" @click.stop="updateFavorite(item.name)">
        <IconStar
          class="row-pokemon__favorite-option--inactive"
          :class="item?.favorite ? 'row-pokemon__favorite-option--active' : ''"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import usePokemonStore from '@/stores/modules/pokemonStore'
import IconStar from '../components/icons/IconStar.vue'
import { capitalizeFirstLetter } from '../utils/filter'

const pokemonStore = usePokemonStore()

const { pokemonListFiltered, loading } = storeToRefs(pokemonStore)

const emit = defineEmits(['loadModal'])

const updateFavorite = (pokemonName) => {
  loading.value = true
  pokemonStore.updateFavorite(pokemonName)
  loading.value = false
}
</script>

<style lang="scss" scoped>
.rows-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 60%;
  margin-top: 20px;
  margin-bottom: 75px;
  @media (max-width: 950px) {
    width: 80%;
  }
}

.row-pokemon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: $text-white-color;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: $gray-light-color;
  }
  &__text {
    font-size: 22px;
    color: $text-dark-color;
  }
  &__favorite-option {
    background-color: $white-soft-color;
    border-radius: 60px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &--inactive {
      fill: $inactive-color;
      width: 26px;
    }
    &--active {
      fill: $favorite-color;
      width: 26px;
    }
  }
}
</style>
