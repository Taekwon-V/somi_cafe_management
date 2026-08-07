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
