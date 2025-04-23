import "../globals.css"
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from "react"
import useUsers from "@/presentation/hooks/useUsers"
import LecafeSwipe from "@/components/LecafeSwipe"



const RootLayout = () => {
  const { users } = useUsers()



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center bg-gray-100">
        <LecafeSwipe initialCards={users} />
      </View>

    </GestureHandlerRootView>
  )
}

export default RootLayout