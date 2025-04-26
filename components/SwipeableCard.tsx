
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



const { width: screenWidth } = Dimensions.get('window')
const SWIPE_THRESHOLD = screenWidth / 4

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    card,
    onSwipeLeft,
    onSwipeRight,
    index = 0,
    totalCards = 1
}) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const handleSwipeComplete = useCallback(
        (direction: 'left' | 'right') => {
            if (direction === 'left') {
                onSwipeLeft(card.id)
            } else {
                onSwipeRight(card.id)
            }
        },
        [card.id, onSwipeLeft, onSwipeRight]
    )

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
                    runOnJS(handleSwipeComplete)('right')
                })
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-screenWidth * 1.5, { duration: 200 }, () => {
                    runOnJS(handleSwipeComplete)('left')
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
                    'bg-white',
                    'rounded-xl',
                    'shadow-lg',
                    'border',
                    'border-transparent',
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

                <View className="absolute bottom-0 left-0 right-0 p-4">
                    <Text className="font-quicksand-bold text-textwhite text-md">{card.name} {card.surname}, {card.age}</Text>
                    <Text className="font-mavenpro-regular text-textwhite text-sm">{card.isNear && card.nearKm && card.nearKm > 0 && `${card.nearKm} km,`} {card.city && `${card.city}`} {card.country && `, ${card.country}`}</Text>
                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default SwipeableCard