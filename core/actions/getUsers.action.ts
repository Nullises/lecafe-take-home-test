import { UserInterface } from "@/presentation/interfaces/user.interface";
import fakeApiJSON from "../api/fakeApi";

const getUsersAction = async (): Promise<UserInterface[]> => {
  const response = await fakeApiJSON;
  return response;
};
export default getUsersAction;
