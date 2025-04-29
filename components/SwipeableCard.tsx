
import React, { useCallback, useEffect } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
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
import SuperLike from '@/assets/icons/SuperLike'
import BigXMark from '@/assets/icons/BigXMark'
import BigCheck from '@/assets/icons/BigCheck'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import Interests from '@/assets/icons/Interests'
import CustomActionsButtonGroup from './common/CustomActionsButtonGroup'
import CustomActionsSetListButtonGroup from './common/CustomActionsSetListButtonGroup'
import { getSwipeableCardStyles } from '../presentation/utils/getSwipeableCardStyles'
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
    handleSelectList,
    selectedByInterestsScreen,
    setSelectedByInterestsScreen,
    selectedByInterestsCardId,
    setSelectedByInterestsCardId
}) => {


    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const nopeIndicatorOpacity = useSharedValue(0)
    const likeIndicatorOpacity = useSharedValue(0)
    const superLikeIndicatorOpacity = useSharedValue(0)

    const nopeLikeIndicatorScale = useSharedValue(0.8)
    const superLikeIndicatorScale = useSharedValue(0.8) 
    const overlayOpacity = useSharedValue(0)
    const overlayColor = useSharedValue(NOPE_OVERLAY_COLOR);

    const swipeableCardStyles = getSwipeableCardStyles({
        translateX,
        translateY,
        nopeIndicatorOpacity,
        likeIndicatorOpacity,
        superLikeIndicatorOpacity,
        nopeLikeIndicatorScale,
        superLikeIndicatorScale,
        overlayOpacity,
        overlayColor,
        index,
        screenWidth,
    })


    useEffect(() => {
        if ((selectedByInterestsScreen == 'left' || selectedByInterestsScreen == 'right') && selectedByInterestsCardId! > 0 && selectedByInterestsScreen && selectedByInterestsCardId == card.id) {
            triggerIndicatorAndSwipeAnimation(selectedByInterestsScreen, selectedByInterestsCardId!)
            setSelectedByInterestsCardId(0)
            setSelectedByInterestsScreen!("")
        }

        if (selectedByInterestsScreen == 'center' && selectedByInterestsCardId! > 0 && selectedByInterestsScreen && selectedByInterestsScreen && selectedByInterestsCardId == card.id) {
            triggerSuperLikeAnimation(selectedByInterestsCardId!)
            setSelectedByInterestsCardId(0)
            setSelectedByInterestsScreen!("")
        }
    }, [selectedByInterestsScreen, selectedByInterestsCardId, card.id])



    const handleSwipeComplete = useCallback(
        (direction: 'left' | 'right' | 'superlike', cardId: number) => {
            if (direction === 'left') {
                onSwipeLeft(cardId)
            } else if (direction === 'right') {
                onSwipeRight(cardId)
            } else if (direction === 'superlike') {
                onSuperLike(cardId)
                if (card.match) {
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
        (direction: 'left' | 'right', cardId: number) => {
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

                            runOnJS(handleSwipeComplete)(direction, cardId)
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


    const triggerSuperLikeAnimation = useCallback((cardId: number) => {
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

                runOnJS(handleSwipeComplete)('superlike', cardId)
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
                    if (isFinished) { runOnJS(handleSwipeComplete)('right', card.id) }
                })
                nopeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                likeIndicatorOpacity.value = withTiming(0, { duration: 100 })
                overlayOpacity.value = withTiming(0, { duration: 100 });


            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-screenWidth * 1.5, { duration: 200 }, (isFinished) => {
                    if (isFinished) { runOnJS(handleSwipeComplete)('left', card.id) }
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




    return (

        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[swipeableCardStyles.animatedStyle]}
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
                    style={[swipeableCardStyles.overlayStyle]}
                    className="absolute top-0 left-0 right-0 bottom-0"
                />

                <Animated.View
                    style={[swipeableCardStyles.nopeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',

                    )}
                >
                    <BigXMark />
                </Animated.View>
                <Animated.View
                    style={[swipeableCardStyles.likeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',
                    )}
                >
                    <BigCheck />
                </Animated.View>

                <Animated.View
                    style={[swipeableCardStyles.superLikeIndicatorStyle]}
                    className={clsx(
                        'rounded-xl', 'p-4',
                    )}
                >
                    <SuperLike />
                </Animated.View>

                <View className="absolute top-0 left-0 right-0 p-4">
                    <CustomActionsSetListButtonGroup selectedList={selectedList} handleSelectList={handleSelectList} />
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
                    <CustomActionsButtonGroup
                        actionLeft={() => triggerIndicatorAndSwipeAnimation("left", card.id)}
                        actionCenter={() => triggerSuperLikeAnimation(card.id)}
                        actionRight={() => triggerIndicatorAndSwipeAnimation("right", card.id)}
                    />
                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default SwipeableCard 