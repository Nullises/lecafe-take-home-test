import { View, Text } from 'react-native'
import React from 'react'
import LecafeSwipe from '@/components/LecafeSwipe'
import useUsers from "@/presentation/hooks/useUsers"

const DashboardScreen = () => {

    const { users } = useUsers()
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            <LecafeSwipe initialCards={users} />
        </View>
    )
}

export default DashboardScreen