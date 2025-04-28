
import React, { useCallback } from 'react'
import { View, Text, Dimensions } from 'react-native' // Importamos Text
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
    runOnJS,
    interpolate,
} from 'react-native-reanimated'
import { clsx } from 'clsx'
import { Image } from 'expo-image'
import { SwipeableCardProps } from '@/presentation/interfaces'
import CustomButton from './CustomButton'
import Dislike from '@/assets/icons/Dislike'
import Like from '@/assets/icons/Like'
import Check from '@/assets/icons/Check'
import LikeWhite from '@/assets/icons/LikeWhite'
import CustomLikeButton from './CustomLikeButton'
import CustomSetListButton from './CustomSetListButton'
import Friendship from '@/assets/icons/Friendship'
import { UserLists } from '@/presentation'
import Dates from '@/assets/icons/Dates'
import Relationship from '@/assets/icons/Relationship'



const { width: screenWidth } = Dimensions.get('window')
const SWIPE_THRESHOLD = screenWidth / 4

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    card,
    onSwipeLeft,
    onSwipeRight,
    onSuperLike,
    index = 0,
    totalCards = 1,
    superLikeSelected,
    selectedList,
    handleSelectList
}) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const handleSwipeComplete = useCallback(
        (direction: 'left' | 'right') => {
            if (direction === 'left') {
                onSwipeLeft(card.id)
            } else if (direction === 'right') {
                onSwipeRight(card.id)
            } 
        },
        [card.id, onSwipeLeft, onSwipeRight]
    )

    const triggerSwipeAnimation = useCallback(
        (direction: 'left' | 'right') => {
            const finalPositionX = direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5

            translateX.value = withSpring(finalPositionX, { duration: 200 }, (isFinished) => {
                if (isFinished) {
                    runOnJS(handleSwipeComplete)(direction)
                }
            })

            translateY.value = withSpring(0)
        },
        [translateX, translateY, handleSwipeComplete, screenWidth]
    );


    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startX: number; startY: number }
    >({
        onActive: (event) => {
            translateX.value = event.translationX
            translateY.value = event.translationY
        },
        onEnd: (event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                translateX.value = withSpring(screenWidth * 1.5, { duration: 200 }, () => {
                    runOnJS(triggerSwipeAnimation)('right')
                })
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-screenWidth * 1.5, { duration: 200 }, () => {
                    runOnJS(triggerSwipeAnimation)('left')
                })
            } else {
                translateX.value = withSpring(0)
                translateY.value = withSpring(0)
            }
        },
    })

    const animatedStyle = useAnimatedStyle(() => {
        const rotateZ = interpolate(
            translateX.value,
            [-screenWidth / 2, 0, screenWidth / 2],
            [-15, 0, 15],
            'clamp'
        )

        const scale = interpolate(index, [0, 1, 2], [1, 0.95, 0.9], 'clamp')
        const translateYStack = interpolate(index, [0, 1, 2], [0, 10, 20], 'clamp')

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value + translateYStack },
                { rotateZ: `${rotateZ}deg` },
            ],
            opacity: interpolate(
                translateX.value,
                [-screenWidth / 2, 0, screenWidth / 2],
                [0.7, 1, 0.7],
                'clamp'
            ),
        }
    })

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[animatedStyle]}
                className={clsx(
                    'absolute',
                    'w-[318px]',
                    'h-[675px]',
                    'rounded-xl',
                    'shadow-lg',
                    'overflow-hidden'
                )}
            >
                <Image
                    source={{
                        uri: card.urlImg
                    }}
                    style={{
                        width: 318,
                        height: 675
                    }}
                    className="w-full h-full absolute top-0 left-0"
                    resizeMode="cover"
                />

                <View className="absolute top-0 left-0 right-0 p-4">
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
                </View>


                <View className="absolute bottom-0 left-0 right-0 p-4">
                    <Text className="font-quicksand-bold text-textwhite text-md">{card.name} {card.surname}, {card.age}</Text>
                    <Text className="font-mavenpro-regular text-textwhite text-sm mb-8">{card.isNear && card.nearKm && card.nearKm > 0 && `${card.nearKm} km,`} {card.city && `${card.city}`} {card.country && `, ${card.country}`}</Text>
                    <View className='flex-1 flex-row items-center justify-center gap-4'>

                        <CustomButton onPress={() => triggerSwipeAnimation('left')} btnColor={'bg-buttonlightpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                            <Dislike />
                        </CustomButton>
                        <CustomLikeButton onPress={() => onSuperLike(card.id)} />
                        <CustomButton onPress={() => triggerSwipeAnimation('right')} btnColor={'bg-buttonpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                            <Check />
                        </CustomButton>
                    </View>

                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default SwipeableCard 