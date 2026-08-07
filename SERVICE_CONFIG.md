# 웹 서비스 설정 가이드 (somi_cafe_management)

이 문서는 카페 창업 관리 앱(`somi_cafe_management`)을 위한 웹 서비스 및 인프라 설정 정보입니다.

## 1. 프로젝트 및 깃(Git) 정보
- **프로젝트 명**: `somi_cafe_management`
- **Repository URL**: `https://github.com/Taekwon-V/somi_cafe_management.git`
- **기본 브랜치**: `main`
- **배포 플랫폼**: Vercel (프로젝트명: `somi-cafe-management`)

## 2. 웹 기동 및 프레임워크 설정
- **프레임워크**: React + Vite + TypeScript
- **개발 서버 실행 명령어**: `npm run dev`
- **빌드 명령어**: `npm run build`
- **주요 라이브러리 (권장)**: 
  - **UI/디자인**: MUI (Material-UI), Emotion
  - **라우팅**: React Router DOM (`react-router-dom`)
  - **차트**: Recharts

## 3. 데이터베이스(DB) 및 인증 (Backend)
- **데이터베이스 및 백엔드 서비스**: Firebase (프로젝트명: `somi-cafe-management`)
- **사용자 인증**: Google OAuth (`@react-oauth/google`) 및 Firebase Authentication
