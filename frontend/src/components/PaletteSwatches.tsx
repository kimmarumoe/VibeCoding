import { PaletteColor } from "../types/guide";

type PaletteSwatchesProps = {
  palette: PaletteColor[];
};

const PaletteSwatches = ({ palette }: PaletteSwatchesProps) => {
  return (
    <div className="palette">
      {palette.map((color) => (
        <div className="palette-swatch" key={color.id}>
          <div className="palette-color" style={{ background: color.hex }} />
          <div>
            <div>{color.name}</div>
            <div className="subtle">{color.hex}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaletteSwatches;
