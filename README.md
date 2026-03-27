# 🚀 React + TypeScript + Vite Project

이 프로젝트는 **Vite 8** 기반의 고성능 React 프런트엔드 템플릿입니다. 
빠른 빌드를 위해 Vite 8을 적용하였고, 확장성과 유지보수성을 고려한 시니어 레벨의 아키텍처를 지향합니다.

## 🛠 Tech Stack

- **Framework**: [React 19+](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/) (with `@vitejs/plugin-react`)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (Client), TanStack Query v5 (Server)
- **Styling**: Tailwind CSS
- **Linting & Formatting**: ESLint (Flat Config v9+), Prettier

---

## 📦 Getting Started

### 1. Prerequisite
- Node.js 20.x 이상 권장
- [pnpm](https://pnpm.io/) (권장 패키지 매니저)

### 2. Installation
```bash
pnpm install
```

### 3. Development
```bash
pnpm dev
```

### 4. Build & Preview
```bash
# Production 빌드
pnpm build

# 빌드 결과물 로컬 확인
pnpm preview
```

## 📂 Project Structure (Layered Architecture)
프로젝트는 도메인 중심의 계층형 구조(Features-based)를 따릅니다.

```text
src/
├── @types/          # 전역 TypeScript 타입 정의
├── api/             # Axios 인스턴스 및 공통 API 설정
├── assets/          # 이미지, 아이콘, 폰트
├── components/      # 재사용 가능한 공통 UI 컴포넌트 (Atomic Design 등)
│   ├── common/      # Button, Input, Modal 등
│   └── layout/      # Header, Sidebar, Footer
├── features/        # [핵심] 도메인별 기능 단위 분리 (Vertical Slices)
│   ├── auth/        # 인증 관련 (Login, Signup)
│   │   ├── components/
│   │   ├── hooks/      # 해당 도메인 전용 Custom Hooks (useAuth 등)
│   │   ├── services/   # TanStack Query (useQuery, useMutation)
│   │   └── slice.ts    # Redux Toolkit Slice (클라이언트 상태)
│   └── user/        # 사용자 프로필 관련
├── hooks/           # 전역 공통 Hooks (useDebounce, useLocalStorage 등)
├── pages/           # 라우트 단위 페이지 컴포넌트
├── store/           # Redux Root Store 설정 및 공통 Middleware
├── utils/           # 순수 함수 (formatDate, validation 등)
└── App.tsx          # 라우터 및 Provider 설정
```

- src/api/: Axios 인스턴스 및 전역 API 설정

- src/components/: 전역 공통 UI 컴포넌트 (Button, Input 등)

- src/features/: 도메인별 응집된 기능 단위

  - [domain]/services/: TanStack Query (Server State)

  - [domain]/slice.ts: Redux Toolkit (Client State)

  - [domain]/hooks/: 도메인 전용 커스텀 훅

- src/store/: Redux Root Store 및 미들웨어

## 🎨 Code Convention & Standards

### 1. Path Alias
`@/` 프리픽스를 사용하여 절대 경로를 지원합니다.

- `import { Button } from '@/components/common/Button'`

### 2. Linting (ESLint Flat Config)
- Import Order: 외부 라이브러리 -> 내부 절대 경로(`@/`) -> 상대 경로 순으로 자동 정렬됩니다.

- Rules of Hooks: React Hooks 규칙이 엄격하게 적용됩니다.

- Tailwind CSS: 클래스 순서가 Prettier 플러그인에 의해 자동 교정됩니다.

### 3. VS Code Integration
최적의 개발 경험을 위해 다음 설정을 권장합니다.

- 설치 권장 확장 프로그램: `ESLint`, `Prettier`, `Tailwind CSS IntelliSense`

- 설정: `settings.json`에 포함된 `editor.codeActionsOnSave`를 통해 저장 시 자동 수정을 활성화하세요.

## 💡 Engineering Tips
- Server State vs Client State: 서버 데이터는 `TanStack Query`로 관리하고, `Redux`에는 UI 상태(모달, 다크모드 등)만 담으세요.

- Performance: Vite 8 사용하여 최대 30배 빠른 컴파일 속도를 유지합니다.

- Standard: 런타임 에러 방지를 위해 TypeScript의 `strict` 모드와 ESLint의 `exhaustive-deps`를 준수합니다.
