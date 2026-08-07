# Compound Log (개발 프로세스 개선 및 회고록)

이 문서는 `Compound` 에이전트가 개발 및 테스트 과정에서 발생한 버그, 논리 오류, 비효율적인 패턴을 기록하고, 앞으로 동일한 실수를 반복하지 않도록 규칙과 교훈을 누적하는 공간입니다.

모든 에이전트는 작업 전 이 문서를 참고하여 과거의 실수를 반복하지 않도록 주의해야 합니다.

## 기록 형식 (Format)
- **Date**: YYYY-MM-DD
- **Tags**: #관련기술 #이슈종류
- **Category**: [에러종류]
- **내용**: 발생한 문제와 향후 방지 대책(규칙)

---

### [예시 데이터]
- **Date**: 2026-08-07
- **Tags**: #firebase #auth #domain
- **Category**: [Configuration Error]
- **내용**: Vercel 배포 후 Firebase Auth 로그인 시 `auth/unauthorized-domain` 에러 발생. **[개선책]** 앞으로 새로운 호스팅 도메인으로 배포 시, 반드시 Firebase Console의 Authentication > 설정 > 승인된 도메인에 해당 주소를 추가하도록 안내해야 함.

- **Date**: 2026-08-07
- **Tags**: #workflow #rule10
- **Category**: [Workflow Rule Compliance]
- **내용**: 사용자가 "개발해"라는 트리거를 입력하기 전에는 디자인 시안이나 브레인스토밍 내용이 확정되었더라도 소스 코드 수정을 시작해서는 안 됨. **[개선책]** 자동 승인(Auto-approval)이 있더라도 이는 시스템적 권한일 뿐, 비즈니스 의사결정이 아님을 명심하고, 에이전트는 기획 단계에서 사용자의 명시적 지시를 대기하는 흐름을 철저히 준수해야 함. 이를 통해 스펙 기획과 실제 개발 에이전트 간의 순차적 흐름을 유지함.

- **Date**: 2026-08-07
- **Tags**: #ui #ux #editor
- **Category**: [UX Failure]
- **내용**: `@uiw/react-md-editor`를 위키(노션) 스타일로 사용하고자 `preview="edit"` 모드로 설정했으나, 비개발자 사용자가 볼 때 마크다운 원시 텍스트가 노출되며 세로로 글씨가 깨져 나오는 극심한 레이아웃 오류가 발생함. **[개선책]** 1) 개발자가 아닌 일반 사용자를 위한 기획 툴에는 Raw Markdown 에디터를 피할 것. 2) 방대한 텍스트 편집보다는 시각적 요소를 강조한 카드/갤러리형 UI 혹은 명확한 입력 필드(Form) 기반 접근이 더 안전하고 사용자 친화적임을 숙지할 것.

- **Date**: 2026-08-07
- **Tags**: #react #mui #workflow
- **Category**: [Build Failure]
- **내용**: Vercel 배포 시 MUI v6+ 최신 버전의 `Grid` API 변경(`item`, `xs` prop 제거 등)으로 인해 타입스크립트 빌드 에러가 발생하여 배포가 실패함. 개발 에이전트가 `test` 및 `verify` 단계를 건너뛰고 코드 작성만으로 완료 보고를 한 것이 근본 원인. **[개선책]** 1) MUI `Grid` 사용 시 버전별 API 차이가 크므로, 확실하지 않다면 `Box` 컴포넌트의 CSS Grid 속성(`display: grid`)을 활용하여 의존성과 에러 가능성을 줄일 것. 2) 어떠한 간단한 수정이라도 커밋/푸시 전에 반드시 `npm run build`나 타입 체크(`tsc`)를 실행하여 배포 가능 상태인지 확인하는 **피드백 루프(Workflow)**를 철저히 지킬 것.
