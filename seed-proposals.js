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
    title: "A안",
    conceptTitle: "The Venue",
    conceptSubtitle: "재즈가 흐르는 프리미엄 카페",
    logoUrl: "/images/the_venue_logo.jpg",
    cards: [
      {
        id: "core",
        title: "핵심 정체성 (Core Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&q=80&w=800",
        summarySentence: "바쁜 일상의 속도를 늦추고, 수준 높은 커피 향과 잔잔한 재즈 선율 속에 머무는 어른들의 안식처",
        fields: [
          { id: "mission", label: "브랜드 미션 (Mission)", type: "textarea", value: "도심의 소음에서 벗어나, 1~2인의 손님이 맛있는 스페셜티 커피와 함께 자신만의 속도(Slow)로 깊은 대화나 사색을 즐길 수 있는 밀도 높은 시간을 제공한다." },
          { id: "vision", label: "브랜드 비전 (Vision)", type: "textarea", value: "단순한 카페를 넘어, 성숙한 취향의 어른들이 언제든 찾아와 위로를 받는 프라이빗한 아지트(Venue)가 된다." }
        ]
      },
      {
        id: "target",
        title: "타겟 고객 및 차별화 (Target & USP)",
        thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        summarySentence: "번잡함을 피해 수준 높은 커피와 휴식을 찾는 20대 중반 ~ 40대",
        fields: [
          { id: "primary_target", label: "주요 타겟 (Primary)", type: "textarea", value: "왁자지껄한 대형 카페에 지쳐, 아침의 여유로운 '모닝커피'나 퇴근 후 차분한 시간을 원하는 성숙한 취향의 고객들 (어포더블 프리미엄 지향)" },
          { id: "usp", label: "차별화 강점 (USP)", type: "textarea", value: "1. 묵직한 바디감의 수준 높은 시그니처 커피 라인업\n2. 커피의 향을 돋워주는 큐레이션 재즈 플레이리스트\n3. 소리가 울리지 않도록 어쿠스틱 케어(흡음재)가 완비된 안락한 공간" }
        ]
      },
      {
        id: "visual",
        title: "시각적 정체성 (Visual Identity)",
        thumbnailUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
        summarySentence: "빛과 그림자가 대비되는 클래식한 유럽 감성의 무드",
        fields: [
          { id: "mood", label: "브랜드 무드", type: "text", value: "어두운 조도 속 각 테이블을 감싸는 따뜻한 조명, 푹신한 암체어, 유럽 클래식 감성" },
          { id: "color", label: "메인 컬러", type: "text", value: "Deep Walnut (짙은 원목), Warm Amber (호박색 조명), Muted Forest Green" }
        ]
      },
      {
        id: "space",
        title: "공간 경험 및 메뉴 (Space & Menu)",
        thumbnailUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
        summarySentence: "바(Bar) 8인석과 2~4인용 소형 테이블이 아늑하게 공존하는 골목의 쉼터",
        fields: [
          { id: "interior", label: "공간 기획 (Interior)", type: "textarea", value: "라이브 공연이 없는 차분한 음악 감상 공간. 1인 손님과 소통하기 좋은 메인 바(Bar) 테이블 8석. 2인 테이블 4개, 4인 테이블 2개로 구성된 총 24석 규모의 콤팩트하고 아늑한 동선." },
          { id: "beverage", label: "시그니처 메뉴", type: "textarea", value: "묵직한 기본기를 자랑하는 에스프레소 베리에이션. 와인 등 주류는 배제하고 커피 본연의 맛을 방해하지 않는 가벼운 구움과자 및 핑거푸드 위주의 디저트 라인업." }
        ]
      }
    ]
  },
  {
    title: "B안",
    conceptTitle: "B안 컨셉",
    conceptSubtitle: "미니멀 화이트 커뮤니티형",
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
