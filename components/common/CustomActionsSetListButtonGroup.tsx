import { View, Text } from 'react-native'
import React from 'react'
import CustomSetListButton from '../CustomSetListButton'
import Friendship from '@/assets/icons/Friendship'
import Dates from '@/assets/icons/Dates'
import Relationship from '@/assets/icons/Relationship'
import { UserLists } from '@/presentation/enum'

const CustomActionsSetListButtonGroup = ({
    selectedList,
    handleSelectList
}: {
    selectedList: string,
    handleSelectList: (selectedList: string) => void
}) => {
    return (
        <View className='flex-1 flex-row items-center justify-center gap-2'>
            <View className='flex-1 items-center justify-center flex-col'>
                <CustomSetListButton selected={selectedList == UserLists.FRIENDSHIP} onPress={() => handleSelectList(UserLists.FRIENDSHIP)} >
                    <Friendship />
                </CustomSetListButton >
                <Text className='font-mavenpro-bold text-smbold text-white'>Amistad</Text>
            </View>

            <View className='flex-1 items-center justify-center flex-col'>
                <CustomSetListButton selected={selectedList == UserLists.DATES} onPress={() => handleSelectList(UserLists.DATES)} >
                    <Dates />
                </CustomSetListButton >
                <Text className='font-mavenpro-bold text-smbold text-white'>Citas</Text>
            </View>
            <View className='flex-1 items-center justify-center flex-col'>
                <CustomSetListButton selected={selectedList == UserLists.RELATIONSHIP} onPress={() => handleSelectList(UserLists.RELATIONSHIP)} >
                    <Relationship />
                </CustomSetListButton >
                <Text className='font-mavenpro-bold text-smbold text-white'>Relación</Text>
            </View>
        </View>
    )
}

export default CustomActionsSetListButtonGroup