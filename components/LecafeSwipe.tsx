import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import SwipeableCard from './SwipeableCard'
import { LecafeSwipeProps, UserInterface } from '@/presentation/interfaces'
import { UserLists } from '@/presentation'


const LecafeSwipe = ({
  friendshipList,
  relationshipList,
  datesList,
  selectedList,
  setSelectedList,
  selectedByInterestsScreen,
  setSelectedByInterestsCardId,
  selectedByInterestsCardId,
  setSelectedByInterestsScreen
}: LecafeSwipeProps) => {
  const [cards, setCards] = useState<UserInterface[]>(friendshipList)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [optionSelected, setOptionSelected] = useState<string>("")

  useEffect(() => {

    if (friendshipList && friendshipList.length > 0 && selectedList == UserLists.FRIENDSHIP) {
      setCards(friendshipList)
      setCurrentIndex(0)
    } else if (relationshipList && relationshipList.length > 0 && selectedList == UserLists.RELATIONSHIP) {
      setCards(relationshipList)
      setCurrentIndex(0)
    } else if (datesList && datesList.length > 0 && selectedList == UserLists.DATES) {
      setCards(datesList)
      setCurrentIndex(0)
    } else if (!friendshipList || friendshipList.length === 0) {

      setCards([])
      setCurrentIndex(0)
    }
  }, [friendshipList, selectedList])

  const handleSelectList = (selected: string) => {
    setSelectedList(selected)

  }

  const handleSwipe = useCallback(
    (swipedCardId: number, direction: 'left' | 'right' | 'superlike') => {

      setOptionSelected(direction)

      console.log(`Card ID ${swipedCardId} swiped ${direction}`)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    },
    []
  )

  const handleSwipeLeft = useCallback(
    (cardId: number) => handleSwipe(cardId, 'left'),
    [handleSwipe]
  )

  const handleSwipeRight = useCallback(
    (cardId: number) => handleSwipe(cardId, 'right'),
    [handleSwipe]
  )

  const handleSuperLike = useCallback(
    (cardId: number) => handleSwipe(cardId, 'superlike'),
    [handleSwipe]
  )


  const cardsToRender = cards.slice(currentIndex, currentIndex + 3)

  return (
    <View>
      <View className="relative w-full h-full items-center justify-center">
        {cardsToRender.length > 0 ? (

          cardsToRender.reverse().map((card, index) => {

            return (
              <SwipeableCard
                key={card.id}
                card={card}
                onSuperLike={handleSuperLike}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                index={index}
                totalCards={cardsToRender.length}
                optionSelected={optionSelected}
                handleSelectList={handleSelectList}
                selectedList={selectedList}
                setSelectedByInterestsScreen={setSelectedByInterestsScreen}
                selectedByInterestsScreen={selectedByInterestsScreen}
                setSelectedByInterestsCardId={setSelectedByInterestsCardId}
                selectedByInterestsCardId={selectedByInterestsCardId}
              />
            )
          })
        ) : (
          <View className="flex-1 items-center justify-center">
              <Text className=" font-mavenpro-bold  text-md text-textwhite">No hay más opciones.</Text>

              <Pressable onPress={() => {
                setCards(friendshipList)
                setCurrentIndex(0)
                setSelectedList(UserLists.FRIENDSHIP)
              }}>
                <Text className=" font-quicksand-bold text-sm text-textwhite">REINICIAR</Text>
            </Pressable>
          </View>
        )}
      </View>

    </View>

  )
}

export default LecafeSwipe