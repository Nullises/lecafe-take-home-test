import { View, Text } from 'react-native'
import React from 'react'
import { UserInterface } from '@/presentation'
import CustomButtonInterests from './common/CustomButtonInterests'
import CustomActionsButtonGroup from './common/CustomActionsButtonGroup'
import { router } from 'expo-router'
import index from '../app/index';

const InterestsCollapsable = ({
    matchUser,
    colorGradientSchema
}: {
    matchUser: UserInterface
    colorGradientSchema: { initial: string, final: string }
}) => {
    return (
        <View className='flex-1 flex-col p-4'>
            <Text className="font-quicksand-bold text-textblack text-md">{matchUser?.name} {matchUser?.surname}, {matchUser?.age}</Text>
            <Text className="font-mavenpro-regular text-textblack text-sm mb-4">{matchUser?.isNear && matchUser?.nearKm && matchUser?.nearKm > 0 && `${matchUser?.nearKm} km,`} {matchUser?.city && `${matchUser?.city}`} {matchUser?.country && `, ${matchUser?.country}`}</Text>

            <Text className="font-quicksand-bold text-textblack text-md mt-4 mb-4">Intereses</Text>
            <View className='flex-1 flex-row flex-wrap gap-4'>
                {
                    matchUser?.interests?.map((interest: string, index) =>
                        <CustomButtonInterests key={index} onPress={() => { }} colorGradientSchema={colorGradientSchema}>
                            <Text className='absolute justify-center text-center font-mavenpro-bold text-smbold text-textwhite'>{interest}</Text>
                        </CustomButtonInterests>)
                }
            </View>
            <View className="absolute bottom-0 left-0 right-0 p-4">
                <CustomActionsButtonGroup
                    actionLeft={() => {
                        router.push({
                            pathname: "/(drawer)/dashboard",
                            params: { name: "left", cardId: matchUser.id }
                        })
                    }}
                    actionCenter={() => {
                        router.push({
                            pathname: "/(drawer)/dashboard",
                            params: { name: "center", cardId: matchUser.id }
                        })
                    }}
                    actionRight={() => {
                        router.push({
                            pathname: "/(drawer)/dashboard",
                            params: { name: "right", cardId: matchUser.id }
                        })
                    }}
                />
            </View>

        </View>
    )
}

export default InterestsCollapsable