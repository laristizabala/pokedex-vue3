import { defineStore } from 'pinia'
import { getPokemonList, getPokemonDetail } from '@/services/repositories/pokemonService'

const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: [],
    pokemonListFiltered: [],
    pokemonListFilteredLength: 0,
    selectedPokemon: null,
    buttonStatus: 'all',
    search: '',
    loading: false,
  }),
  actions: {
    async fetchPokemonList(params) {
      try {
        this.loading = true
        const response = await getPokemonList(params)
        this.pokemonList = response?.results ?? []
        this.pokemonListFiltered = response?.results ?? []
        this.addFavoriteProp()
        this.pokemonListFilteredLength = this.pokemonListFiltered?.length ?? 0
        return response
      } catch (err) {
        console.error('Error', err)
        return err
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonDetail(name) {
      try {
        this.loading = true
        const response = await getPokemonDetail(name)
        this.selectedPokemon = response ?? {}
        this.addFavoritePropInSelectedPokemon()
        return response
      } catch (err) {
        console.error('Error', err)
        return err
      } finally {
        this.loading = false
      }
    },
    addFavoriteProp() {
      if (this.pokemonList?.length) {
        this.pokemonList = this.pokemonList?.map((item) => {
          return { ...item, favorite: false }
        })
        this.pokemonList[3].favorite = true
        this.pokemonList[6].favorite = true
        this.updateFilteredList()
      }
    },
    addFavoritePropInSelectedPokemon() {
      const pokemonName = this.selectedPokemon?.name ?? ''
      const pokemonIndex = this.pokemonList?.findIndex((item) => item.name === pokemonName)
      if (pokemonIndex !== -1) {
        this.selectedPokemon.favorite = this.pokemonList[pokemonIndex].favorite
      }
    },
    filterPokemonList() {
      const searchLower = this.search?.toLowerCase()
      if (this.buttonStatus === 'favorite') {
        this.pokemonListFiltered = this.pokemonList.filter((item) => {
          const itemNameLower = item.name?.toLowerCase()
          return searchLower ? item.favorite && itemNameLower?.includes(searchLower) : item.favorite
        })
      } else if (this.search) {
        this.pokemonListFiltered = this.pokemonList.filter((item) => {
          const itemNameLower = item.name?.toLowerCase()
          return itemNameLower?.includes(searchLower)
        })
      } else {
        this.updateFilteredList()
      }
      this.pokemonListFilteredLength = this.pokemonListFiltered?.length ?? 0
    },
    updateFilteredList() {
      this.pokemonListFiltered = [...this.pokemonList]
    },
    updateFavorite(pokemonName) {
      const pokemonIndex = this.pokemonList?.findIndex((item) => item.name === pokemonName)
      if (pokemonIndex !== -1) {
        this.pokemonList[pokemonIndex].favorite = !this.pokemonList[pokemonIndex].favorite
        this.updateFilteredList()
        this.filterPokemonList()
      }
    },
  },
})

export default usePokemonStore
