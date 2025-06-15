<template>
  <div>
    <LoadingApp v-if="loading" />
    <div v-else class="list-pokemon">
      <SearcherApp />
      <RowsApp v-if="pokemonListFilteredLength" @loadModal="loadModal" />
      <EmptyApp v-else />
      <FooterApp v-if="pokemonListFilteredLength" />
      <Teleport to="body">
        <DetailModal v-show="showModal" @closeModal="showModal = $event" />
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import LoadingApp from '../components/LoadingApp.vue'
import FooterApp from '../components/FooterApp.vue'
import SearcherApp from '../components/SearcherApp.vue'
import RowsApp from '../components/RowsApp.vue'
import EmptyApp from '../components/EmptyApp.vue'
import DetailModal from '../components/DetailModal.vue'
import usePokemonStore from '@/stores/modules/pokemonStore'

const pokemonStore = usePokemonStore()

const { pokemonListFilteredLength, loading } = storeToRefs(pokemonStore)

const showModal = ref(false)

const getPokemonList = async () => {
  const params = { limit: 20, offset: 0 }
  await pokemonStore.fetchPokemonList(params)
}

const loadModal = async (pokemonName) => {
  await pokemonStore.fetchPokemonDetail(pokemonName)
  showModal.value = true
}

onMounted(async () => {
  getPokemonList()
})
</script>

<style lang="scss" scoped>
.list-pokemon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
