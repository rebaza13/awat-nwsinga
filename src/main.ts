/**
 * Main Application Entry Point
 * Initializes Vue app with Pinia, Router, and global styles
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Import global styles
import './styles/main.scss'

/**
 * Create Vue application instance
 */
const app = createApp(App)

/**
 * Create Pinia store instance
 */
const pinia = createPinia()

/**
 * Install plugins
 */
app.use(pinia)  // State management
app.use(router) // Routing

/**
 * Mount the application
 */
app.mount('#app')
