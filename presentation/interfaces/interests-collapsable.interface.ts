import { UserInterface } from "./user.interface";

export interface InterestsCollapsibleProps {
  matchUser: UserInterface;
  colorGradientSchema?: { initial: string; final: string };
}
