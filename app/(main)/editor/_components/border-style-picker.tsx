import { Button } from "@/components/ui/button";
import { Squircle } from "lucide-react";

export const BorderStyles = {
  SQUARE: "square",
  ROUND: "round",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

type BorderStyleProps = {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
};

export default function BorderStylePicker({
  borderStyle,
  onChange,
}: BorderStyleProps) {
  function handleBorderStyleChange() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  return (
    <Button
      size="icon"
      title="Change border style"
      onClick={handleBorderStyleChange}
    >
      <Squircle className="size-5" />
    </Button>
  );
}
