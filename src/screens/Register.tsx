import { useState } from 'react';
import { VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { Alert } from 'react-native';

export function Register() {
  const [isLoading, setIsLoading] = useState(false); //loading effect
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert('Novo registro', 'Preencha todos os campos!');
    }

    setIsLoading(true);
  
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Novo registro', 'Nova solicitação criada com sucesso!');

        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Novo registro', 'Não foi possível registrar o pedido!');
      })
  }

  return (
    <VStack
    flex={1}
    p={6}
    bg="gray.600"
    >
        <Header title="Nova solicitação" />

        <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={ setPatrimony }
        />

        <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={ setDescription }
        />

        <Button
        title="Cadastrar"
        mt={5}
        isLoading={ isLoading }
        onPress={ handleNewOrder }
        />
        
    </VStack>
  );
}