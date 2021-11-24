import { Button, Center, Container, Heading, useBoolean, VStack } from "@chakra-ui/react";
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/index';
import { auth } from '../firebase/config';
import { addDocument } from '../firebase/services';
import ReactLoading from 'react-loading';



export default function Login() {
    const navigate = useNavigate()

    const [loading, setLoading] = useBoolean(true)

    const { UserReducer } = useContext(ThemeContext)

    useEffect(() => {
        const r = setTimeout(() => {
            if (!UserReducer.user.success) {
                setLoading.toggle()
            }
        }, 3000);

        return () => {
            clearTimeout(r)
        }
    }, [UserReducer.user])


    const setUser = (user) => {
        const data = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
        }

        UserReducer.dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data
        })
    }


    const [right, setBoolean] = useBoolean()
    const [loadFaceLog, setLoadFaceLog] = useBoolean()

    const provider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider()

    const loginGoole = async () => {
        setBoolean.on()
        await signInWithPopup(auth, provider).then(result => {
            const { isNewUser, providerId } = getAdditionalUserInfo(result)

            if (isNewUser) {
                const data = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    providerId: providerId
                }

                addDocument('users', data)
            }

            setBoolean.off()
            setUser(result.user)
            navigate('/')
        }).catch(error => {
            setBoolean.off()
        })
    }

    const loginFacebook = async () => {
        setLoadFaceLog.on()
        await signInWithPopup(auth, facebookProvider).then(result => {
            const { isNewUser, providerId } = getAdditionalUserInfo(result)

            if (isNewUser) {
                const data = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    providerId: providerId
                }

                addDocument('users', data)
            }

            setLoadFaceLog.off()
            setUser(result.user)
            navigate('/')
        }).catch(error => {
            console.log(error);
            setLoadFaceLog.off()
        })
    }

    return (
        <>
            <Helmet>
                <title>Login'</title>
            </Helmet>
            {
                !loading ? (
                    <Container>
                        <Center flexDirection="column" h="80vh">
                            <Heading size="2xl">Login</Heading>
                            <VStack mt="10" direction="row" spacing={5}>
                                <Button isLoading={right} onClick={loginGoole} iconSpacing={5} leftIcon={<AiOutlineGoogle />} colorScheme="red" isFullWidth maxW="250px" size="lg" variant="outline">Login with Google</Button>
                                <Button isLoading={loadFaceLog} onClick={loginFacebook} iconSpacing={5} leftIcon={<FaFacebookF />} colorScheme="blue" isFullWidth maxW="250px" size="lg" variant="outline">Login with FaceBook</Button>
                            </VStack>
                        </Center>
                    </Container>
                ) : (
                    <Center height="100vh">
                        <ReactLoading type="cubes" color="rgba(66, 153, 225, 0.6)" height={100} width={100} />
                    </Center>
                )
            }
        </>
    );
}
