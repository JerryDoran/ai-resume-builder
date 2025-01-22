import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

export const BorderStyles = {
  SQUARE: "square",
  ROUND: "round",
  SQUIRCLE: "squircle",
};

// will create an array of the string values
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

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "round"
        ? Circle
        : Squircle;

  return (
    <Button
      size="icon"
      title="Change border style"
      onClick={handleBorderStyleChange}
    >
      <Icon className="size-5" />
    </Button>
  );
}
