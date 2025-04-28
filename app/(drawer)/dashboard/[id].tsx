import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import useUsers from '@/presentation/hooks/useUsers'
import { UserInterface } from '@/presentation'
import Match from '@/components/Match'

const MatchUser = () => {
    const { id, name } = useLocalSearchParams()
    const { users } = useUsers()

    const matchUser = users.find((user: UserInterface) => user.id == Number(id))

    if (!matchUser) {
        <Redirect href="/" />
    }



    return (
        <Match card={matchUser!} optionSelected={name!} />
    )
}

export default MatchUser