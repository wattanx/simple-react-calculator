import styled from 'styled-components';

export const ButtonBackgroundColor = {
    Black: '#434343',
    Gray: '#5d5e5e',
    Orange: '#f2a23c',
} as const;

type ButtonBackgroundColorType = typeof ButtonBackgroundColor[keyof typeof ButtonBackgroundColor];

type ButtonProps = {
    value: string;
    onClick: () => void;
    backgroundColor: ButtonBackgroundColorType;
    isLarge?: boolean;
    isSelected?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton
            onClick={props.onClick}
            backgroundColor={props.backgroundColor}
            isLearge={props.isLarge}
            isSelected={props.isSelected}
        >
            {props.value}
        </StyledButton>
    );
};

const StyledButton = styled.button<{
    backgroundColor: ButtonBackgroundColorType;
    isLearge: boolean;
    isSelected?: boolean;
}>`
    background-color: ${(props) => props.backgroundColor};
    color: white;
    width: ${(props) => (props.isLearge ? '50%' : '25%')};
    height: 16%;
    font-size: 6vmin;
    border: ${(prop) => (prop.isSelected ? '3px solid black' : '1px solid black')};
    padding-left: ${(props) => (props.isLearge ? '12%' : '')};
    text-align: ${(props) => (props.isLearge ? 'left' : '')};

    :focus {
        outline: 0px;
    }

    :active {
        opacity: 0.5;
    }
`;
