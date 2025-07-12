<template>
  <!-- Main Application Header -->
  <header class="header">
    <div class="container">
      <div class="header__content">
        <!-- Logo/Brand Section -->
        <div class="header__logo">
          <router-link to="/" class="logo-link">
            <h1>NWSinga</h1>
          </router-link>
        </div>
        <!-- Navigation and Theme Toggle Section -->
        <div class="header__actions">
          <!-- Main Navigation -->
          <nav class="header__nav">
            <router-link :to="{name:'home'}" class="nav-link">Home</router-link>
            <router-link to="/houses" class="nav-link">Houses</router-link>
          </nav>
          <!-- Theme Toggle Button -->
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import ThemeToggle from '../components/ui/ThemeToggle.vue'
</script>
<style scoped lang="scss">
.header {
  background-color: var(--primary-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: var(--transition);
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    .logo-link {
      text-decoration: none;
      h1 {
        color: var(--primary-text);
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.5px;
        transition: var(--transition);
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  &__nav {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
}
.nav-link {
  color: var(--primary-text);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: var(--transition);
  text-decoration: none;
  &:hover {
    background-color: var(--hover-bg);
    color: var(--primary-text);
  }
  &.router-link-active {
    background-color: var(--accent-bg);
    color: var(--secondary-text);
  }
}
@media (max-width: 768px) {
  .header {
    &__content {
      flex-direction: column;
      gap: 1rem;
    }
    &__actions {
      width: 100%;
      justify-content: space-between;
    }
    &__nav {
      gap: 1rem;
    }
  }
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
@media (max-width: 480px) {
  .header {
    &__nav {
      gap: 0.5rem;
    }
  }
  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>
