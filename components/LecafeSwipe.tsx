import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import SwipeableCard from './SwipeableCard'
import { UserInterface } from '@/presentation/interfaces'

const LecafeSwipe = ({ initialCards }: {
  initialCards: UserInterface[]
}) => {
  const [cards, setCards] = useState<UserInterface[]>(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {

    if (initialCards && initialCards.length > 0) {
      setCards(initialCards)
      setCurrentIndex(0)
    } else if (!initialCards || initialCards.length === 0) {

      setCards([])
      setCurrentIndex(0)
    }
  }, [initialCards])

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
          <Text className="text-xl text-gray-600">No hay más opciones.</Text>

          <Button title="Reiniciar" onPress={() => { setCards(initialCards); setCurrentIndex(0) }} />
        </View>
      )}
    </View>
  )
}

export default LecafeSwipe