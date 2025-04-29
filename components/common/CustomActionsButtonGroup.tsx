import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import Dislike from '@/assets/icons/Dislike'
import CustomLikeButton from '../CustomLikeButton'
import Check from '@/assets/icons/Check'

interface CustomActionsButtonGroupProps {
    actionLeft: () => void
    actionCenter: () => void
    actionRight: () => void
}

const CustomActionsButtonGroup = ({
    actionLeft,
    actionRight,
    actionCenter
}: CustomActionsButtonGroupProps) => {
    return (
        <View className='flex-1 flex-row items-center justify-center gap-4'>
            <CustomButton onPress={actionLeft} btnColor={'bg-buttonlightpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                <Dislike />
            </CustomButton>
            <CustomLikeButton onPress={actionCenter} />
            <CustomButton onPress={actionRight} btnColor={'bg-buttonpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                <Check />
            </CustomButton>
        </View>
    )
}

export default CustomActionsButtonGroup