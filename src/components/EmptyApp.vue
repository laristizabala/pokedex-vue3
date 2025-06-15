<template>
  <article class="empty-pokemon">
    <h1 class="empty-pokemon__title">Uh-oh!</h1>
    <p class="empty-pokemon__subtitle">You look lost on your journey!</p>
    <button class="pokemon-button" @click="changeView('home')">Go back home</button>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const changeView = (viewName) => {
  router.push({ name: viewName })
}
</script>

<style lang="scss" scoped>
.empty-pokemon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 15px;
  max-width: 610px;
  &__title {
    font-size: 26px;
    font-weight: bold;
    color: $text-dark-color;
  }
  &__subtitle {
    font-size: 18px;
    color: $text-light-color;
    margin: 20px;
  }
}

.pokemon-button {
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
</style>
