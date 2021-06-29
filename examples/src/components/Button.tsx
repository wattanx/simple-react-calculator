import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/button';

export const ButtonBackgroundColor = {
    Black: '#434343',
    Gray: '#5d5e5e',
    Orange: '#f2a23c',
} as const;

type ButtonProps = {
    value: string;
    onClick: () => void;
    isLarge?: boolean;
    selected?: boolean;
};

export const Button: React.VFC<
    ButtonProps &
        Pick<ChakraButtonProps, 'paddingLeft' | 'textAlign' | 'backgroundColor' | 'display'>
> = (props) => {
    return (
        <ChakraButton
            bg={props.backgroundColor}
            color="white"
            w={props.isLarge ? '50%' : '25%'}
            h="16%"
            fontSize="6vmin"
            border={props.selected ? '3px solid black' : '1px solid black'}
            _focus={{ outline: '0px' }}
            _active={{ opacity: 0.5 }}
            _hover={{}}
            rounded="none"
            textAlign={props.textAlign}
            paddingLeft={props.paddingLeft}
            display={props.display}
            onClick={props.onClick}
        >
            {props.value}
        </ChakraButton>
    );
};
