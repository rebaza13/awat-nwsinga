<template>
  <section class="buildings">
    <div class="container">
      <div class="buildings__header">
        <h2 class="buildings__title">Buildings Management</h2>
        <button class="btn btn-primary" @click="openAddModal">
          Add New Building
        </button>
      </div>

      <div class="buildings__controls">
        <div class="select-wrapper">
          <select v-model="selectedBuildingId" @change="onBuildingSelect" class="building-select">
            <option value="">Select a Building</option>
            <option v-for="building in buildings" :key="building.id" :value="building.id">
              {{ building.name }}
            </option>
          </select>
        </div>
        <button 
          v-if="selectedBuildingId" 
          class="btn btn-secondary" 
          @click="openEditModal"
        >
          Edit Building
        </button>
      </div>

      <div v-if="selectedBuilding" class="building-details">
        <div class="building-card">
          <h3>{{ selectedBuilding.name }}</h3>
          <p><strong>Address:</strong> {{ selectedBuilding.address }}</p>
          <p><strong>Floors:</strong> {{ selectedBuilding.floors }}</p>
          <p><strong>Total Units:</strong> {{ selectedBuilding.totalUnits }}</p>
          <button class="btn btn-accent" @click="viewTenants">
            View Tenants
          </button>
        </div>
      </div>
    </div>

    <!-- Building Modal -->
    <BuildingModal
      v-if="modalVisible"
      :visible="modalVisible"
      :building="editingBuilding"
      :isEdit="isEditMode"
      @close="closeModal"
      @save="saveBuilding"
    />

    <!-- Tenants Modal -->
    <TenantsModal
      v-if="tenantsModalVisible"
      :visible="tenantsModalVisible"
      :building="selectedBuilding"
      @close="closeTenantsModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BuildingModal from '../components/buildings/BuildingModal.vue'
import TenantsModal from '../components/tenants/TenantsModal.vue'

interface Building {
  id: number
  name: string
  address: string
  floors: number
  totalUnits: number
}

const router = useRouter()

const buildings = ref<Building[]>([
  {
    id: 1,
    name: 'Sunset Towers',
    address: '123 Main Street, Downtown',
    floors: 15,
    totalUnits: 45
  },
  {
    id: 2,
    name: 'Green Valley Complex',
    address: '456 Oak Avenue, Midtown',
    floors: 8,
    totalUnits: 32
  },
  {
    id: 3,
    name: 'City Center Plaza',
    address: '789 Business District, Central',
    floors: 20,
    totalUnits: 60
  }
])

const selectedBuildingId = ref<number | string>('')
const modalVisible = ref(false)
const tenantsModalVisible = ref(false)
const editingBuilding = ref<Building | null>(null)
const isEditMode = ref(false)

const selectedBuilding = computed(() => {
  if (!selectedBuildingId.value) return null
  return buildings.value.find(b => b.id === Number(selectedBuildingId.value)) || null
})

function onBuildingSelect() {
  // Building selected, details will show automatically via computed property
}

function openAddModal() {
  editingBuilding.value = null
  isEditMode.value = false
  modalVisible.value = true
}

function openEditModal() {
  if (selectedBuilding.value) {
    editingBuilding.value = { ...selectedBuilding.value }
    isEditMode.value = true
    modalVisible.value = true
  }
}

function closeModal() {
  modalVisible.value = false
  editingBuilding.value = null
}

function saveBuilding(building: Building) {
  if (isEditMode.value) {
    const index = buildings.value.findIndex(b => b.id === building.id)
    if (index !== -1) {
      buildings.value[index] = building
    }
  } else {
    const newId = Math.max(...buildings.value.map(b => b.id)) + 1
    buildings.value.push({ ...building, id: newId })
  }
  closeModal()
}

function viewTenants() {
  if (selectedBuilding.value) {
    tenantsModalVisible.value = true
  }
}

function closeTenantsModal() {
  tenantsModalVisible.value = false
}
</script>

<style scoped lang="scss">
.buildings {
  padding: 2rem 0;
  background: var(--primary-bg);
  min-height: 70vh;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-text);
    margin: 0;
  }

  &__controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }
}

.select-wrapper {
  position: relative;
  min-width: 250px;
}

.building-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--secondary-bg);
  color: var(--primary-text);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary-text);
  }

  &:hover {
    border-color: var(--primary-text);
  }
}

.building-details {
  margin-top: 2rem;
}

.building-card {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;

  h3 {
    color: var(--primary-text);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--muted-text);
    margin-bottom: 0.5rem;
    font-size: 1rem;

    strong {
      color: var(--primary-text);
    }
  }

  .btn {
    margin-top: 1rem;
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &.btn-primary {
    background: var(--accent-bg);
    color: var(--secondary-text);

    &:hover {
      background: var(--primary-text);
      color: var(--primary-bg);
    }
  }

  &.btn-secondary {
    background: transparent;
    color: var(--primary-text);
    border: 2px solid var(--primary-text);

    &:hover {
      background: var(--primary-text);
      color: var(--primary-bg);
    }
  }

  &.btn-accent {
    background: var(--primary-text);
    color: var(--primary-bg);

    &:hover {
      background: var(--accent-bg);
      color: var(--secondary-text);
    }
  }
}

@media (max-width: 768px) {
  .buildings {
    &__header {
      flex-direction: column;
      align-items: stretch;
    }

    &__controls {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .select-wrapper {
    min-width: auto;
  }

  .building-card {
    padding: 1.5rem;
  }
}
</style>