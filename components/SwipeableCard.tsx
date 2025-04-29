
import React, { useCallback, useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
    runOnJS,
    interpolate,
    withTiming,
    Extrapolate,
    interpolateColor,
} from 'react-native-reanimated'
import { clsx } from 'clsx'
import { Image } from 'expo-image'
import { SwipeableCardProps } from '@/presentation/interfaces'
import CustomButton from './common/CustomButton'
import Dislike from '@/assets/icons/Dislike'
import Check from '@/assets/icons/Check'
import CustomLikeButton from './CustomLikeButton'
import CustomSetListButton from './CustomSetListButton'
import Friendship from '@/assets/icons/Friendship'
import { UserLists } from '@/presentation'
import Dates from '@/assets/icons/Dates'
import Relationship from '@/assets/icons/Relationship'
import SuperLike from '@/assets/icons/SuperLike'
import BigXMark from '@/assets/icons/BigXMark'
import BigCheck from '@/assets/icons/BigCheck'
import { Colors } from '@/constants/Colors'
import { Redirect, router, useNavigation } from 'expo-router'
import Interests from '@/assets/icons/Interests'
const LIKE_OVERLAY_COLOR = Colors.pinkOverlay
const NOPE_OVERLAY_COLOR = Colors.grayOverlay
const MAX_OVERLAY_OPACITY = 0.4;


