import { UserInterface } from "..";

export interface SwipeableCardProps {
  card: UserInterface;
  onSwipeLeft: (cardId: number) => void;
  onSwipeRight: (cardId: number) => void;
  index?: number;
  totalCards?: number;
}
