import "../globals.css"
import { View, Text, SafeAreaView } from "react-native"
import React from "react"

const RootLayout = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-2xl">RootLayout</Text>
      </View>
    </SafeAreaView>

  )
}

export default RootLayout