import { useEffect, useState } from 'react'
import { UserInterface } from '../interfaces/user.interface'
import getUsersAction from '@/core/actions/getUsers.action'
import { UserLists } from '../enum/userLists.enum'

const useUsers = () => {

    const [users, setUsers] = useState<UserInterface[] | []>([])

    const fetchUsers = async () => {
        const fetchedUsers = await getUsersAction()
        setUsers(fetchedUsers)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,

    }
}

export default useUsers