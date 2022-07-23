import { useState } from 'react';
import { VStack, HStack, IconButton,  Text, Heading, FlatList, useTheme, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';

import { Order, OrderProps } from '../components/Order';

import { Button } from '../components/Button';

//VSTACK -> vertical
//HSTACK -> horizontal

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open'); //o uso de <> limita as opções
  const [orders, setOrders] = useState<OrderProps[]>([
        // {
        //     id: '123',
        //     patrimony: '32321',
        //     when: '18/07/2022 às 10:00',
        //     status: 'open'
        // },
        // {
        //     id: '124',
        //     patrimony: '32322',
        //     when: '18/07/2022 às 11:00',
        //     status: 'open'
        // },
        // {
        //     id: '125',
        //     patrimony: '32323',
        //     when: '18/07/2022 às 12:00',
        //     status: 'open'
        // },
        // {
        //     id: '126',
        //     patrimony: '32324',
        //     when: '18/07/2022 às 12:00',
        //     status: 'open'
        // },
        // {
        //     id: '127',
        //     patrimony: '32325',
        //     when: '18/07/2022 às 12:00',
        //     status: 'open'
        // },
        // {
        //     id: '128',
        //     patrimony: '32326',
        //     when: '18/07/2022 às 12:00',
        //     status: 'open'
        // },
    ]);

  const { colors } = useTheme();
  return (
        <VStack
        flex={1}
        pb={6}
        bg="gray.700"
        >
            <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
            >
                <Logo />

                <IconButton
                icon={<SignOut size={26} color={ colors.gray[300] } />}
                />
                
            </HStack> 

            <VStack
            flex={1}
            px={6}
            >
                <HStack
                w="full"
                mt={8}
                mb={4}
                justifyContent="space-between"
                alignItems="center"
                >
                    <Heading
                    color="gray.100"
                    >
                        Meus Chamados    
                    </Heading>
                    <Text
                    color="gray.200"
                    >3</Text>
                </HStack>

                <HStack
                space={3}
                mb={8}
                >
                    <Filter
                    type="open"
                    title="Em andamento"
                    onPress={ () => setStatusSelected('open') }
                    isActive={ statusSelected === 'open' }
                    />

                    <Filter
                    type="closed"
                    title="Finalizado"
                    onPress={ () => setStatusSelected('closed') }
                    isActive={ statusSelected === 'closed' }
                    />
                </HStack>

                <FlatList
                  data={orders}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <Order data={item} />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 25 }}
                  ListEmptyComponent={() => (
                    <Center>
                        <ChatTeardropText color={colors.gray[300]} size={40} />
                        <Text
                        color="gray.300"
                        fontSize="xl"
                        mt={6}
                        textAlign="center"
                        >
                            Se sentindo sozinho? Sem solicitações por aqui.   
                        </Text>
                    </Center>
                  ) }
                />

                <Button title="Nova solicitação" />
                
            </VStack>
        </VStack>
  );
}