import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import SwipeableCard from './SwipeableCard'
import { UserInterface } from '@/presentation/interfaces'
import { UserLists } from '@/presentation'

const LecafeSwipe = ({ friendshipList, relationshipList, datesList }: {
  friendshipList: UserInterface[]
  relationshipList: UserInterface[]
  datesList: UserInterface[];

}) => {
  const [cards, setCards] = useState<UserInterface[]>(friendshipList)
  const [selectedList, setSelectedList] = useState<string>(UserLists.FRIENDSHIP);
  const [currentIndex, setCurrentIndex] = useState(0)

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
    (swipedCardId: number, direction: 'left' | 'right') => {
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
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                index={index}
                totalCards={cardsToRender.length}
              />
            )
          })
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className=" font-mavenpro-bold  text-md text-textblack">No hay más opciones.</Text>

              <Pressable onPress={() => { setCards(relationshipList); setCurrentIndex(0) }}>
              <Text className=" font-quicksand-bold text-sm text-textblack">REINICIAR</Text>
            </Pressable>
          </View>
        )}
      </View>

    </View>

  )
}

export default LecafeSwipe