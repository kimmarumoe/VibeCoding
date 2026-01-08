const About = () => {
  return (
    <div className="card">
      <div className="section-title">About LDA</div>
      <p className="subtle">Lego Design Aid는 “이미지를 실제로 만들 수 있는 설계로 바꾸는 것”에 집중합니다.</p>

      <h3 className="section-title">기획 의도</h3>
      <p>
        이미지 변환 서비스는 많지만, 실제 조립을 위해 필요한 정보(격자/팔레트/브릭 리스트)가 충분하지
        않습니다. LDA는 분석 결과를 설계도에 맞게 구조화해 제공하고, 단계별 조립은 필요할 때만 생성합니다.
      </p>

      <h3 className="section-title">기술 스택</h3>
      <p>React + Vite (Vercel), FastAPI (Render)</p>

      <h3 className="section-title">구조/아키텍처</h3>
      <p>
        프론트에서 이미지를 업로드하면 `/api/guide/analyze`로 요청하고, 응답 JSON의 meta/palette/bricks를
        정규화하여 모자이크 프리뷰와 요약 정보를 렌더링합니다.
      </p>

      <h3 className="section-title">구현 철학</h3>
      <p>점진적 공개(Progressive Disclosure), 콜드스타트 UX, 스키마 불일치에 대한 견고한 정규화.</p>

      <h3 className="section-title">로드맵</h3>
      <p>MVP → V1(브릭 리스트 정확도 개선) → V1.5(설계도 인쇄) → V2(조립 가이드 자동 최적화)</p>

      <h3 className="section-title">현재 이슈/리스크</h3>
      <p>
        콜드스타트로 인해 첫 요청이 지연될 수 있으며, 프리뷰 데이터가 없는 응답을 방지하기 위해 프론트에서
        fallback grid를 준비했습니다.
      </p>
    </div>
  );
};

export default About;
