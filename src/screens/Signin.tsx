import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import auth from '@react-native-firebase/auth';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Signin() { //começa com letra maiúscula sempre
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    function handleSignin() {
        if (!email || !password) {
            return Alert.alert('Entrar', 'É necessário informar o email e senha'); //primeiro parametro é titulo, segundo mensagem.    
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            // console.log(response);
            setIsLoading(false);

            Alert.alert('Entrar', 'Logado com sucesso!');
            

        })    
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                return Alert.alert('Entrar', 'Credenciais inválidas!');
            }

            return Alert.alert('Entrar', 'Erro ao acessar a aplicação!')
        });

    }

    return ( //não retornam mais que um elemento.
        <VStack
        flex={1}
        alignItems="center"
        bg="gray.600"
        px={8}
        pt={24}>

            <Logo/>

            <Heading
            color="gray.100"
            fontSize="xl"
            mt={20}
            mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder="Email"
                mb={4}
                mr={1}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}  
                //envelope is an icon, colors is a hook of native base colors theme
                onChangeText={ setEmail }
            />
            <Input
                placeholder="Senha"
                mb={8}
                mr={1}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={ setPassword }
            />

            <Button
            title="Entrar"
            w="full"
            onPress={handleSignin}
            isLoading={ isLoading }
            />
            {/* passa a propriedade title pra o componente Button */}

        </VStack>
    )
}