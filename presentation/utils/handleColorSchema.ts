import { Colors } from "@/constants/Colors";
import { UserLists } from "../enum";

export const handleColorGradientSchema = (
  selected: string,
  setColorGradientSchema: (initialSchema: {
    initial: string;
    final: string;
  }) => void
) => {
  if (selected == UserLists.FRIENDSHIP) {
    setColorGradientSchema({
      initial: Colors.blueGradient,
      final: Colors.purpleGradient,
    });
  }

  if (selected == UserLists.DATES) {
    setColorGradientSchema({
      initial: Colors.pinkGradient,
      final: Colors.orangeGradient,
    });
  }

  if (selected == UserLists.RELATIONSHIP) {
    setColorGradientSchema({
      initial: Colors.strongpinkGradient,
      final: Colors.pinkGradient,
    });
  }
};
