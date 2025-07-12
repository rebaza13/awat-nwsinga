<template>
  <!-- Property Card Component -->
  <div class="property-card">
    
    <!-- Card Icon Section -->
    <div class="property-card__icon">
      <slot name="icon">
        <!-- Default icon using first letter of title -->
        <div class="default-icon">{{ title.charAt(0) }}</div>
      </slot>
    </div>
    
    <!-- Card Content Section -->
    <div class="property-card__content">
      <h3 class="property-card__title">{{ title }}</h3>
      <p class="property-card__description">{{ description }}</p>
      
      <!-- Action Button -->
      <div class="property-card__action">
        <button class="btn btn-primary" @click="handleClick">
          View {{ title }}
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
/**
 * Property Card Component
 * Displays a property type with icon, title, description and action button
 */

/**
 * Component Props Interface
 */
interface Props {
  title: string;        // Property type title (e.g., "Apartments")
  description: string;  // Property type description
}

// Define component props
const props = defineProps<Props>();

/**
 * Component Events Interface
 */
const emit = defineEmits<{
  click: [title: string]; // Emitted when card is clicked
}>();

/**
 * Handle card click action
 * Emits the property title to parent component
 */
const handleClick = () => {
  emit('click', props.title);
};
</script>

<style scoped lang="scss">
/**
 * Property Card Styles
 * Responsive card component with hover effects
 */
.property-card {
  background-color: var(--primary-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: var(--transition);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 280px;

  /**
   * Card Hover Effects
   */
  &:hover {
    border-color: var(--primary-text);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--shadow-medium);
  }

  /**
   * Card Icon Styles
   */
  &__icon {
    margin-bottom: 1rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    transition: var(--transition);

    .default-icon {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-text);
    }
  }

  /**
   * Card Content Layout
   */
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  /**
   * Card Title Styles
   */
  &__title {
    color: var(--primary-text);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  /**
   * Card Description Styles
   */
  &__description {
    color: var(--muted-text);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex: 1;
  }

  /**
   * Card Action Section
   */
  &__action {
    margin-top: auto;
    width: 100%;
  }

  /**
   * Icon Hover Effect
   */
  &:hover &__icon {
    border-color: var(--primary-text);
    background-color: var(--hover-bg);
  }
}

/**
 * Card Button Styles
 */
.property-card .btn {
  width: 100%;
  
  &:active {
    transform: translateY(0);
  }
}

/**
 * Responsive Design
 */
@media (max-width: 768px) {
  .property-card {
    padding: 1.5rem;
    
    &__icon {
      width: 60px;
      height: 60px;
      margin-bottom: 1rem;
      
      .default-icon {
        font-size: 1.5rem;
      }
    }

    &__title {
      font-size: 1.25rem;
    }

    &__description {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
  }
}

/**
 * Accessibility Improvements
 */
@media (prefers-reduced-motion: reduce) {
  .property-card {
    transition: none;
    
    &:hover {
      transform: none;
    }
    
    &__icon {
      transition: none;
    }
  }
}
</style>
