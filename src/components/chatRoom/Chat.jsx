import { Alert, AlertDescription, AlertIcon, Box, HStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context'
import { AppContext } from '../../context/AppProvider'
import AddUser from './AddUser'
import Header from './Header'
import MessageAdmin from './MessageAdmin'
import MessageMember from './MessageMember'
import SendMessage from './SendMessage'
import UserGroup from './UserGroup'
import InforRooms from './InforRooms'
import {getdata, deteteData} from '../../firebase/services'

export default function Chat() {
    const [nameRoom, setNameRom]= useState(null)
    const { selectRoom: { room, setSelectRoom }, dataUsers, dataMessages, rooms } = useContext(AppContext)
    const { UserReducer: { user } } = useContext(ThemeContext)

    useEffect(() => {
        const theElement = document.getElementById('viewMessages');
        theElement.scrollTop = theElement.scrollHeight;
    })

    useEffect(()=>{
        if(room){
            const value = getdata('rooms', room)
            value.then(e=> {
                if(!e) {
                    setSelectRoom('')
                }
            })
        }
    }, [rooms])

    useEffect(()=> {
        if(room){
            const r = getdata('rooms', room)
            r.then(e=> {
                setNameRom(e.name)
            })
        }
    }, [room])

    const deleteRoom = async ()=> {
        await deteteData('rooms', room)
        setSelectRoom('')
        if(dataMessages.length > 0){
            dataMessages.map(value=> {
                deteteData('messages', value.id)
            })
        }
    }

    

    return (
        <>
            {/* this is header */}
            <Header />

            {
                room && nameRoom && <InforRooms deleteRoom={deleteRoom} nameRoom={nameRoom}/>
            }

            {/* chat message with people */}
            <Box h={room ? "calc(100vh - 210px)": "calc(100vh - 140px)"} overflowX="auto" p="20px" id="viewMessages">
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
