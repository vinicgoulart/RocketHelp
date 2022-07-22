import { useState } from 'react'
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Signin() { //começa com letra maiúscula sempre
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const { colors } = useTheme();
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

            <Button title="Entrar" w="full" />
            {/* passa a propriedade title pra o componente Button */}

        </VStack>
    )
}