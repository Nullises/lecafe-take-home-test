import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LecafeSwipe from '@/components/LecafeSwipe'
import useUsers from "@/presentation/hooks/useUsers"
import { SplitListsAccumulator, UserInterface } from '@/presentation/interfaces'
import { UserLists } from '@/presentation/enum'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import useOpenDrawer from '@/presentation/hooks/useOpenDrawer'
import { LinearGradient } from 'expo-linear-gradient'
import { handleColorGradientSchema } from '@/presentation/utils/handleColorSchema'
import { useLocalSearchParams } from 'expo-router'



const DashboardScreen = () => {
    const { name, cardId } = useLocalSearchParams()
    const { users } = useUsers()
    const { isDrawerOpen } = useOpenDrawer();
    const [selectedList, setSelectedList] = useState<string>(UserLists.FRIENDSHIP)
    const [colorGradientSchema, setColorGradientSchema] = useState<{ initial: string, final: string }>({
        initial: "",
        final: ""
    })
    const [selectedByInterestsScreen, setSelectedByInterestsScreen] = useState<string | undefined>("")
    const [selectedByInterestsCardId, setSelectedByInterestsCardId] = useState<number | undefined>(0) 

    useEffect(() => {
        if (name) {
            setSelectedByInterestsScreen(name.toString())
        }
        if (cardId) {
            setSelectedByInterestsCardId(Number(cardId))
        }
    }, [name, cardId])

    const { friendshipList, relationshipList, datesList } = users.reduce((acc, person: UserInterface) => {

        if (person.lists.includes(UserLists.FRIENDSHIP)) {
            acc.friendshipList.push(person)
        }
        if (person.lists.includes(UserLists.RELATIONSHIP)) {
            acc.relationshipList.push(person)
        }
        if (person.lists.includes(UserLists.DATES)) {
            acc.datesList.push(person)
        }

        return acc

    }, {
        friendshipList: [],
        relationshipList: [],
        datesList: []
    } as SplitListsAccumulator)



    useEffect(() => {
        handleColorGradientSchema(selectedList, setColorGradientSchema)
    }, [selectedList])



    if (isDrawerOpen) {
        return (<SafeAreaView className='h-screen bg-drawerpink'>
            {
                !isDrawerOpen && (
                    <CustomHeader />
                )
            }
            <View className="flex-1 justify-center">

                <LecafeSwipe
                    setSelectedList={setSelectedList}
                    selectedList={selectedList}
                    friendshipList={friendshipList}
                    relationshipList={relationshipList}
                    datesList={datesList}
                    setSelectedByInterestsScreen={setSelectedByInterestsScreen}
                    selectedByInterestsScreen={selectedByInterestsScreen}
                    setSelectedByInterestsCardId={setSelectedByInterestsCardId}
                    selectedByInterestsCardId={selectedByInterestsCardId}
                />
            </View>
        </SafeAreaView>)
    } else {
        return (
            <LinearGradient
                colors={[colorGradientSchema.initial, colorGradientSchema.final]}
                start={[0.5, 0]}
                end={[0.5, 1]}
                style={{ flex: 1 }}
                className='h-screen'
            >

                <SafeAreaView className='h-screen'>
                    {
                        !isDrawerOpen && (
                            <CustomHeader />
                        )
                    }
                    <View className="flex-1 justify-center">

                        <LecafeSwipe
                            setSelectedList={setSelectedList}
                            selectedList={selectedList}
                            friendshipList={friendshipList}
                            relationshipList={relationshipList}
                            datesList={datesList}
                            setSelectedByInterestsScreen={setSelectedByInterestsScreen}
                            selectedByInterestsScreen={selectedByInterestsScreen}
                            setSelectedByInterestsCardId={setSelectedByInterestsCardId}
                            selectedByInterestsCardId={selectedByInterestsCardId}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>

        )
    }
}

export default DashboardScreen
