# md 파일 수정했음 <br>

- 진짜 하나도 모르겠어요


# 💰 가계부 대시보드 (Personal Finance Dashboard)

> Vue 3 + Pinia + json-server를 활용한 현대적이고 반응형 가계부 웹 애플리케이션

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js)
![Pinia](https://img.shields.io/badge/Pinia-State%20Management-FFD500?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 목차

- [✨ 주요 기능](#-주요-기능)
- [🛠️ 기술 스택](#-기술-스택)
- [📂 프로젝트 구조](#-프로젝트-구조)
- [🚀 시작하기](#-시작하기)
- [💡 핵심 코드](#-핵심-코드)
- [🖼️ 실행 화면](#-실행-화면)
- [📊 데이터 구조](#-데이터-구조)
- [🎯 API 엔드포인트](#-api-엔드포인트)
- [📝 라이선스](#-라이선스)

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📊 **대시보드 분석** | 총 수입, 지출, 잔액, 거래 건수 한눈에 확인 |
| 📈 **추이 차트** | Google Charts 영역형 차트로 월별 수입·지출 추이 시각화 |
| 🥧 **카테고리 분석** | 도넛형 차트로 카테고리별 지출 분포 확인 |
| 💳 **거래 내역 관리** | 최근 거래 5건 표시, 검색/필터/삭제 기능 |
| 🎨 **반응형 UI** | Bootstrap 5로 모바일, 태블릿, 데스크톱 완벽 지원 |
| ⚡ **빠른 성능** | Vite 기반 번들링으로 즉시 로딩 |
| 🔄 **실시간 동기화** | Pinia 상태 관리로 컴포넌트 간 자동 동기화 |

---

## 🛠️ 기술 스택

### Frontend
| 기술 | 버전 | 역할 |
|------|------|------|
| **Vue 3** | 3.x | 프론트엔드 프레임워크 (Composition API) |
| **Pinia** | Latest | 상태 관리 라이브러리 |
| **Vue Router** | 4 | 클라이언트 라우팅 |
| **Axios** | Latest | HTTP 클라이언트 (API 통신) |
| **Bootstrap 5** | 5.x | UI 프레임워크 |
| **Google Charts** | Latest | 데이터 시각화 라이브러리 |
| **Font Awesome** | 6 | 아이콘 라이브러리 |

### Backend & Tools
| 기술 | 역할 |
|------|------|
| **json-server** | Mock REST API 서버 |
| **Vite** | 고속 빌드 도구 |
| **npm** | 패키지 관리자 |

### 언어 구성
- **Vue**: 65.6%
- **JavaScript**: 22%
- **CSS**: 8.1%
- **HTML**: 4.3%

---

## 📂 프로젝트 구조

```
ai-lovable/
├── src/
│   ├── stores/
│   │   ├── api.js                      # Axios 인스턴스 (json-server 연결)
│   │   └── transactionStore.js         # Pinia Store (Composition API)
│   ├── components/
│   │   ├── StatCard.vue                # 통계 카드 컴포넌트
│   │   ├── PieChart.vue                # 카테고리별 지출 도넛 차트
│   │   └── TrendChart.vue              # 월별 수입·지출 영역 차트
│   ├── views/
│   │   ├── Dashboard.vue               # 메인 대시보드 페이지
│   │   └── Transactions.vue            # 거래 내역 조회 페이지
│   ├── router/
│   │   └── index.js                    # Vue Router 설정
│   ├── App.vue                         # 루트 컴포넌트
│   ├── main.js                         # 애플리케이션 진입점
│   └── style.css                       # 전역 스타일
├── public/
│   └── index.html
├── db.json                             # 100개 샘플 거래 내역 (json-server)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 시작하기

### 📋 필수 요구사항

- Node.js 14.0 이상
- npm 6.0 이상

### 설치 방법

```bash
# 1. 저장소 클론
git clone https://github.com/ParkSangho-hi/ai-lovable.git
cd ai-lovable

# 2. 의존성 설치
npm install
```

### ⚡ 실행 방법

#### 옵션 1: 한 번에 실행 (권장)
```bash
npm start
# json-server (포트 3001) + Vite (포트 5173) 동시 실행
```

#### 옵션 2: 별도로 실행
```bash
# 터미널 1 - Mock API 서버 시작
npm run server
# → http://localhost:3001

# 터미널 2 - 개발 서버 시작
npm run dev
# → http://localhost:5173
```

### 🌐 접속

브라우저에서 아래 URL로 접속하세요:
```
http://localhost:5173
```

---

## 💡 핵심 코드

### 1️⃣ Pinia Store 설정 (transactionStore.js)

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useTransactionStore = defineStore('transaction', () => {
  // 상태
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 계산된 속성
  const totalIncome = computed(() =>
    transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const totalExpense = computed(() =>
    transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  // 액션
  const fetchTransactions = async () => {
    loading.value = true
    try {
      const { data } = await api.get('/transactions')
      transactions.value = data
      error.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
      transactions.value = transactions.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpense,
    balance,
    fetchTransactions,
    deleteTransaction
  }
})
```

### 2️⃣ Axios API 설정 (api.js)

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    console.log('📤 요청:', config.url)
    return config
  },
  error => {
    console.error('❌ 요청 에러:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    console.log('📥 응답:', response.data)
    return response
  },
  error => {
    console.error('❌ 응답 에러:', error)
    return Promise.reject(error)
  }
)

export default api
```

### 3️⃣ 통계 카드 컴포넌트 (StatCard.vue)

```vue
<template>
  <div class="card stat-card" :class="'border-' + color">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <p class="card-title text-muted mb-2">
            <i :class="icon"></i> {{ title }}
          </p>
          <h3 class="card-value mb-0">
            {{ formatCurrency(value) }}
          </h3>
        </div>
        <div class="stat-icon" :class="'bg-' + color">
          <i :class="icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: Number,
  icon: String,
  color: { type: String, default: 'primary' }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(value)
}
</script>

<style scoped>
.stat-card {
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  opacity: 0.1;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
```

### 4️⃣ 대시보드 페이지 (Dashboard.vue - 스니펫)

```vue
<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-md-3">
        <StatCard
          title="총 수입"
          :value="store.totalIncome"
          icon="fas fa-arrow-down"
          color="success"
        />
      </div>
      <div class="col-md-3">
        <StatCard
          title="총 지출"
          :value="store.totalExpense"
          icon="fas fa-arrow-up"
          color="danger"
        />
      </div>
      <div class="col-md-3">
        <StatCard
          title="잔액"
          :value="store.balance"
          icon="fas fa-wallet"
          color="primary"
        />
      </div>
      <div class="col-md-3">
        <StatCard
          title="거래 건수"
          :value="store.transactions.length"
          icon="fas fa-exchange-alt"
          color="info"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <TrendChart />
      </div>
      <div class="col-lg-4">
        <PieChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import StatCard from '@/components/StatCard.vue'
import TrendChart from '@/components/TrendChart.vue'
import PieChart from '@/components/PieChart.vue'

const store = useTransactionStore()

onMounted(() => {
  store.fetchTransactions()
})
</script>
```

---

## 📊 데이터 구조

### 거래(Transaction) 객체

```json
{
  "id": 1,
  "date": "2026-01-15",
  "category": "급여",
  "description": "1월 월급",
  "amount": 3000000,
  "type": "income",
  "paymentMethod": "bank_transfer"
}
```

```json
{
  "id": 2,
  "date": "2026-01-10",
  "category": "식비",
  "description": "점심 식사",
  "amount": 12000,
  "type": "expense",
  "paymentMethod": "card"
}
```

### db.json 구조

```json
{
  "transactions": [
    {
      "id": 1,
      "date": "2026-01-15",
      "category": "급여",
      "description": "1월 월급",
      "amount": 3000000,
      "type": "income",
      "paymentMethod": "bank_transfer"
    },
    {
      "id": 2,
      "date": "2026-01-10",
      "category": "식비",
      "description": "점심 식사",
      "amount": 12000,
      "type": "expense",
      "paymentMethod": "card"
    }
    // ... 100개의 샘플 거래 내역
  ]
}
```

---

## 🎯 API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| `GET` | `/transactions` | 모든 거래 내역 조회 |
| `GET` | `/transactions/:id` | 특정 거래 상세 조회 |
| `POST` | `/transactions` | 새 거래 생성 |
| `PUT` | `/transactions/:id` | 거래 정보 수정 |
| `DELETE` | `/transactions/:id` | 거래 삭제 |
| `GET` | `/transactions?type=income` | 수입만 필터링 |
| `GET` | `/transactions?type=expense` | 지출만 필터링 |
| `GET` | `/transactions?category=식비` | 카테고리별 필터링 |

### 예시 요청

```bash
# 모든 거래 조회
curl http://localhost:3001/transactions

# 수입 거래만 조회
curl http://localhost:3001/transactions?type=income

# 새 거래 추가
curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-01-20",
    "category": "급여",
    "description": "보너스",
    "amount": 500000,
    "type": "income",
    "paymentMethod": "bank_transfer"
  }'

# 거래 삭제
curl -X DELETE http://localhost:3001/transactions/1
```

---

## 🖼️ 실행 화면

### 1️⃣ 대시보드 - 통계 개요
```
┌─────────────────────────────────────────────────────────┐
│  💰 가계부 대시보드                                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ ⬇️ 총 수입    │  │ ⬆️ 총 지출    │  │ 💳 잔액      │  │
│  │ 5,000,000원  │  │ 2,500,000원  │  │ 2,500,000원  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐                                        │
│  │ 🔄 거래 건수  │                                        │
│  │    45건      │                                        │
│  └──────────────┘                                        │
└─────────────────────────────────────────────────────────┘
```

**설명**: 상단에 4개의 통계 카드가 배치되어 주요 재무 지표를 한눈에 볼 수 있습니다.

### 2️⃣ 월별 추이 차트 - 영역형 그래프
```
수입·지출 추이 (월별)
┌─────────────────────────────────────────┐
│                                    ╱╲   │
│                          ╱╲      ╱  ╲  │
│              ╱╲        ╱  ╲    ╱    ╲ │
│            ╱  ╲      ╱    ╲  ╱      ╲│
│          ╱    ╲    ╱      ╲╱        ╱│
│        ╱      ╲  ╱                ╱  │
│      ╱        ╲╱                ╱   │
│    ╱                          ╱     │
│  ╱                          ╱       │
│───────────────────────────────────────│
│ 1월  2월  3월  4월  5월  6월  7월    │
│                                      │
│ 수입 ━━━━  지출 ━━━━              │
└─────────────────────────────────────┘
```

**특징**:
- 월별 수입(파란색)과 지출(빨간색) 추이를 영역형으로 표시
- Google Charts로 구현된 동적 차트
- 마우스 호버 시 정확한 수치 표시

### 3️⃣ 카테고리별 지출 분포 - 도넛 차트
```
카테고리별 지출 분포
        ┌─────────────────┐
       ╱                   ╲
      │                     │
     │   ┌───────────┐      │
    │    │           │     │
   │    │     식비   │    │  ← 40% (1,000,000원)
   │    │  ▓▓▓▓▓▓   │    │
   │    └───────────┘     │
    │   유흥 30% (750K)  │
     │                     │
      │   교통/기타 30%   │
       ╲                   ╱
        └─────────────────┘

범례:
● 식비 40%
● 유흥 30%
● 교통 20%
● 기타 10%
```

**특징**:
- 도넛형(Doughnut) 차트로 카테고리별 지출 비율 표시
- 클릭 시 해당 카테고리의 거래 내역 필터링 (추가 기능)
- 직관적인 색상 코딩

### 4️⃣ 거래 내역 관리 페이지
```
┌──────────────────────────────────────────────────────────────┐
│ 거래 내역                        🔍 검색 [        ] 🔄 필터   │
├──────────────────────────────────────────────────────────────┤
│  날짜      │ 카테고리 │ 설명          │ 금액        │ 구분   │
├──────────────────────────────────────────────────────────────┤
│ 2026-05-07 │ 급여     │ 5월 월급      │ 3,000,000  │ 💚 수입 │
│ 2026-05-06 │ 식비     │ 저녁 식사     │    15,000  │ ❌ 지출 │
│ 2026-05-05 │ 영화     │ 영화표        │    16,500  │ ❌ 지출 │
│ 2026-05-04 │ 카페     │ 아메리카노    │     5,500  │ ❌ 지출 │
│ 2026-05-03 │ 쇼핑     │ 옷 구매       │    89,000  │ ❌ 지출 │
├──────────────────────────────────────────────────────────────┤
│ [삭제] 버튼은 각 행에 표시                                    │
└──────────────────────────────────────────────────────────────┘
```

**기능**:
- 📅 날짜순 정렬
- 🔍 카테고리/설명 검색
- ⏱️ 최신 5건 표시 (페이지네이션 지원)
- 🗑️ 개별 거래 삭제
- 💾 삭제 후 즉시 화면 반영

### 5️⃣ 반응형 디자인 - 모바일 버전
```
모바일 (480px 이하)
┌─────────────────┐
│ 💰 대시보드      │
├─────────────────┤
│ ┌───────────┐   │
│ │ ⬇️ 수입    │   │
│ │ 5,000,000 │   │
│ └───────────┘   │
│ ┌───────────┐   │
│ │ ⬆️ 지출    │   │
│ │ 2,500,000 │   │
│ └───────────┘   │
│ ┌───────────┐   │
│ │ 💳 잔액    │   │
│ │ 2,500,000 │   │
│ └───────────┘   │
│ ┌───────────┐   │
│ │ 🔄 건수    │   │
│ │    45건    │   │
│ └───────────┘   │
│                 │
│ 📊 추이 차트    │
│ (세로 스택)     │
│                 │
│ 🥧 카테고리 분포 │
│                 │
└─────────────────┘
```

---

## 🎨 디자인 특징

### 색상 팔레트
| 색상 | HEX | 사용처 |
|------|-----|--------|
| 성공(초록색) | `#28a745` | 수입 통계 카드 |
| 위험(빨간색) | `#dc3545` | 지출 통계 카드 |
| 주요(파란색) | `#007bff` | 잔액 통계 카드 |
| 정보(하늘색) | `#17a2b8` | 건수 통계 카드 |
| 밝은회색 | `#f8f9fa` | 배경 |

### UI 특징
- ✅ **Bootstrap 5** 기반의 모던하고 깔끔한 디자인
- ✅ **반응형(Responsive)** 레이아웃 - 모든 디바이스 대응
- ✅ **부드러운 애니메이션** - 호버 효과, 전환 효과
- ✅ **다크/라이트 모드** 미지원 (추후 추가 가능)
- ✅ **Font Awesome** 아이콘으로 직관적인 UI

---

## 🔧 주요 기능 상세

### 💡 Composition API 활용
```javascript
// 필터링된 거래 목록 조회
const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchesType = !selectedType.value || t.type === selectedType.value
    const matchesCategory = !selectedCategory.value || 
                           t.category === selectedCategory.value
    const matchesDate = !dateRange.value.start || 
                       (new Date(t.date) >= new Date(dateRange.value.start) &&
                        new Date(t.date) <= new Date(dateRange.value.end))
    return matchesType && matchesCategory && matchesDate
  })
})
```

### 📦 상태 관리 (Pinia)
- **중앙 집중식 상태 관리**로 컴포넌트 간 데이터 공유
- **자동 동기화**로 여러 컴포넌트 간 일관성 유지
- **액션과 계산된 속성**으로 로직 분리

### 🎨 Google Charts 통합
```javascript
// 영역형 차트 그리기
const options = {
  title: '월별 수입·지출 추이',
  curveType: 'function',
  legend: { position: 'bottom' },
  hAxis: { title: '월' },
  vAxis: { title: '금액(원)' }
}

const chart = new google.visualization.AreaChart(
  document.getElementById('curve_chart')
)
chart.draw(data, options)
```

---

## 🚀 성능 최적화

### Vite 번들링
```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true }
    }
  }
}
```

### 코드 스플리팅
- 라우트별 컴포넌트 레이지 로딩
- 불필요한 라이브러리 제외
- gzip 압축으로 번들 크기 감소

---

## 📚 폴더별 기능 설명

### `/stores`
- **api.js**: Axios 인스턴스 설정 및 인터셉터
- **transactionStore.js**: Pinia 스토어 (CRUD 로직)

### `/components`
- **StatCard.vue**: 재사용 가능한 통계 카드
- **PieChart.vue**: Google Charts 도넛 차트
- **TrendChart.vue**: Google Charts 영역 차트

### `/views`
- **Dashboard.vue**: 메인 대시보드 (통계 + 차트)
- **Transactions.vue**: 거래 내역 상세 페이지

### `/router`
- **index.js**: 라우트 설정 (대시보드, 거래 내역)

---

## 🐛 트러블슈팅

### 포트 충돌 해결
```bash
# 포트 3001이 이미 사용 중인 경우
lsof -i :3001
kill -9 <PID>

# 또는 다른 포트 사용
npm run server -- --port 3002
```

### json-server 재설정
```bash
# db.json 초기화
rm db.json
npm run reset-db
```

### 네트워크 오류
```javascript
// api.js에서 baseURL 확인
const api = axios.create({
  baseURL: 'http://localhost:3001'  // 정확한 포트 확인
})
```

---

## 🎯 향후 개선 사항

- [ ] 📱 PWA 지원 (오프라인 모드)
- [ ] 🔐 사용자 인증 시스템 (로그인)
- [ ] 📊 더 다양한 차트 옵션
- [ ] 💾 데이터 내보내기 (CSV, PDF)
- [ ] 🌙 다크 모드
- [ ] 📤 이미지 영수증 업로드
- [ ] 💬 거래 메모 및 태그 기능
- [ ] 🔔 예산 초과 알림
- [ ] 📈 고급 분석 (연간 보고서)
- [ ] 🌍 다국어 지원

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

## 👤 저자

**Park Sangho** (@ParkSangho-hi)

이 프로젝트에 대한 질문이나 제안이 있으시면 GitHub Issues를 통해 연락주세요.

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 라이브러리를 사용합니다:

- [Vue.js](https://vuejs.org/) - 프로그레시브 JavaScript 프레임워크
- [Pinia](https://pinia.vuejs.org/) - Vue 상태 관리
- [Bootstrap](https://getbootstrap.com/) - CSS 프레임워크
- [Google Charts](https://developers.google.com/chart) - 데이터 시각화
- [Font Awesome](https://fontawesome.com/) - 아이콘 라이브러리
- [json-server](https://github.com/typicode/json-server) - Mock REST API

---

**🌟 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
