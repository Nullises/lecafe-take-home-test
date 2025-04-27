import { View, Text, Image, TouchableOpacity, Pressable } from "react-native"
import React from "react"
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import profilePhoto from "@/assets/images/profile.png"
import Logout from "@/assets/icons/Logout"
import { onToggleDrawer } from "@/presentation/utils/onToggleDrawer"
import { useNavigation } from 'expo-router'
import XMark from "@/assets/icons/XMark"

const CustomDrawer = (props: DrawerContentComponentProps) => {

    const navigation = useNavigation()
    return (
        <DrawerContentScrollView {...props}>
            <View className="flex items-start justify-start">
                <Pressable onPress={() => onToggleDrawer(navigation)}>
                    <XMark />
                </Pressable>
            </View>
            <View className="p-5 mb-5 items-center">
                <Image
                    source={profilePhoto}
                    className="w-24 h-24 rounded-full mb-3"
                />
                <Text className="font-quicksand-bold text-md text-textwhite">Andrea, 20</Text>
                <Text className="font-mavenpro-bold text-sm text-textwhite">Surco</Text>
            </View>
            <DrawerItemList {...props} />


            <View className="mt-auto p-5">
                <TouchableOpacity
                    onPress={() => {
                        console.log("Cerrar sesión")
                    }}
                    className="flex-row items-center justify-between"
                >
                    <Logout />
                    <Text className="font-mavenpro-bold text-sm text-textwhite">Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer
