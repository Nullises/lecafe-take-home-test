import { View } from 'react-native'
import React from 'react'
import LecafeSwipe from '@/components/LecafeSwipe'
import useUsers from "@/presentation/hooks/useUsers"
import { SplitListsAccumulator, UserInterface } from '@/presentation/interfaces'
import { UserLists } from '@/presentation/enum'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import useOpenDrawer from '@/presentation/hooks/useOpenDrawer'



const DashboardScreen = () => {

    const { users } = useUsers()
    const { isDrawerOpen } = useOpenDrawer();

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



    return (

        <SafeAreaView className='h-screen bg-drawerpink'>
            {
                !isDrawerOpen && (
                    <CustomHeader />
                )
            }
            <View className="flex-1 justify-center">

                <LecafeSwipe friendshipList={friendshipList} relationshipList={relationshipList} datesList={datesList} />
            </View>
        </SafeAreaView>



    )
}

export default DashboardScreen
