<template>
  <!-- Houses Page -->
  <section class="houses">
    <div class="container">
      <h2 class="houses__title">Available Houses</h2>
      <div class="houses__list">
        <div v-for="(house, idx) in houses" :key="house.id" class="house-card" @click="openModal(idx)">
          <img :src="house.images[0]" :alt="house.title" class="house-card__img" />
          <div class="house-card__info">
            <h3 class="house-card__title">{{ house.title }}</h3>
            <p class="house-card__desc">{{ house.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <HouseModal
      v-if="modalVisible"
      :visible="modalVisible"
      :house="houses[modalIndex]"
      :houses="houses"
      :currentIndex="modalIndex"
      @close="closeModal"
      @navigate="navigateModal"
    />
  </section>
</template>

<script setup lang="ts">
/**
 * Houses Page Component
 * Displays a list of houses with images
 */
import { ref } from 'vue'
import HouseModal from '../components/houses/HouseModal.vue'
import image1 from '../assets/images/31158bdcca96c408c9883b5edb841128.jpg'
import image2 from '../assets/images/pexels-photo-106399.jpeg'
interface House {
  id: number
  title: string
  description: string
  images: string[]
  area: number
  direction: string
  floor?: number
  phone?: string
}

// Use your two images from assets/images
const houses = ref<House[]>([
  {
    id: 1,
    title: 'Modern Family House',
    description: 'A beautiful modern house with spacious rooms and a large garden.',
    images: [image1, image2],
    area: 220,
    direction: 'South West',
    floor: 2,
    phone: '+1234567890'
  },
  {
    id: 2,
    title: 'Classic Villa',
    description: 'Elegant villa with classic architecture and premium amenities.',
    images: [image2, image1],
    area: 350,
    direction: 'East',
    floor: 1,
    phone: '+9876543210'
  }
])

const modalVisible = ref(false)
const modalIndex = ref(0)
function openModal(idx: number) {
  modalIndex.value = idx
  modalVisible.value = true
}
function closeModal() {
  modalVisible.value = false
}
function navigateModal(newIdx: number) {
  if (newIdx >= 0 && newIdx < houses.value.length) {
    modalIndex.value = newIdx
  }
}
</script>

<style scoped lang="scss">
.houses {
  padding: 4rem 0;
  background: var(--primary-bg);
  min-height: 60vh;

  &__title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 2rem;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
}

.house-card {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px var(--shadow-light);
  transition: var(--transition);
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    border-color: var(--primary-text);
    box-shadow: 0 8px 32px var(--shadow-medium);
    transform: translateY(-4px);
  }

  &__img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: var(--primary-bg);
  }

  &__info {
    padding: 1.2rem;
    text-align: center;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-text);
    margin-bottom: 0.5rem;
  }

  &__desc {
    color: var(--muted-text);
    font-size: 0.9rem;
    margin-bottom: 0;
    line-height: 1.4;
  }
}
</style>
