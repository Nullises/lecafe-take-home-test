import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Menu from '@/assets/icons/Menu'
import Filter from '@/assets/icons/Filter'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { onToggleDrawer } from '@/presentation/utils/onToggleDrawer'


const CustomHeader = () => {
    const navigation = useNavigation()

    return (
        <View className='flex flex-row items-center mx-6 justify-between'>
            <Pressable onPress={() => onToggleDrawer(navigation)}>
                <Menu />
            </Pressable>
            <Pressable onPress={() => { }}>
                <Filter />
            </Pressable>
        </View>
    )
}

export default CustomHeader