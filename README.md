# 가계부 대시보드 (Vue 3 + Pinia + json-server)

## 기술 스택
- Vue 3 (Composition API, ES6)
- Pinia (상태관리)
- Vue Router 4
- axios (HTTP 클라이언트)
- json-server (Mock REST API)
- Bootstrap 5
- Google Charts
- Font Awesome 6

## 실행 방법
```bash
npm install
npm start          # json-server(3001) + vite(5173) 동시 실행
```

또는 따로:
```bash
npm run server     # json-server :3001
npm run dev        # vite :5173
```

브라우저에서 http://localhost:5173 접속.

## 프로젝트 구조
```
src/
├── stores/
│   ├── api.js                 # axios 인스턴스 (json-server 연결)
│   └── transactionStore.js    # Pinia store (Composition API)
├── components/
│   ├── StatCard.vue
│   ├── PieChart.vue           # Google Charts 도넛
│   └── TrendChart.vue         # Google Charts 영역
├── views/
│   ├── Dashboard.vue
│   └── Transactions.vue
├── router/index.js
├── App.vue
└── main.js
db.json                        # 100개 샘플 거래내역
```

## 기능
- 총 수입/지출/잔액/거래 건수 통계 카드
- 월별 수입·지출 추이 (Area Chart)
- 카테고리별 지출 분포 (Pie Chart)
- 최근 거래 5건
- 거래 내역 검색 / 필터 / 삭제
