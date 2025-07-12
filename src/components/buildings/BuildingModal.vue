<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ isEdit ? 'Edit Building' : 'Add New Building' }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="name">Building Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter building name"
            />
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              required
              placeholder="Enter building address"
            />
          </div>

          <div class="form-group">
            <label for="floors">Number of Floors</label>
            <input
              id="floors"
              v-model.number="formData.floors"
              type="number"
              min="1"
              required
              placeholder="Enter number of floors"
            />
          </div>

          <div class="form-group">
            <label for="totalUnits">Total Units</label>
            <input
              id="totalUnits"
              v-model.number="formData.totalUnits"
              type="number"
              min="1"
              required
              placeholder="Enter total number of units"
            />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEdit ? 'Update' : 'Add' }} Building
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Building {
  id: number
  name: string
  address: string
  floors: number
  totalUnits: number
}

const props = defineProps<{
  visible: boolean
  building: Building | null
  isEdit: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [building: Building]
}>()

const formData = ref({
  id: 0,
  name: '',
  address: '',
  floors: 1,
  totalUnits: 1
})

// Watch for building prop changes to populate form
watch(() => props.building, (newBuilding) => {
  if (newBuilding) {
    formData.value = { ...newBuilding }
  } else {
    // Reset form for new building
    formData.value = {
      id: 0,
      name: '',
      address: '',
      floors: 1,
      totalUnits: 1
    }
  }
}, { immediate: true })

function closeModal() {
  emit('close')
}

function handleSubmit() {
  emit('save', { ...formData.value })
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: var(--primary-bg);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--shadow-medium);
  width: 90vw;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);

  h3 {
    color: var(--primary-text);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--muted-text);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);

  &:hover {
    background: var(--hover-bg);
    color: var(--primary-text);
  }
}

.modal-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: var(--primary-text);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--secondary-bg);
    color: var(--primary-text);
    font-size: 1rem;
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--primary-text);
    }

    &::placeholder {
      color: var(--muted-text);
    }
  }
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
    border: 2px solid var(--border-color);

    &:hover {
      border-color: var(--primary-text);
      background: var(--hover-bg);
    }
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95vw;
    margin: 1rem;
  }

  .modal-header,
  .modal-form {
    padding: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>