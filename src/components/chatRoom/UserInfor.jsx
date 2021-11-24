import { Avatar, chakra, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { signOut } from '@firebase/auth'
import { collection, onSnapshot } from '@firebase/firestore'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppProvider'

import { ThemeContext } from '../../context/index'
import { auth, db } from '../../firebase/config'




export default function UserInfor() {

    const {UserReducer: {user, dispatch}} = useContext(ThemeContext)
    const {selectRoom:{setSelectRoom}} = useContext(AppContext)
    

    const navigate = useNavigate()

    useEffect(() => {
        onSnapshot(collection(db, 'users'), result => {
            const data = result.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        })
    }, [])

    return (
        <Menu gutter={20} direction="ltr">
            <MenuButton as={HStack} px="10px" h='50px' border="1px solid" cursor="pointer" borderColor="gray.300" borderRadius="5px" >
                {
                    user.data && (
                        <>
                            <chakra.span>{user.data.displayName}</chakra.span>
                            <Avatar size="sm" name={user.data.displayName} ml="10" src={user.data.photoURL} />
                        </>
                    )
                }
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => {
                    signOut(auth)
                    setSelectRoom('')
                    dispatch({
                        type: "LOGOUT"
                    })
                    navigate('/login')
                }

                }>
                    Log out
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
