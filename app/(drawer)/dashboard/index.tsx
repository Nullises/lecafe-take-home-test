import { View, Text } from 'react-native'
import React, { useState } from 'react'
import LecafeSwipe from '@/components/LecafeSwipe'
import useUsers from "@/presentation/hooks/useUsers"
import { UserInterface } from '@/presentation/interfaces'
import { UserLists } from '@/presentation/enum'



const DashboardScreen = () => {

    const { users } = useUsers()

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
    });


    return (

        <View className="flex-1 items-center justify-center bg-drawerpink">
            <LecafeSwipe initialCards={users} />
        </View>
    )
}

export default DashboardScreen
