import { useCalculate } from '@src/hooks/useCalculate';
import { Box } from '@chakra-ui/react';
import { Button, ButtonBackgroundColor } from './Button';
import { Operator } from './Calculator/Calculator';
import { Display } from './Display';
import Div100vh from './Div100vh';

type ComponentProps = {
    onNumberClick: (input: string) => void;
    onCalculate: (operator: Operator) => void;
    onClear: () => void;
    onAllClear: () => void;
    isClearable: boolean;
    value: string;
    selectedOperator: Operator;
};

export const ReactCalculator: React.VFC = () => {
    const {
        value,
        isClearable,
        selectedOperator,
        onCalculate,
        onClear,
        onAllClear,
        onNumberClick,
    } = useCalculate();

    return (
        <Div100vh>
            <CalculatorComponent
                onCalculate={(operator: Operator) => onCalculate(operator)}
                onClear={() => onClear()}
                onAllClear={() => onAllClear()}
                onNumberClick={(input: string) => onNumberClick(input)}
                isClearable={isClearable}
                value={value}
                selectedOperator={selectedOperator}
            />
        </Div100vh>
    );
};

const CalculatorComponent: React.VFC<ComponentProps> = (props) => (
    <Box h="100vh" display="block">
        <Display value={props.value} />
        <Button
            value={props.isClearable ? 'C' : 'AC'}
            onClick={() => (props.isClearable ? props.onClear() : props.onAllClear())}
            backgroundColor={ButtonBackgroundColor.Black}
        />
        <Button
            value="+/-"
            onClick={() => props.onCalculate(Operator.sign)}
            backgroundColor={ButtonBackgroundColor.Black}
        />
        <Button
            value="%"
            onClick={() => props.onCalculate(Operator.percentage)}
            backgroundColor={ButtonBackgroundColor.Black}
        />
        <Button
            value={'\u00F7'}
            onClick={() => props.onCalculate(Operator.division)}
            backgroundColor={ButtonBackgroundColor.Orange}
            selected={props.selectedOperator === Operator.division}
        />
        <br />
        <Button
            value="7"
            onClick={() => props.onNumberClick('7')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="8"
            onClick={() => props.onNumberClick('8')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="9"
            onClick={() => props.onNumberClick('9')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="x"
            onClick={() => props.onCalculate(Operator.multiplication)}
            backgroundColor={ButtonBackgroundColor.Orange}
            selected={props.selectedOperator === Operator.multiplication}
        />
        <br />
        <Button
            value="4"
            onClick={() => props.onNumberClick('4')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="5"
            onClick={() => props.onNumberClick('5')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="6"
            onClick={() => props.onNumberClick('6')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="-"
            onClick={() => props.onCalculate(Operator.subtraction)}
            backgroundColor={ButtonBackgroundColor.Orange}
            selected={props.selectedOperator === Operator.subtraction}
        />
        <br />
        <Button
            value="1"
            onClick={() => props.onNumberClick('1')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="2"
            onClick={() => props.onNumberClick('2')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="3"
            onClick={() => props.onNumberClick('3')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="+"
            onClick={() => props.onCalculate(Operator.addition)}
            backgroundColor={ButtonBackgroundColor.Orange}
            selected={props.selectedOperator === Operator.addition}
        />
        <br />
        <Button
            value="0"
            onClick={() => props.onNumberClick('0')}
            backgroundColor={ButtonBackgroundColor.Gray}
            textAlign="center"
            paddingLeft="12%"
            isLarge={true}
        />
        <Button
            value="."
            onClick={() => props.onNumberClick('.')}
            backgroundColor={ButtonBackgroundColor.Gray}
        />
        <Button
            value="="
            onClick={() => props.onCalculate(Operator.equal)}
            backgroundColor={ButtonBackgroundColor.Orange}
        />
    </Box>
);
