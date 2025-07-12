<template>
  <!-- Application Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Brand Section -->
        <div class="footer__brand">
          <h3>NWSinga</h3>
          <p>Your trusted property partner</p>
        </div>
        <!-- Copyright Section -->
        <div class="footer__info">
          <p>&copy; {{ currentYear }} NWSinga. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.footer {
  background-color: var(--primary-bg);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: auto;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__brand {
    h3 {
      color: var(--primary-text);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }
    p {
      color: var(--muted-text);
      margin: 0;
      font-size: 0.9rem;
    }
  }
  &__info {
    p {
      color: var(--muted-text);
      margin: 0;
      font-size: 0.85rem;
    }
  }
}
@media (max-width: 768px) {
  .footer {
    &__content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
}
</style>
