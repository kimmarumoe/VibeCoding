import { BrickCell, GuideMeta } from "../types/guide";

type BrickMosaicPreviewProps = {
  meta: GuideMeta;
  bricks: BrickCell[];
};

const BrickMosaicPreview = ({ meta, bricks }: BrickMosaicPreviewProps) => {
  const colorMap = new Map<string, string>();
  bricks.forEach((brick) => {
    colorMap.set(`${brick.x}-${brick.y}`, brick.color);
  });

  const cells = [];
  for (let y = 0; y < meta.gridHeight; y += 1) {
    for (let x = 0; x < meta.gridWidth; x += 1) {
      const color = colorMap.get(`${x}-${y}`) ?? "#e0e0e0";
      cells.push(<div key={`${x}-${y}`} className="mosaic-cell" style={{ background: color }} />);
    }
  }

  return (
    <div>
      <div className="section-title">Mosaic preview</div>
      <div
        className="mosaic-grid"
        style={{ gridTemplateColumns: `repeat(${meta.gridWidth}, minmax(0, 1fr))` }}
      >
        {cells}
      </div>
    </div>
  );
};

export default BrickMosaicPreview;
