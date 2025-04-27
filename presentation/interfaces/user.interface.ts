import { UserLists } from "../enum/userLists.enum";

export interface UserInterface {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
  isNear: boolean;
  nearKm: number;
  country: string;
  interests: string[];
  selfConsider: boolean;
  selfConsiderTag: string;
  match: boolean;
  urlImg: string;
  lists: UserLists[];
}

export interface SplitListsAccumulator {
  friendshipList: UserInterface[];
  relationshipList: UserInterface[];
  datesList: UserInterface[];
}