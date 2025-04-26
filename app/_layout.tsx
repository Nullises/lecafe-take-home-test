import "../globals.css"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from "expo-font";

import React from "react"
import { Slot } from "expo-router"



const RootLayout = () => {

  useFonts({
    "Quiksand-Bold": require("@/assets/fonts/Quicksand/static/Quicksand-Bold.ttf"),
    "MavenPro-Regular": require("@/assets/fonts/Maven_Pro/static/MavenPro-Regular.ttf"),
    "MavenPro-Bold": require("@/assets/fonts/Maven_Pro/static/MavenPro-Bold.ttf"),
  })


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />      

    </GestureHandlerRootView>
  )
}

export default RootLayout