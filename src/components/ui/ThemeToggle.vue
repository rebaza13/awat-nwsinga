<template>
  <!-- Theme Toggle Button Component -->
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    :title="toggleButtonTitle"
    aria-label="Toggle theme"
  >
    <!-- Icon changes based on current theme -->
    <span class="theme-icon">
      {{ themeStore.isDark ? '☀️' : '🌙' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useThemeStore } from '../../stores/theme'

/**
 * Theme Toggle Component
 * Provides a button to switch between light and dark themes
 */

// Get theme store instance
const themeStore = useThemeStore()

/**
 * Computed property for button title text
 * Updates based on current theme
 */
const toggleButtonTitle = computed(() => {
  return themeStore.isDark 
    ? 'Switch to light theme' 
    : 'Switch to dark theme'
})

/**
 * Toggle theme function
 * Calls the store action and saves to localStorage
 */
const toggleTheme = () => {
  themeStore.toggleTheme()
  themeStore.saveTheme()
}

/**
 * Initialize theme on component mount
 */
onMounted(() => {
  themeStore.initializeTheme()
})

/**
 * Watch for theme changes and save automatically
 */
watch(
  () => themeStore.currentTheme,
  () => {
    themeStore.saveTheme()
  }
)
</script>

<style scoped lang="scss">
/**
 * Theme Toggle Button Styles
 */
.theme-toggle {
  // Base styles inherited from main.scss .theme-toggle class
  position: relative;
  
  .theme-icon {
    font-size: 1.2rem;
    display: block;
    transition: var(--transition);
  }
  
  // Hover animation
  &:hover .theme-icon {
    transform: scale(1.1) rotate(10deg);
  }
  
  // Active state
  &:active .theme-icon {
    transform: scale(0.95);
  }
}

/**
 * Accessibility improvements
 */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle {
    .theme-icon {
      transition: none;
    }
    
    &:hover .theme-icon {
      transform: none;
    }
  }
}
</style>
