import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtuS0tTv8XOaZKlEAm2vENgfXU35cW90M",
  authDomain: "somi-cafe-management.firebaseapp.com",
  projectId: "somi-cafe-management",
  storageBucket: "somi-cafe-management.firebasestorage.app",
  messagingSenderId: "332429514474",
  appId: "1:332429514474:web:bb78737ec63ada3231a993",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newCards = [
  {
    title: "핵심 정체성 (Core Identity)",
    thumbnailUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    fields: [
      { id: "mission", label: "브랜드 미션 (Mission)", type: "textarea", value: "바쁜 도심 속에서 온전히 나에게 집중할 수 있는 쉼표 같은 공간을 제공한다." },
      { id: "vision", label: "브랜드 비전 (Vision)", type: "textarea", value: "지역 주민과 직장인들이 가장 먼저 떠올리는 영감과 휴식의 아지트가 된다." },
      { id: "persona", label: "브랜드 페르소나", type: "textarea", value: "다정하지만 과하게 참견하지 않는, 조용히 곁을 내어주는 듬직한 사람." },
      { id: "naming", label: "네이밍 후보", type: "textarea", value: "1. Somi Coffee\n2. Pause & Ponder\n3. Mute\n4. Chapter 1" }
    ]
  },
  {
    title: "타겟 고객 및 차별화 (Target & USP)",
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    fields: [
      { id: "primary_target", label: "주요 타겟 (Primary)", type: "textarea", value: "노트북 작업이나 독서를 위해 조용하고 집중하기 좋은 공간을 찾는 2030 프리랜서 및 직장인." },
      { id: "secondary_target", label: "서브 타겟 (Secondary)", type: "textarea", value: "원두의 향미를 중요하게 생각하는 스페셜티 커피 애호가." },
      { id: "usp", label: "차별화 강점 (USP)", type: "textarea", value: "1. 완벽한 작업/독서 환경 (콘센트, 조명, 백색소음)\n2. 매달 바뀌는 게스트 원두 큐레이션\n3. 와이파이가 터지지 않는 디지털 디톡스 존" }
    ]
  },
  {
    title: "시각적 정체성 (Visual Identity)",
    thumbnailUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
    fields: [
      { id: "mood", label: "브랜드 무드", type: "text", value: "비 오는 날 들어가고 싶은 아늑한 나무 오두막" },
      { id: "color", label: "메인 컬러", type: "text", value: "Deep Walnut (#3E2723), Muted Forest (#2E4C3C)" },
      { id: "logo", label: "로고 스타일", type: "text", value: "커피잔 로고를 배제한, 세리프(명조체) 기반의 미니멀 텍스트 워드마크" }
    ]
  },
  {
    title: "공간 경험 및 메뉴 (Space & Menu)",
    thumbnailUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    fields: [
      { id: "interior", label: "공간 기획 (Interior)", type: "textarea", value: "중앙 거대 쉐어 테이블 배치. 조도를 살짝 낮추고 테이블 스탠드 배치. 재즈/로파이 힙합 재생." },
      { id: "beverage", label: "시그니처 음료", type: "textarea", value: "1. 소미 크림 라떼\n2. 포레스트 말차 샷\n3. 애플 시나몬 릴렉서 (논커피)" },
      { id: "dessert", label: "디저트 라인업", type: "textarea", value: "꾸덕한 수제 버터바 (오리지널, 황치즈), 바질 토마토 크림치즈 크로플" }
    ]
  }
];

async function seed() {
  console.log("Cleaning up old docs...");
  const snap = await getDocs(collection(db, "branding_docs"));
  for (const d of snap.docs) {
    await deleteDoc(d.ref);
  }
  
  console.log("Inserting new gallery cards...");
  for (const card of newCards) {
    const docRef = doc(collection(db, "branding_docs"));
    await setDoc(docRef, {
      ...card,
      id: docRef.id,
      updatedAt: Date.now()
    });
    console.log(`Inserted: ${card.title}`);
  }
  console.log("Done!");
  process.exit(0);
}
seed().catch(console.error);
