type ComingSoonProps = {
  title: string;
};

const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <div className="card">
      <div className="section-title">{title}</div>
      <p className="subtle">Coming soon. This page is reserved for future expansion.</p>
    </div>
  );
};

export default ComingSoon;
