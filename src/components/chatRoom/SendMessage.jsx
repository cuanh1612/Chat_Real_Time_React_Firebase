import { Button, Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../context'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services'

export default function SendMessage() {
    const [message, setMessage] = useState("")
    const bg = useColorModeValue(null, 'white')
    const {selectRoom: {room}} = useContext(AppContext)
    const {UserReducer: {user}} = useContext(ThemeContext)

    const colorSend = useColorModeValue(null, 'black')

    const handleSendMess = () => {
        if(!message) return
        const data = {
            idUser: user.data.uid,
            idRoom: room,
            message: message
        }

        addDocument('messages', data)

        setMessage('')
        document.getElementById("sendMess").value = ""
    }

    const changeMess = (e) => {
        setMessage(e.target.value)
    }

    return (
        <InputGroup size='lg'>
            <Input color={colorSend} bg={bg} _placeholder={{ color: 'gray.400' }} placeholder="Send message ..." onChange={changeMess} id="sendMess"/>
            <InputRightElement pr="50px">
                <Button px='10' colorScheme="blue" boxShadow="3px 3px 10px 0px #3182ce70" size="sm" isDisabled={!room?true:false} onClick={() => handleSendMess()}>Send</Button>
            </InputRightElement>
        </InputGroup>
    )
}
