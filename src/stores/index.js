import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(persistedState)

export default store
