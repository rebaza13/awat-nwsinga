<template>
  <div>
    <!-- Home Page Template -->
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Find Your Perfect Property</h1>
          <p class="hero__subtitle">
            Discover premium real estate opportunities with our comprehensive property solutions
          </p>
        </div>
      </div>
    </section>

    <!-- Properties Section -->
    <section class="properties">
      <div class="container">
        <div class="properties__grid">
          <PropertyCard
            v-for="property in properties"
            :key="property.id"
            :title="property.title"
            :description="property.description"
            @click="() => handlePropertyClick(property.title)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Home Page Component
 * Main landing page with hero section and property cards
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PropertyCard from './PropertyCard.vue';

/**
 * Property Interface
 * Defines the structure of property data
 */
interface Property {
  id: number;        // Unique identifier
  title: string;     // Property type name
  description: string; // Property type description
}

/**
 * Properties Data
 * Array of available property types
 */
const properties = ref<Property[]>([
  {
    id: 1,
    title: 'Monthly Rentals',
    description: 'Flexible short-term and monthly rental options for modern living with premium amenities and prime locations.'
  },
  {
    id: 2,
    title: 'Apartments',
    description: 'Modern apartments with contemporary designs, premium finishes, and convenient urban locations.'
  },
  {
    id: 3,
    title: 'Houses',
    description: 'Spacious family homes with beautiful architecture, private gardens, and peaceful neighborhoods.'
  },
  {
    id: 4,
    title: 'Lands',
    description: 'Prime development opportunities and investment plots in strategic locations with growth potential.'
  },
  {
    id: 5,
    title: 'Buildings',
    description: 'Commercial and residential buildings for investment opportunities and business development.'
  }
]);

const router = useRouter();

/**
 * Handle Property Card Click
 * @param propertyTitle - The title of the clicked property
 */
const handlePropertyClick = (propertyTitle: string) => {
  if (propertyTitle.toLowerCase() === 'houses') {
    router.push('/houses');
  } else if (propertyTitle.toLowerCase() === 'buildings') {
    router.push('/buildings');
  } else {
    console.log(`Clicked on ${propertyTitle}`);
    // TODO: Add navigation logic for other property types
  }
};
</script>

<style scoped lang="scss">
/**
 * Hero Section Styles
 * Large banner area with main heading and description
 */
.hero {
  background-color: var(--primary-bg);
  padding: 4rem 0;
  text-align: center;
  border-bottom: 1px solid var(--border-color);

  /**
   * Hero Content Container
   */
  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  /**
   * Main Hero Title
   */
  &__title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -1px;
  }

  /**
   * Hero Subtitle/Description
   */
  &__subtitle {
    font-size: 1.25rem;
    color: var(--muted-text);
    line-height: 1.6;
    margin: 0;
  }
}

/**
 * Properties Section Styles
 * Grid layout for property cards
 */
.properties {
  padding: 4rem 0;
  background-color: var(--primary-bg);

  /**
   * Properties Grid Layout
   * Responsive grid that adapts to screen size
   */
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/**
 * Responsive Design - Tablet
 */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 0;

    &__title {
      font-size: 2.5rem;
    }

    &__subtitle {
      font-size: 1.1rem;
    }
  }

  .properties {
    padding: 3rem 0;

    &__grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
  }
}

/**
 * Responsive Design - Mobile
 */
@media (max-width: 480px) {
  .hero {
    padding: 2rem 0;
    
    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1rem;
    }
  }

  .properties {
    padding: 2rem 0;
    
    &__grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>
