import { Color } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

const ColorPicker: React.FC<{ onChange: (color: Color) => void }> = ({
  onChange,
}) => {
  return (
    <div className="mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2">
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 190 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 165, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 128, g: 0, b: 128 }} />
      <ColorButton onClick={onChange} color={{ r: 224, g: 255, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 240, g: 128, b: 128 }} />
      <ColorButton onClick={onChange} color={{ r: 230, g: 230, b: 250 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 215, b: 0 }} />
    </div>
  );
};

const ColorButton: React.FC<{
  onClick: (color: Color) => void;
  color: Color;
}> = ({ onClick, color }) => {
  return (
    <button
      onClick={() => onClick(color)}
      className="flex size-8 items-center justify-center transition hover:opacity-75"
    >
      <div
        className="size-8 rounded-md border border-neutral-300"
        style={{ background: colorToCSS(color) }}
      />
    </button>
  );
};

export default ColorPicker;
