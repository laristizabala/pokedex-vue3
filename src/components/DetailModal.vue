<template>
  <div class="pokemon-modal">
    <div class="pokemon-modal__card" :class="{ closing: isClosing }">
      <IconClose class="pokemon-modal__close-modal" @click="closeModal" />
      <img
        class="pokemon-modal__image"
        src="../assets/images/background-modal.webp"
        alt="pokemon-background"
      />
      <img
        class="pokemon-modal__pokemon"
        :src="selectedPokemon?.sprites?.other['official-artwork']?.front_default"
        alt="pokemon"
      />
      <div class="pokemon-modal__info">
        <p class="pokemon-modal__text">
          <span>Name:</span> {{ capitalizeFirstLetter(selectedPokemon?.name) }}
        </p>

        <p class="pokemon-modal__text"><span>Weight:</span> {{ selectedPokemon?.weight }}</p>

        <p class="pokemon-modal__text"><span>Height:</span> {{ selectedPokemon?.height }}</p>

        <p class="pokemon-modal__text">
          <span>Types:</span> {{ pokemonType(selectedPokemon?.types) }}
        </p>
        <div class="pokemon-modal__actions">
          <div class="pokemon-modal__action-copy">
            <span v-if="showCopiedMessage" class="copied-message">¡Copied!</span>
            <button class="pokemon-modal__share" @click="copyToClipboard">
              Share to my friends
            </button>
          </div>
          <div
            class="pokemon-modal__favorite-option"
            @click="updateFavorite(selectedPokemon?.name)"
          >
            <IconStar
              class="pokemon-modal__favorite-option--inactive"
              :class="selectedPokemon?.favorite ? 'pokemon-modal__favorite-option--active' : ''"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { defineEmits } from 'vue'
import IconClose from '../components/icons/IconClose.vue'
import IconStar from '../components/icons/IconStar.vue'
import usePokemonStore from '@/stores/modules/pokemonStore'
import { capitalizeFirstLetter } from '@/utils/filter'

const pokemonStore = usePokemonStore()

const { selectedPokemon, loading, pokemonList } = storeToRefs(pokemonStore)
const emit = defineEmits(['closeModal'])

const isClosing = ref(false)
const showCopiedMessage = ref(false)

const pokemonType = (typesArray) => {
  const types = typesArray?.map((item) => {
    return capitalizeFirstLetter(item?.type?.name)
  })
  return types?.join(', ')
}
const closeModal = () => {
  isClosing.value = true
  setTimeout(() => {
    emit('closeModal', false)
  }, 300)
}
const updateFavorite = (pokemonName) => {
  loading.value = true
  selectedPokemon.value.favorite = !selectedPokemon.value.favorite
  const pokemonIndex = pokemonList.value?.findIndex((item) => item.name === pokemonName)
  if (pokemonIndex !== -1) {
    pokemonList.value[pokemonIndex].favorite = !pokemonList.value[pokemonIndex].favorite
    pokemonStore.updateFilteredList()
    pokemonStore.filterPokemonList()
  }
  loading.value = false
}

const copyToClipboard = async () => {
  const textToCopy = `${capitalizeFirstLetter(selectedPokemon.value?.name)}, weight ${selectedPokemon.value?.weight}, height ${selectedPokemon.value?.height}, types ${pokemonType(selectedPokemon.value?.types)}` // Ajusta los atributos reales

  try {
    await navigator.clipboard.writeText(textToCopy)
    showCopiedMessage.value = true
    setTimeout(() => {
      showCopiedMessage.value = false
    }, 900)
  } catch (err) {
    console.error('Error when copying to clipboard:', err)
  }
}
</script>

<style scoped lang="scss">
.pokemon-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: $background-dark;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  &__card {
    width: 655px;
    height: 540px;
    border-radius: 5px;
    overflow: hidden;
    background: $text-white-color;
    position: relative;
    margin: 1.5rem;
    animation: scale-up-center 0.2s;
  }
  &__card.closing {
    animation: scale-down-center 0.2s forwards;
  }
  &__close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    z-index: 1;
    width: 26px;
    fill: $text-white-color;
  }
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  &__pokemon {
    width: 180px;
    display: block;
    position: absolute;
    top: 25px;
    left: 36%;
    right: 0;
    animation: bounce-top 1s linear both;
    animation-delay: 0.5s;
  }
  &__info {
    padding: 1rem 2rem;
    font-size: 18px;
    height: 285px;
    overflow-y: auto;
    color: $text-light-color;
  }
  &__info::-webkit-scrollbar {
    width: 3px;
  }
  &__info::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
  }
  &__text {
    padding: 0.5rem 0;
    border-bottom: 1px solid $gray-light-color;
    span {
      font-weight: bold;
    }
  }
  &__actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem 2rem;
  }
  &__action-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  &__share {
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
  &__favorite-option {
    background-color: $white-soft-color;
    border-radius: 60px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: shadow-drop-center 2s ease-in-out both;
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

.copied-message {
  color: #b0e46a;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.copied-message.fade-out {
  opacity: 0;
}

@keyframes scale-up-center {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scale-down-center {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes bounce-top {
  0% {
    transform: translateY(-45px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  24% {
    opacity: 1;
  }
  40% {
    transform: translateY(-24px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: translateY(-12px);
    animation-timing-function: ease-in;
  }
  82% {
    transform: translateY(-6px);
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateY(-4px);
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
}

@keyframes shadow-drop-center {
  0% {
    box-shadow: 0 0 0 0 transparent;
  }
  50% {
    box-shadow: 0 0 20px 0 $favorite-color;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
