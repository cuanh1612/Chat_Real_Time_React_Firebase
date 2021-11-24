import { Alert, AlertDescription, AlertIcon, Box, HStack } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context'
import { AppContext } from '../../context/AppProvider'
import AddUser from './AddUser'
import Header from './Header'
import MessageAdmin from './MessageAdmin'
import MessageMember from './MessageMember'
import SendMessage from './SendMessage'
import UserGroup from './UserGroup'

export default function Chat() {
    const { selectRoom: { room }, dataUsers, dataMessages } = useContext(AppContext)
    const { UserReducer: { user } } = useContext(ThemeContext)

    useEffect(() => {
        const theElement = document.getElementById('viewMessages');
        theElement.scrollTop = theElement.scrollHeight;
    })

    return (
        <>
            {/* this is header */}
            <Header />

            {/* chat message with people */}
            <Box h="calc(100vh - 140px)" overflowX="auto" p="20px" id="viewMessages">
                {
                    !room && (
                        <Alert>
                            <AlertIcon />
                            <AlertDescription>
                                Select room to chat
                            </AlertDescription>
                        </Alert>
                    )
                }


                {/* this is tin nhan cua admin */}
                {
                    room && dataMessages && dataMessages.map(mess => {
                        if (mess.idUser === user.data.uid) {
                            return <MessageAdmin mess={mess} />
                        } else {
                            return <MessageMember mess={mess} />
                        }
                    })
                }

                {/* this is tin nhan cua member */}
                {/* <MessageMember /> */}
            </Box>

            <HStack spacing="5" px="20px">
                {/* send message */}
                <SendMessage />

                {/* Add new user */}
                <AddUser />

                {/* members in group */}
                {
                    room && (
                        <UserGroup users={dataUsers ? dataUsers : []} />
                    )
                }

            </HStack>
        </>
    )
}
