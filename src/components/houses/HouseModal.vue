<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-flex">
          <!-- Details Left -->
          <div class="modal-details">
            <h2 class="modal-title">{{ house.title }}</h2>
            <div class="modal-info">
              <div class="modal-info-item">
                <span class="modal-icon">📐</span>
                <span>{{ house.area }} m²</span>
              </div>
              <div class="modal-info-item">
                <span class="modal-icon">🧭</span>
                <span>{{ house.direction }}</span>
              </div>
              <div class="modal-info-item" v-if="house.floor">
                <span class="modal-icon">🏢</span>
                <span>Floor {{ house.floor }}</span>
              </div>
              <div class="modal-info-item" v-if="house.phone">
                <span class="modal-icon">📞</span>
                <span>{{ house.phone }}</span>
              </div>
            </div>
            <p class="modal-desc">{{ house.description }}</p>
            <div class="modal-actions">
              <button class="modal-btn" @click="prevHouse" :disabled="currentIndex === 0">← Previous</button>
              <button class="modal-btn" @click="nextHouse" :disabled="currentIndex === houses.length - 1">Next →</button>
              <button class="modal-btn modal-close" @click="closeModal">Close</button>
            </div>
          </div>
          <!-- Images Right -->
          <div class="modal-gallery">
            <img :src="currentImage" class="modal-main-img" :alt="house.title" />
            <div v-if="house.images.length > 1" class="modal-thumbnails">
              <img
                v-for="(img, idx) in house.images"
                :key="img"
                :src="img"
                :class="['modal-thumb', { active: idx === imageIndex }]"
                @click="setImage(idx)"
                :alt="`Thumbnail ${idx + 1}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

const props = defineProps<{
  visible: boolean
  house: House
  houses: House[]
  currentIndex: number
}>()
const emit = defineEmits(['close', 'navigate'])

const imageIndex = ref(0)
const currentImage = computed(() => props.house.images[imageIndex.value])

watch(() => props.house, () => {
  imageIndex.value = 0
})

function setImage(idx: number) {
  imageIndex.value = idx
}
function closeModal() {
  emit('close')
}
function nextHouse() {
  emit('navigate', props.currentIndex + 1)
}
function prevHouse() {
  emit('navigate', props.currentIndex - 1)
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: var(--primary-bg);
  color: var(--primary-text);
  border-radius: 18px;
  box-shadow: 0 8px 40px var(--shadow-medium);
  width: 95vw;
  max-width: 1600px;
  min-width: 320px;
  min-height: 420px;
  max-height: 80vh;
  padding: 2.5rem;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 2.5rem;
  height: 100%;
}
.modal-flex {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  height: 100%;
}
.modal-details {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}
.modal-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.modal-info {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.modal-info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: var(--primary-text);
}
.modal-icon {
  font-size: 1.2rem;
}
.modal-desc {
  color: var(--muted-text);
  font-size: 1rem;
  margin-top: 0.5rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 2rem;
}
.modal-btn {
  background: var(--accent-bg);
  color: var(--secondary-text);
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: var(--primary-text);
    color: var(--primary-bg);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.modal-close {
  background: transparent;
  color: var(--primary-text);
  border: 2px solid var(--primary-text);
}
.modal-gallery {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.modal-main-img {
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 1rem;
  background: var(--secondary-bg);
}
.modal-thumbnails {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.modal-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.7;
  border: 2px solid transparent;
  transition: border-color 0.2s, opacity 0.2s;
  &.active {
    border-color: var(--primary-text);
    opacity: 1;
  }
}
@media (max-width: 900px) {
  .modal-content {
    width: 99vw;
    max-width: 99vw;
    min-height: 320px;
    max-height: 85vh;
    padding: 1rem;
  }
  .modal-flex {
    gap: 1rem;
  }
  .modal-main-img {
    max-width: 100%;
    max-height: 180px;
    height: 140px;
    border-radius: 12px;
  }
}
@media (max-width: 700px) {
  .modal-content {
    width: 100vw;
    max-width: 100vw;
    min-height: 220px;
    max-height: 90vh;
    padding: 0.5rem;
  }
  .modal-flex {
    flex-direction: column;
    gap: 2rem;
  }
  .modal-gallery {
    align-items: center;
  }
  .modal-main-img {
    max-width: 100%;
    max-height: 80px;
    height: 60px;
    border-radius: 8px;
  }
}
</style>
