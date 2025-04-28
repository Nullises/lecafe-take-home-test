import { UserInterface } from "..";

export interface SwipeableCardProps {
  card: UserInterface;
  onSwipeLeft: (cardId: number) => void;
  onSwipeRight: (cardId: number) => void;
  onSuperLike: (cardId: number) => void;
  index?: number;
  totalCards?: number;
  superLikeSelected?: {
    selected: boolean;
    selectedId: number;
  };
  selectedList: string;
  handleSelectList: (selectedList: string) => void;
}

export interface SwipeableCardHandle {
  swipeLeft: () => void;
  swipeRight: () => void;
  superLike: () => void;
}

export interface LecafeSwipeProps {
  friendshipList: UserInterface[];
  relationshipList: UserInterface[];
  datesList: UserInterface[];
  selectedList: string;
  setSelectedList: (selectedList: string) => void;
}