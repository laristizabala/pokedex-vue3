<template>
  <main class="home-pokemon">
    <img class="home-pokemon__img" src="../assets/images/pikachu-home.webp" alt="Pikachu image" />
    <article class="home-pokemon-text">
      <h1 class="home-pokemon-text__title">Welcome to Pokédex</h1>
      <p class="home-pokemon-text__subtitle">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
    </article>
    <button class="pokemon-button" @click="changeView('pokemon list')">Get started</button>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const changeView = (viewName) => {
  router.push({ name: viewName })
}
</script>

<style lang="scss" scoped>
.home-pokemon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   gap: 60px;
  &__img {
    margin: 15px;
  }
}

.home-pokemon-text {
  text-align: center;
  margin: 15px;
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
  //   @include main-button;
}
</style>
