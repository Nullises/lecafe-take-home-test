import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import useUsers from '@/presentation/hooks/useUsers'
import { UserInterface } from '@/presentation'
import InterestsCollapsable from '@/components/InterestsCollapsable'
import { handleColorGradientSchema } from '@/presentation/utils/handleColorSchema'


const Interests = () => {
    const { id, name } = useLocalSearchParams()
    const { users } = useUsers()


    const [colorGradientSchema, setColorGradientSchema] = useState<{ initial: string, final: string }>({
        initial: "",
        final: ""
    })

    useEffect(() => {
        if (name) {
            handleColorGradientSchema(name.toString(), setColorGradientSchema)
        }

    }, [name])

    const matchUser = users.find((user: UserInterface) => user.id == Number(id))

    if (!matchUser) {
        <Redirect href="/" />
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <InterestsCollapsable colorGradientSchema={colorGradientSchema} matchUser={matchUser!} />
        </SafeAreaView>

    )
}

export default Interests