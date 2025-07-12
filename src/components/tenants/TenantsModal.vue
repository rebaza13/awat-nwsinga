<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ building?.name }} - Tenants</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="year-selector">
            <label for="year">Select Year:</label>
            <select id="year" v-model="selectedYear" @change="onYearChange">
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <div class="tenants-list">
            <div 
              v-for="tenant in tenants" 
              :key="tenant.id" 
              class="tenant-card"
              @click="openTenantModal(tenant)"
            >
              <div class="tenant-info">
                <h4>{{ tenant.name }}</h4>
                <p>Unit {{ tenant.unit }}</p>
                <p>{{ tenant.phone }}</p>
              </div>
              <div class="payment-grid">
                <div 
                  v-for="month in months" 
                  :key="month.value"
                  :class="['payment-square', { 
                    'paid': isMonthPaid(tenant.id, month.value),
                    'unpaid': !isMonthPaid(tenant.id, month.value)
                  }]"
                  :title="`${month.name} ${selectedYear} - ${isMonthPaid(tenant.id, month.value) ? 'Paid' : 'Unpaid'}`"
                >
                  {{ month.short }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tenant Detail Modal -->
    <TenantDetailModal
      v-if="tenantDetailVisible"
      :visible="tenantDetailVisible"
      :tenant="selectedTenant"
      :year="selectedYear"
      :payments="getTenantPayments(selectedTenant?.id)"
      @close="closeTenantModal"
      @update-payment="updatePayment"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TenantDetailModal from './TenantDetailModal.vue'

interface Building {
  id: number
  name: string
  address: string
  floors: number
  totalUnits: number
}

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
  building: Building | null
}>()

const emit = defineEmits<{
  close: []
}>()

const selectedYear = ref(new Date().getFullYear())
const tenantDetailVisible = ref(false)
const selectedTenant = ref<Tenant | null>(null)

const months = [
  { value: 1, name: 'January', short: 'Jan' },
  { value: 2, name: 'February', short: 'Feb' },
  { value: 3, name: 'March', short: 'Mar' },
  { value: 4, name: 'April', short: 'Apr' },
  { value: 5, name: 'May', short: 'May' },
  { value: 6, name: 'June', short: 'Jun' },
  { value: 7, name: 'July', short: 'Jul' },
  { value: 8, name: 'August', short: 'Aug' },
  { value: 9, name: 'September', short: 'Sep' },
  { value: 10, name: 'October', short: 'Oct' },
  { value: 11, name: 'November', short: 'Nov' },
  { value: 12, name: 'December', short: 'Dec' }
]

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
})

// Sample tenants data
const tenants = ref<Tenant[]>([
  { id: 1, name: 'John Smith', unit: 'A101', phone: '+1234567890', buildingId: 1 },
  { id: 2, name: 'Sarah Johnson', unit: 'A102', phone: '+1234567891', buildingId: 1 },
  { id: 3, name: 'Mike Wilson', unit: 'B201', phone: '+1234567892', buildingId: 1 },
  { id: 4, name: 'Emily Davis', unit: 'B202', phone: '+1234567893', buildingId: 1 },
  { id: 5, name: 'David Brown', unit: 'C301', phone: '+1234567894', buildingId: 2 },
  { id: 6, name: 'Lisa Garcia', unit: 'C302', phone: '+1234567895', buildingId: 2 }
])

// Sample payments data
const payments = ref<Payment[]>([
  // John Smith payments
  { tenantId: 1, year: 2024, month: 1, paid: true },
  { tenantId: 1, year: 2024, month: 2, paid: true },
  { tenantId: 1, year: 2024, month: 3, paid: false },
  { tenantId: 1, year: 2024, month: 4, paid: true },
  { tenantId: 1, year: 2024, month: 5, paid: true },
  { tenantId: 1, year: 2024, month: 6, paid: false },
  { tenantId: 1, year: 2024, month: 7, paid: true },
  { tenantId: 1, year: 2024, month: 8, paid: true },
  { tenantId: 1, year: 2024, month: 9, paid: true },
  { tenantId: 1, year: 2024, month: 10, paid: false },
  { tenantId: 1, year: 2024, month: 11, paid: true },
  { tenantId: 1, year: 2024, month: 12, paid: true },
  
  // Sarah Johnson payments
  { tenantId: 2, year: 2024, month: 1, paid: true },
  { tenantId: 2, year: 2024, month: 2, paid: false },
  { tenantId: 2, year: 2024, month: 3, paid: true },
  { tenantId: 2, year: 2024, month: 4, paid: true },
  { tenantId: 2, year: 2024, month: 5, paid: false },
  { tenantId: 2, year: 2024, month: 6, paid: true },
  { tenantId: 2, year: 2024, month: 7, paid: true },
  { tenantId: 2, year: 2024, month: 8, paid: false },
  { tenantId: 2, year: 2024, month: 9, paid: true },
  { tenantId: 2, year: 2024, month: 10, paid: true },
  { tenantId: 2, year: 2024, month: 11, paid: false },
  { tenantId: 2, year: 2024, month: 12, paid: true }
])

const buildingTenants = computed(() => {
  if (!props.building) return []
  return tenants.value.filter(tenant => tenant.buildingId === props.building.id)
})

function isMonthPaid(tenantId: number, month: number): boolean {
  const payment = payments.value.find(p => 
    p.tenantId === tenantId && 
    p.year === selectedYear.value && 
    p.month === month
  )
  return payment?.paid || false
}

function getTenantPayments(tenantId: number | undefined): Payment[] {
  if (!tenantId) return []
  return payments.value.filter(p => 
    p.tenantId === tenantId && 
    p.year === selectedYear.value
  )
}

function onYearChange() {
  // Year changed, payment grid will update automatically
}

function openTenantModal(tenant: Tenant) {
  selectedTenant.value = tenant
  tenantDetailVisible.value = true
}

function closeTenantModal() {
  tenantDetailVisible.value = false
  selectedTenant.value = null
}

function updatePayment(tenantId: number, month: number, paid: boolean) {
  const existingPayment = payments.value.find(p => 
    p.tenantId === tenantId && 
    p.year === selectedYear.value && 
    p.month === month
  )
  
  if (existingPayment) {
    existingPayment.paid = paid
  } else {
    payments.value.push({
      tenantId,
      year: selectedYear.value,
      month,
      paid
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
  z-index: 9999;
}

.modal-content {
  background: var(--primary-bg);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--shadow-medium);
  width: 95vw;
  max-width: 1000px;
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

.year-selector {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    color: var(--primary-text);
    font-weight: 600;
  }

  select {
    padding: 0.5rem;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background: var(--secondary-bg);
    color: var(--primary-text);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-text);
    }
  }
}

.tenants-list {
  display: grid;
  gap: 1.5rem;
}

.tenant-card {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  &:hover {
    border-color: var(--primary-text);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px var(--shadow-light);
  }
}

.tenant-info {
  flex: 1;

  h4 {
    color: var(--primary-text);
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: var(--muted-text);
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.25rem;
  flex-shrink: 0;
}

.payment-square {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &.paid {
    background: #22c55e;
    color: white;
  }

  &.unpaid {
    background: #ef4444;
    color: white;
  }

  &:hover {
    transform: scale(1.1);
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

  .tenant-card {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .payment-grid {
    grid-template-columns: repeat(6, 1fr);
    justify-self: center;
  }

  .payment-square {
    width: 28px;
    height: 28px;
    font-size: 0.6rem;
  }
}
</style>