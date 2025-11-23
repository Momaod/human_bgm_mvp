# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

* 폴더, 파일 위치 트리

human-bgm-mvp/
├── node_modules/     (npm install로 설치된 '부품'들 - 신경 안 써도 됨)
├── public/           (이미지 등 정적 파일 넣는 곳)
├── src/              (⭐️ 여기가 님의 '작업장'입니다)
│   ├── assets/       (Vite가 만든 기본 폴더)
│   ├── App.css       (✅ 4단계에서 붙여넣을 CSS 파일)
│   ├── App.jsx       (✅ 4단계에서 붙여넣을 React 메인 파일)
│   ├── firebase.js   (✅ 1단계에서 님이 방금 만든 'Firebase 열쇠' 파일)
│   ├── index.css     (기본 CSS)
│   └── main.jsx      (React 시작 파일)
├── .gitignore        (git 관리 파일)
├── index.html        (웹사이트의 뼈대)
├── package.json      (프로젝트 '설계도' - firebase 등이 여기에 기록됨)
└── vite.config.js    (Vite 설정 파일)