const { width: screenWidth } = Dimensions.get('window')
const SWIPE_THRESHOLD = screenWidth / 4

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    card,
    onSwipeLeft,
    onSwipeRight,
    onSuperLike,
    index = 0,
    selectedList,
    handleSelectList
}) => {

    const navigate = useNavigation();

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const nopeIndicatorOpacity = useSharedValue(0)
    const likeIndicatorOpacity = useSharedValue(0)
    const superLikeIndicatorOpacity = useSharedValue(0)

    const nopeLikeIndicatorScale = useSharedValue(0.8)
    const superLikeIndicatorScale = useSharedValue(0.8) 
    const overlayOpacity = useSharedValue(0)
    const overlayColor = useSharedValue(NOPE_OVERLAY_COLOR);



    const handleSwipeComplete = useCallback(
        (direction: 'left' | 'right' | 'superlike') => {
            if (direction === 'left') {
                onSwipeLeft(card.id)
            } else if (direction === 'right') {
                onSwipeRight(card.id)
            } else if (direction === 'superlike') {
                onSuperLike(card.id)
                if (card.match) {
                    console.log("match")
                    router.push({
                        pathname: '/(drawer)/dashboard/[id]',
                        params: { id: card.id, name: selectedList }
                    })
                }
            }

        },
        [card.id, onSwipeLeft, onSwipeRight, onSuperLike]
    )

    const triggerIndicatorAndSwipeAnimation = useCallback(
        (direction: 'left' | 'right') => {
            const finalPositionX = direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5


            const indicatorOpacity = direction === 'left' ? nopeIndicatorOpacity : likeIndicatorOpacity


            if (direction === 'left') {
                likeIndicatorOpacity.value = 0
                overlayColor.value = NOPE_OVERLAY_COLOR;
            } else {
                nopeIndicatorOpacity.value = 0
                overlayColor.value = LIKE_OVERLAY_COLOR;
            }
            superLikeIndicatorOpacity.value = 0
            superLikeIndicatorScale.value = 0.8


            indicatorOpacity.value = withTiming(1, { duration: 300 }, (isFinished) => {
                if (isFinished) {

                    indicatorOpacity.value = withTiming(0, { duration: 300 })

                    overlayOpacity.value = withTiming(MAX_OVERLAY_OPACITY, { duration: 300 }, (isOverlayFinished) => {
                        if (isOverlayFinished) {
                            overlayOpacity.value = withTiming(0, { duration: 300 })
                        }
                    });


                    translateX.value = withSpring(finalPositionX, { duration: 200 }, (isSwipeFinished) => {
                        if (isSwipeFinished) {

                            runOnJS(handleSwipeComplete)(direction)
                        }
                    })
                }
            })

            nopeLikeIndicatorScale.value = withTiming(1.1, { duration: 300 }, (isFinished) => {
                if (isFinished) {
                    nopeLikeIndicatorScale.value = withTiming(0.8, { duration: 300 })
                }
            })



            translateY.value = withTiming(-20, { duration: 100 }, () => {
                translateY.value = withSpring(0)
            })
            translateX.value = withSpring(translateX.value) 

        },
        [translateX, translateY, nopeIndicatorOpacity, likeIndicatorOpacity, nopeLikeIndicatorScale, superLikeIndicatorOpacity, superLikeIndicatorScale, overlayOpacity, overlayColor, handleSwipeComplete, screenWidth]
    )


    const triggerSuperLikeAnimation = useCallback(() => {
        nopeIndicatorOpacity.value = 0
        likeIndicatorOpacity.value = 0
        nopeLikeIndicatorScale.value = 0.8

        overlayColor.value = LIKE_OVERLAY_COLOR;


        superLikeIndicatorOpacity.value = withTiming(1, { duration: 300 }, (isFinished) => {
            if (isFinished) {
                superLikeIndicatorOpacity.value = withTiming(0, { duration: 300 })
                superLikeIndicatorScale.value = withTiming(0.8, { duration: 300 })

                overlayOpacity.value = withTiming(MAX_OVERLAY_OPACITY, { duration: 300 }, (isOverlayFinished) => {
                    if (isOverlayFinished) {
                        overlayOpacity.value = withTiming(0, { duration: 300 })
                    }
                });

                runOnJS(handleSwipeComplete)('superlike')
            }
        })

        superLikeIndicatorScale.value = withTiming(1.1, { duration: 300 })



        translateY.value = withTiming(-20, { duration: 100 }, () => {
            translateY.value = withSpring(0)
        })
        translateX.value = withSpring(0)



    }, [superLikeIndicatorOpacity, superLikeIndicatorScale, nopeIndicatorOpacity, likeIndicatorOpacity, nopeLikeIndicatorScale, overlayOpacity, overlayColor, translateY, translateX, handleSwipeComplete])



    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startX: number; startY: number }
    >({
        onActive: (event) => {

            translateX.value = event.translationX
            translateY.value = event.translationY

            nopeIndicatorOpacity.value = interpolate(
                translateX.value,
                [-screenWidth / 2, -SWIPE_THRESHOLD / 4, 0],
                [1, 0.5, 0],
                Extrapolate.CLAMP
            )
            nopeLikeIndicatorScale.value = 0.8

            likeIndicatorOpacity.value = interpolate(
                translateX.value,
                [0, SWIPE_THRESHOLD / 4, screenWidth / 2],
                [0, 0.5, 1],
                Extrapolate.CLAMP
            )
            nopeLikeIndicatorScale.value = 0.8


            superLikeIndicatorOpacity.value = 0
            superLikeIndicatorScale.value = 0.8

            overlayOpacity.value = interpolate(
                Math.abs(translateX.value),
                [0, SWIPE_THRESHOLD], 
                [0, MAX_OVERLAY_OPACITY],
                Extrapolate.CLAMP
            )

            overlayColor.value = interpolateColor(
                translateX.value,
                [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
                [NOPE_OVERLAY_COLOR, NOPE_OVERLAY_COLOR, LIKE_OVERLAY_COLOR] 
            );
        },
        onEnd: (event) => {

            if (event.translationX > SWIPE_THRESHOLD) {
                translateX.value = withSpring(screenWidth * 1.5, { duration: 200 }, (isFinished) => {
                    if (isFinished) { runOnJS(handleSwipeComplete)('right') }
                })
                nopeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                likeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                overlayOpacity.value = withTiming(0, { duration: 100 });


            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-screenWidth * 1.5, { duration: 200 }, (isFinished) => {
                    if (isFinished) { runOnJS(handleSwipeComplete)('left') }
                })
                nopeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                likeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                overlayOpacity.value = withTiming(0, { duration: 100 });

            } else {
                translateX.value = withSpring(0)
                translateY.value = withSpring(0)
                nopeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                likeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                superLikeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                superLikeIndicatorScale.value = withTiming(0.8, { duration: 100 })
                nopeLikeIndicatorScale.value = withTiming(0.8, { duration: 100 })
                overlayOpacity.value = withTiming(0, { duration: 100 });
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

    const overlayStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: overlayColor.value,
            opacity: overlayOpacity.value,
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
        }
    });

    const nopeIndicatorStyle = useAnimatedStyle(() => {
        return {
            opacity: nopeIndicatorOpacity.value,
            transform: [
                { scale: nopeLikeIndicatorScale.value },
                { rotate: '-15deg' },
            ],

            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -90,
            marginTop: -40,
        }
    })


    const likeIndicatorStyle = useAnimatedStyle(() => {
        return {
            opacity: likeIndicatorOpacity.value,
            transform: [
                { scale: nopeLikeIndicatorScale.value },
                { rotate: '15deg' }
            ],

            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -90,
            marginTop: -40,
        }
    })


    const superLikeIndicatorStyle = useAnimatedStyle(() => {
        return {
            opacity: superLikeIndicatorOpacity.value,
            transform: [
                { scale: superLikeIndicatorScale.value },
            ],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -90,
            marginTop: -40,
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
                        height: 675,
                    }}
                    className="w-full h-full absolute top-0 left-0"
                    resizeMode="cover"
                />

                <Animated.View
                    style={[overlayStyle]}
                    className="absolute top-0 left-0 right-0 bottom-0"
                />

                <Animated.View
                    style={[nopeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',

                    )}
                >
                    <BigXMark />
                </Animated.View>
                <Animated.View
                    style={[likeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',
                    )}
                >
                    <BigCheck />
                </Animated.View>

                <Animated.View
                    style={[superLikeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',
                    )}
                >
                    <SuperLike />
                </Animated.View>

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
                    <View className='flex flex-row justify-between'>
                        <Text className="font-quicksand-bold text-textwhite text-md">{card.name} {card.surname}, {card.age}</Text>
                        <Pressable onPress={() =>
                            router.push({
                                pathname: '/(drawer)/interests/[id]',
                                params: { id: card.id, name: selectedList }
                            })
                        } className='bg-buttonstrongpink active:opacity-80 rounded-full w-[32px] h-[32px] flex justify-center items-center'>
                            <Interests />
                        </Pressable>
                    </View>

                    <Text className="font-mavenpro-regular text-textwhite text-sm mb-8">{card.isNear && card.nearKm && card.nearKm > 0 && `${card.nearKm} km,`} {card.city && `${card.city}`} {card.country && `, ${card.country}`}</Text>
                    <View className='flex-1 flex-row items-center justify-center gap-4'>

                        <CustomButton onPress={() => triggerIndicatorAndSwipeAnimation("left")} btnColor={'bg-buttonlightpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                            <Dislike />
                        </CustomButton>
                        <CustomLikeButton onPress={triggerSuperLikeAnimation} />
                        <CustomButton onPress={() => triggerIndicatorAndSwipeAnimation("right")} btnColor={'bg-buttonpink'} btnColorActive={'active:bg-buttonstrongpink'}>
                            <Check />
                        </CustomButton>
                    </View>

                </View>
            </Animated.View>
        </PanGestureHandler>
    )

}

export default SwipeableCard 