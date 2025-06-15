<template>
  <div class="pokeball-wrapper">
    <img src="../assets/images/Loader.webp" alt="Loading image" class="pokeball-img" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pokeball-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.pokeball-img {
  width: 100px;
  transform-origin: center;
  animation:
    spin-z 2s linear infinite,
    glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0px $primary-color);
  }
  50% {
    filter: drop-shadow(0 0 10px $primary-color);
  }
}
@keyframes spin-z {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
