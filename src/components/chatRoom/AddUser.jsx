import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBoolean, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Select from 'react-select';
import { AppContext } from '../../context/AppProvider';
import { updateRoom } from '../../firebase/services';



export default function AddUser() {
    const [loading, setLoading] = useBoolean(false)
    const toast = useToast()

    const variant = useColorModeValue('ghost', 'outline')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const colorScheme = useColorModeValue(null, 'white')

    const { selectRoom: { room }, dataUsers, dataOtherUsers } = useContext(AppContext)

    const [selectedOption, setSelectedOption] = useState(null)

    const handleChangeSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const options = useMemo(() => {
        return dataOtherUsers.map(user => ({
            value: user.uid,
            label: user.email
        }))
    }, [dataOtherUsers])

    const handleAddUser = async () => {
        const dataUsersAdd = selectedOption.map(user => user.value)
        const dataUserCurrent = dataUsers.map(user => user.uid)
        const dataUserUpdate = [...dataUserCurrent, ...dataUsersAdd]
        await updateRoom(room, dataUserUpdate)

        if (!selectedOption) {
            toast({
                description: "Pleas choose user to add.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })

            onClose()
            return
        }

        setLoading.toggle()

        toast({
            description: "Added member success.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right"
        })

        setSelectedOption(null)

        setLoading.toggle()
        onClose()
    }

    return (
        <>
            {
                room && (
                    <>
                        <Button size='lg' onClick={onOpen} fontWeight="sm" variant={variant} colorScheme={colorScheme} fontSize="md" leftIcon={<AiOutlineUserAdd />}>Add</Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay>
                                <ModalContent>
                                    <ModalHeader>Add new User</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Select
                                            styles={{
                                                option: (css, state) => ({
                                                    ...css,
                                                    color: "black"
                                                })
                                            }}
                                            value={selectedOption}
                                            onChange={handleChangeSelect}
                                            options={options}
                                            isMulti
                                            isLoading={loading}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <HStack spacing={4}>
                                            <Button variant="ghost" isLoading={loading} onClick={() => handleAddUser()}>Add</Button>
                                            <Button onClick={onClose} colorScheme="blue">Cancel</Button>
                                        </HStack>
                                    </ModalFooter>
                                </ModalContent>
                            </ModalOverlay>
                        </Modal>
                    </>
                )
            }
        </>
    )
}
