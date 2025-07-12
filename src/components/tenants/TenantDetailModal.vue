<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ tenant?.name }} - Payment Details {{ year }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="tenant-summary">
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Unit:</span>
                <span class="value">{{ tenant?.unit }}</span>
              </div>
              <div class="info-item">
                <span class="label">Phone:</span>
                <span class="value">{{ tenant?.phone }}</span>
              </div>
              <div class="info-item">
                <span class="label">Year:</span>
                <span class="value">{{ year }}</span>
              </div>
              <div class="info-item">
                <span class="label">Paid Months:</span>
                <span class="value">{{ paidMonthsCount }}/12</span>
              </div>
            </div>
          </div>

          <div class="payments-section">
            <h4>Monthly Payment Status</h4>
            <div class="months-grid">
              <div 
                v-for="month in months" 
                :key="month.value"
                class="month-card"
              >
                <div class="month-header">
                  <h5>{{ month.name }}</h5>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      :checked="isMonthPaid(month.value)"
                      @change="togglePayment(month.value, $event)"
                    />
                    <span class="slider"></span>
                  </label>
                </div>
                <div :class="['status-indicator', { 
                  'paid': isMonthPaid(month.value),
                  'unpaid': !isMonthPaid(month.value)
                }]">
                  {{ isMonthPaid(month.value) ? 'PAID' : 'UNPAID' }}
                </div>
              </div>
            </div>
          </div>

          <div class="quick-actions">
            <button class="btn btn-success" @click="markAllPaid">
              Mark All Paid
            </button>
            <button class="btn btn-danger" @click="markAllUnpaid">
              Mark All Unpaid
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Tenant {
  id: number
  name: string
  unit: string
  phone: string
  buildingId: number
}

interface Payment {
  tenantId: number
  year: number
  month: number
  paid: boolean
  amount?: number
  date?: string
}

const props = defineProps<{
  visible: boolean
  tenant: Tenant | null
  year: number
  payments: Payment[]
}>()

const emit = defineEmits<{
  close: []
  'update-payment': [tenantId: number, month: number, paid: boolean]
}>()

const months = [
  { value: 1, name: 'January' },
  { value: 2, name: 'February' },
  { value: 3, name: 'March' },
  { value: 4, name: 'April' },
  { value: 5, name: 'May' },
  { value: 6, name: 'June' },
  { value: 7, name: 'July' },
  { value: 8, name: 'August' },
  { value: 9, name: 'September' },
  { value: 10, name: 'October' },
  { value: 11, name: 'November' },
  { value: 12, name: 'December' }
]

const paidMonthsCount = computed(() => {
  return props.payments.filter(p => p.paid).length
})

function isMonthPaid(month: number): boolean {
  const payment = props.payments.find(p => p.month === month)
  return payment?.paid || false
}

function togglePayment(month: number, event: Event) {
  const target = event.target as HTMLInputElement
  const paid = target.checked
  
  if (props.tenant) {
    emit('update-payment', props.tenant.id, month, paid)
  }
}

function markAllPaid() {
  if (props.tenant) {
    months.forEach(month => {
      emit('update-payment', props.tenant!.id, month.value, true)
    })
  }
}

function markAllUnpaid() {
  if (props.tenant) {
    months.forEach(month => {
      emit('update-payment', props.tenant!.id, month.value, false)
    })
  }
}

function closeModal() {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  background: var(--primary-bg);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--shadow-medium);
  width: 95vw;
  max-width: 800px;
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

.modal-body {
  padding: 2rem;
}

.tenant-summary {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--secondary-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label {
    color: var(--muted-text);
    font-weight: 600;
  }

  .value {
    color: var(--primary-text);
    font-weight: 500;
  }
}

.payments-section {
  margin-bottom: 2rem;

  h4 {
    color: var(--primary-text);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.month-card {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-text);
  }
}

.month-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h5 {
    color: var(--primary-text);
    margin: 0;
    font-size: 1rem;
  }
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: #22c55e;

      &:before {
        transform: translateX(26px);
      }
    }
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
}

.status-indicator {
  text-align: center;
  padding: 0.25rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;

  &.paid {
    background: #22c55e;
    color: white;
  }

  &.unpaid {
    background: #ef4444;
    color: white;
  }
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &.btn-success {
    background: #22c55e;
    color: white;

    &:hover {
      background: #16a34a;
    }
  }

  &.btn-danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 98vw;
    margin: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1rem;
  }

  .months-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    flex-direction: column;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>