import { DrawerActions, DrawerActionType } from "@react-navigation/native";
export const onToggleDrawer = (navigation: {
  dispatch: (arg0: () => DrawerActionType) => void;
}) => {
  navigation.dispatch(DrawerActions.toggleDrawer);
};
