import { HStack, Text } from 'native-base';

export type OrderProps = { //da pra usar externamente
    id: string,
    patrimony: string,
    when: string,
    status: 'open' | 'closed'
}

type Props = { //uso interno
    data: OrderProps
}

export function Order({ data, ...rest }: Props) {
  return (
    <HStack
    bg="gray.600"
    mb={4}
    alignItems="center"
    justifyContent="space-between"
    rounded="sm"
    overflow="hidden"
    >
        <Text
        color="white"
        fontSize="md"
        >
        Patrimônio {data.patrimony}</Text>
    </HStack>
  );
}