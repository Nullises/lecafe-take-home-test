import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { InterestsCollapsibleProps } from '@/presentation'
import CustomButtonInterests from './common/CustomButtonInterests'
import CustomActionsButtonGroup from './common/CustomActionsButtonGroup'
import { router } from 'expo-router'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming, // Para animaciones de duración fija
    interpolate,
    Extrapolate,
} from 'react-native-reanimated'
import { clsx } from 'clsx'
import ChevronDown from '@/assets/icons/ChevronDown'



const InterestsCollapsable = ({
    matchUser,
    colorGradientSchema
}: InterestsCollapsibleProps) => {

    const [isExpanded, setIsExpanded] = useState(false)


    const HEADER_SECTION_HEIGHT = 120
    const INTERESTS_SECTION_HEIGHT_ESTIMATE = !isExpanded ? 0 : 120
    const BOTTOM_BUTTONS_HEIGHT = !isExpanded ? 0 : 120
    const MIN_COLLAPSIBLE_HEIGHT = HEADER_SECTION_HEIGHT + BOTTOM_BUTTONS_HEIGHT
    const MAX_COLLAPSIBLE_HEIGHT = HEADER_SECTION_HEIGHT + INTERESTS_SECTION_HEIGHT_ESTIMATE + BOTTOM_BUTTONS_HEIGHT


    const animatedHeight = useSharedValue(MIN_COLLAPSIBLE_HEIGHT)
    const arrowRotation = useSharedValue(0)

    useEffect(() => {
        animatedHeight.value = withTiming(
            isExpanded ? MAX_COLLAPSIBLE_HEIGHT : MIN_COLLAPSIBLE_HEIGHT,
            { duration: 300 }
        )
        arrowRotation.value = withTiming(
            isExpanded ? 180 : 0,
            { duration: 300 }
        )
    }, [isExpanded, animatedHeight, arrowRotation])

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev)
    }, [])

    const collapsibleStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        }
    })

    const arrowStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${arrowRotation.value}deg` }],
        }
    });


    return (
        <Animated.View
            style={[collapsibleStyle]}
            className={clsx(
                'bg-white',
                `${isExpanded ? 'rounded-t-xl' : 'rounded-l-full'}`,
                'overflow-hidden',
            )}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: HEADER_SECTION_HEIGHT
            }}>
                <View style={{ flex: 1, padding: 30 }}>
                    <Text className="font-quicksand-bold text-textblack text-md">{matchUser?.name} {matchUser?.surname}, {matchUser?.age}</Text>
                    <Text className="font-mavenpro-regular text-textblack text-sm mb-4">{matchUser?.isNear && matchUser?.nearKm && matchUser?.nearKm > 0 && `${matchUser?.nearKm} km,`} {matchUser?.city && `${matchUser?.city}`} {matchUser?.country && `, ${matchUser?.country}`}</Text>
                </View>

                <Pressable onPress={toggleExpanded} style={{ padding: 8, position: 'absolute', top: 10, right: 10 }} className='bg-strongpinkGradient rounded-full w-[44px] h-[44px]'>
                    <Animated.View style={arrowStyle}>
                        <ChevronDown />
                    </Animated.View>
                </Pressable>
            </View>
            {
                isExpanded && (
                    <View className='flex-1 flex-col p-6'>
                        <Text className="font-quicksand-bold text-textblack text-md mb-4">Intereses</Text>
                        <View className='flex-1 flex-row flex-wrap gap-4'>
                            {
                                matchUser?.interests?.map((interest: string, index) =>
                                    <CustomButtonInterests key={index} onPress={() => { }} colorGradientSchema={colorGradientSchema!}>
                                        <Text className='absolute justify-center text-center font-mavenpro-bold text-smbold text-textwhite'>{interest}</Text>
                                    </CustomButtonInterests>)
                            }
                        </View>
                        <View className="absolute bottom-0 left-0 right-0 p-4 mb-4">
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
        </Animated.View>

    )
}

export default InterestsCollapsable