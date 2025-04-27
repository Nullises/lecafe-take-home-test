import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import useOpenDrawer from '@/presentation/hooks/useOpenDrawer'

const index = () => {
    const { isDrawerOpen } = useOpenDrawer()
    return (
        <SafeAreaView className='h-screen bg-drawerpink'>
            {
                !isDrawerOpen && (
                    <CustomHeader />
                )
            }
            <View className="flex-1 items-center justify-center">

                <View className="flex-1 items-center justify-center">
                    <Text className='font-mavenpro-bold text-xl text-textwhite'>Ajustes</Text>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default index