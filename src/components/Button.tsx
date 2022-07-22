import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps &{ //basicamente isso pega todas as propriedades de um botão normal mas essas dentro de props
    title: String //button define title como uma propriedade, aqui está a tipagem

}
export function Button({ title, ...rest }: Props) { //aqui recebemos a prop
  return (
        <NativeBaseButton
        bg="green.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "green.500" }}
        {...rest}
        >
            <Heading
            color="white"
            fontSize="sm"
            >
                {title}
            </Heading>
        </NativeBaseButton>
  );
}