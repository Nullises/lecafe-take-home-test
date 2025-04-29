import { SharedValue } from "react-native-reanimated";
import { UserInterface } from "..";

export interface SwipeableCardProps {
  card: UserInterface;
  onSwipeLeft: (cardId: number) => void;
  onSwipeRight: (cardId: number) => void;
  onSuperLike: (cardId: number) => void;
  index?: number;
  totalCards?: number;
  optionSelected: string;
  selectedList: string;
  handleSelectList: (selectedList: string) => void;
  selectedByInterestsScreen?: string;
  setSelectedByInterestsScreen?: (selectedByInterestsScreen: string) => void;
  selectedByInterestsCardId?: number;
  setSelectedByInterestsCardId: (selectedByInterestsCardId: number) => void;
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
  selectedByInterestsScreen?: string;
  setSelectedByInterestsScreen?: (selectedByInterestsScreen: string) => void;
  selectedByInterestsCardId?: number;
  setSelectedByInterestsCardId: (selectedByInterestsCardId: number) => void;
}

export interface GetSwipeCardStyles {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  nopeIndicatorOpacity: SharedValue<number>;
  likeIndicatorOpacity: SharedValue<number>;
  superLikeIndicatorOpacity: SharedValue<number>;
  nopeLikeIndicatorScale: SharedValue<number>;
  superLikeIndicatorScale: SharedValue<number>;
  overlayOpacity: SharedValue<number>;
  overlayColor: SharedValue<string>;
  index: number;
  screenWidth: number;
}
