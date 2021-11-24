import {Button, ModalOverlay, Modal, ModalContent, Input, Textarea, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, HStack, useDisclosure, useToast} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import {MdPostAdd} from 'react-icons/md'
import { ThemeContext } from '../../context'
import { addDocument } from '../../firebase/services'

export default function CreateRoom() {
    const toast = useToast()

    const {UserReducer: {user}} = useContext(ThemeContext)

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [values, setValues] = useState({
        name: "",
        discription: ""
    })

    const changeValues = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    const handleCreate = async() => {
        if(!values.name){
            toast({
                description: "Please enter field name room",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"top-right"
            })
            onClose()
            return
        }

        const data = {
            name: values.name,
            discription: values.discription,
            members: [user.data.uid] 
        }

        await addDocument('rooms', data)
        onClose()

        toast({
            description: "Created new room succeed",
            status: "success",
            duration: 5000,
            isClosable: true,
            position:"top-right"
        })
    }

    return (
        <form>
            <Button onClick={onOpen} mt={5} iconSpacing="55px" rightIcon={<MdPostAdd />} isFullWidth>Add new room</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Create new room
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel fontWeight="400">Rome name</FormLabel>
                                <Input placeholder="Enter room name" name="name" onChange={e => changeValues(e)}/>
                            </FormControl>
                            <FormControl mt={5} >
                                <FormLabel fontWeight="400">Describe</FormLabel>
                                <Textarea name="discription" onChange={e => changeValues(e)}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack>
                                <Button variant="ghost" type="submit" onClick={() => handleCreate()}>Create</Button>
                                <Button onClick={onClose} colorScheme="blue">Cancel</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </form>
    )
}
