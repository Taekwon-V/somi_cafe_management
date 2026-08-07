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

const proposals = [
  {
    title: "A안 (모던 우드톤 집중형 카페)",
    cards: [
      {
        id: "core",
        title: "핵심 정체성 (Core Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
        summarySentence: "바쁜 도심 속에서 온전히 나에게 집중할 수 있는 쉼표 같은 공간",
        fields: [
          { id: "mission", label: "브랜드 미션 (Mission)", type: "textarea", value: "바쁜 도심 속에서 온전히 나에게 집중할 수 있는 쉼표 같은 공간을 제공한다." },
          { id: "vision", label: "브랜드 비전 (Vision)", type: "textarea", value: "지역 주민과 직장인들이 가장 먼저 떠올리는 영감과 휴식의 아지트가 된다." }
        ]
      },
      {
        id: "target",
        title: "타겟 고객 및 차별화 (Target & USP)",
        thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        summarySentence: "노트북 작업이나 독서를 위해 조용한 공간을 찾는 2030 프리랜서",
        fields: [
          { id: "primary_target", label: "주요 타겟 (Primary)", type: "textarea", value: "노트북 작업이나 독서를 위해 조용하고 집중하기 좋은 공간을 찾는 2030 프리랜서 및 직장인." },
          { id: "usp", label: "차별화 강점 (USP)", type: "textarea", value: "완벽한 작업/독서 환경 (콘센트, 조명, 백색소음)" }
        ]
      },
      {
        id: "visual",
        title: "시각적 정체성 (Visual Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
        summarySentence: "비 오는 날 들어가고 싶은 아늑한 월넛 나무톤 무드",
        fields: [
          { id: "mood", label: "브랜드 무드", type: "text", value: "비 오는 날 들어가고 싶은 아늑한 나무 오두막" },
          { id: "color", label: "메인 컬러", type: "text", value: "Deep Walnut (#3E2723), Muted Forest (#2E4C3C)" }
        ]
      },
      {
        id: "space",
        title: "공간 경험 및 메뉴 (Space & Menu)",
        thumbnailUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
        summarySentence: "중앙 거대 쉐어 테이블과 시그니처 딥 크림 라떼",
        fields: [
          { id: "interior", label: "공간 기획 (Interior)", type: "textarea", value: "중앙 거대 쉐어 테이블 배치. 조도를 살짝 낮추고 테이블 스탠드 배치. 재즈/로파이 힙합 재생." },
          { id: "beverage", label: "시그니처 음료", type: "textarea", value: "소미 크림 라떼, 포레스트 말차 샷" }
        ]
      }
    ]
  },
  {
    title: "B안 (미니멀 화이트 커뮤니티형)",
    cards: [
      {
        id: "core",
        title: "핵심 정체성 (Core Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
        summarySentence: "지역 커뮤니티의 밝은 에너지를 담은 소통의 장",
        fields: [
          { id: "mission", label: "브랜드 미션 (Mission)", type: "textarea", value: "누구나 가볍게 들러 인사하고 대화를 나눌 수 있는 열린 카페." }
        ]
      },
      {
        id: "target",
        title: "타겟 고객 및 차별화 (Target & USP)",
        thumbnailUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
        summarySentence: "동네 산책을 즐기는 주민들과 반려동물 반려인",
        fields: [
          { id: "primary_target", label: "주요 타겟 (Primary)", type: "textarea", value: "주말 산책객, 반려동물을 동반한 동네 주민들." }
        ]
      },
      {
        id: "visual",
        title: "시각적 정체성 (Visual Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800",
        summarySentence: "햇살이 잘 드는 통창과 화이트 & 오렌지 포인트 컬러",
        fields: [
          { id: "mood", label: "브랜드 무드", type: "text", value: "미니멀, 깨끗함, 경쾌함" },
          { id: "color", label: "메인 컬러", type: "text", value: "Pure White (#FFFFFF), Warm Orange (#FF8A65)" }
        ]
      },
      {
        id: "space",
        title: "공간 경험 및 메뉴 (Space & Menu)",
        thumbnailUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
        summarySentence: "스탠딩 에스프레소 바와 가벼운 구움 과자류",
        fields: [
          { id: "interior", label: "공간 기획 (Interior)", type: "textarea", value: "통유리창 전면 개방, 외부 벤치 좌석, 스탠딩 바 위주." }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Cleaning up old proposals...");
  const snap = await getDocs(collection(db, "branding_proposals"));
  for (const d of snap.docs) {
    await deleteDoc(d.ref);
  }
  
  console.log("Inserting new proposals...");
  for (const proposal of proposals) {
    const docRef = doc(collection(db, "branding_proposals"));
    await setDoc(docRef, {
      ...proposal,
      id: docRef.id,
      updatedAt: Date.now()
    });
    console.log(`Inserted: ${proposal.title}`);
  }
  console.log("Done!");
  process.exit(0);
}
seed().catch(console.error);
