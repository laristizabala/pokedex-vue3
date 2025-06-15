import api from '@/services/axiosInstance'

export const getPokemonList = async (params) => {
  const response = await api.get(`pokemon?limit=${params.limit}&offset=${params.offset}`)
  return response.data
}

export const getPokemonDetail = async (name) => {
  const response = await api.get(`pokemon/${name}`)
  return response.data
}
