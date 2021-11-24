import { createContext, useContext, useMemo, useState } from 'react'
import { ThemeContext } from '.'
import useFireStore from '../hooks/useFireStore'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [room, setSelectRoom] = useState("")

    const { UserReducer: { user } } = useContext(ThemeContext)

    const userId = user.data ? user.data.uid : ""

    const condition = useMemo(() => ({
        field: "members",
        operators: "array-contains",
        compareValue: userId
    }), [userId])

    const data = useFireStore('rooms', condition)

    //Get user each room

    const membersCondittion = useMemo(() => {
        const mainRoom = data.find(value => {
            return value.id === room
        })

        if (!mainRoom) return null

        return {
            field: 'uid',
            operators: 'in',
            compareValue: mainRoom.members
        }
    }, [room, data])


    const dataUsers = useFireStore('users', membersCondittion)

    //Get use not in room 
    const membersOtherCondittion = useMemo(() => {
        if (dataUsers.length > 0) {
            const idUsers = []

            dataUsers.map(user => {
                idUsers.push(user.uid)
            })

            return {
                field: 'uid',
                operators: 'not-in',
                compareValue: idUsers
            }
        }
    }, [room, data, dataUsers])

    const dataOtherUsers = useFireStore("users", membersOtherCondittion)


    //get MESSAGE
    const messagesCondittion = useMemo(() => {
        if (!room) return {
            field: 'idRoom',
            operators: '==',
            compareValue: ''
        }

        return {
            field: 'idRoom',
            operators: '==',
            compareValue: room
        }
    }, [room])

    const dataMessages = useFireStore('messages', messagesCondittion)

    //Get all user 
    const allUsers = useFireStore("users")

    const values = {
        rooms: data,
        selectRoom: {
            room,
            setSelectRoom,
        },
        dataUsers: dataUsers,
        dataMessages: dataMessages,
        allUsers: allUsers,
        dataOtherUsers: dataOtherUsers
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider