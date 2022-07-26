import { useState, useEffect } from 'react';
import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { OrderFirestoreDTO } from '../DTOs/OrderDTO';

import { OrderProps } from '../components/Order';

import { Header } from '../components/Header';

import { dateFormat } from '../utils/firestoreDateFormat';

import { Loading } from '../components/Loading';

import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';

import { CardDetails } from '../components/CardDetails';

import { Input } from '../components/Input';

import { Button } from '../components/Button';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string,
  solution: string,
  closed: string
}

export function Details() {
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
    
  const { colors } = useTheme();

  const { orderId } = route.params as RouteParams;
    
  const navigation = useNavigation();
    
  function handleCloseOrder() {
      if (!solution) {
          return Alert.alert('Solicitação', 'A solução é necessária para encerrar o pedido!');
      }

      setIsLoading(true);
      
      firestore()
        .collection<OrderFirestoreDTO>('orders')
          .doc(orderId).update({
            status: 'closed',
            solution,
            closed_at: firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            Alert.alert('Solicitação', 'Solicitação encerrada!');
            setIsLoading(false);
            navigation.goBack();
              
          })
          .catch((error) => {
              console.log(error);
              Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação!');
              setIsLoading(false);
          })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack
    flex={1}
    bg="gray.700"
    >
        
        <Header
        title="Solicitação"
        /> 
      
            <HStack
            bg="gray.500"
            justifyContent="center"
            p={4}
            >
                {
                  order.status === 'closed' ? <CircleWavyCheck size={22} color={colors.green[300]} /> : <Hourglass size={22} color={colors.secondary[700]} />
                }
              
                <Text
                  fontSize="sm"
                  color={ order.status === 'closed' ? colors.green[300] : colors.secondary[700] }
                  ml={2}
                  textTransform="uppercase"
                >
                    { order.status === 'closed' ? 'Finalizado' : 'Aberto' }
                </Text>
              
            </HStack>
          
            <ScrollView
            mx={5}
            showsVerticalScrollIndicator={false}
            >
                <CardDetails
                title="equipamento"
                description={ `Patrimonio ${order.patrimony}` }
                icon={ DesktopTower }
                footer={ order.when }
                />
              
                <CardDetails
                title="Descrição do problema"
                description={ `${order.description}` }
                icon={ Clipboard }
                />  

                <CardDetails
                title="Solução"
                icon={CircleWavyCheck}
                description={ order.solution }  
                footer={ order.closed && `Encerrado em ${order.closed}` }
                >
                    {
                        order.status === 'open' &&
                        <Input
                        placeholder='Descrição da solução do problema'
                        onChangeText={setSolution}
                        h={24}
                        textAlignVertical="top"
                        multiline
                        />
                    }
                </CardDetails>

          </ScrollView>

          
          {
                order.status === 'open' &&
                <Button
                title="Fechar solicitação"
                m={5}
                onPress={ handleCloseOrder }  
                isLoading={ isLoading }
                />
          }
    </VStack>
  );
}