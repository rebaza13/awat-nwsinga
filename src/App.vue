<template>
  <!-- Main Application Template -->
  <div id="app">
    <!-- Header with navigation and theme toggle -->
    <AppHeader />
    
    <!-- Main content area with router view and transition -->
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" appear>
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * Main Application Component
 * Root component that includes layout and routing
 */
import { onMounted, watch } from 'vue'
import AppHeader from './layouts/AppHeader.vue'
import AppFooter from './layouts/AppFooter.vue'
import { useThemeStore } from './stores/theme'

// Initialize theme store
const themeStore = useThemeStore()

/**
 * Initialize theme system on app mount
 */
onMounted(() => {
  themeStore.initializeTheme()
})

/**
 * Watch for theme changes and save to localStorage
 */
watch(
  () => themeStore.currentTheme,
  () => {
    themeStore.saveTheme()
  }
)
</script>

<style>
/**
 * Main Application Styles
 * Global layout and theme-aware styling
 */
#app {
  min-height: 100vh;
  background-color: var(--primary-bg);
  display: flex;
  flex-direction: column;
  transition: var(--transition);
}

main {
  flex: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
