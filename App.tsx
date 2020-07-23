import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
// components
import { Display } from './src/components/Display';
import { ButtonGrid } from './src/components/ButtonGrid';
// helpers
import { operators, memoryKeys } from './src/helperKeys';

const App:React.FunctionComponent = () => {
	const [displayValue, setDisplayValue] = React.useState('');
	const [operator, setOperator] = React.useState('');
	const [memory, setMemory] = React.useState('');
	const [isOperatorSet, setIsOperatorSet] = React.useState(false);

	const lastIsOperator = () => {
		return displayValue
			? operators.includes(displayValue[displayValue.length - 1])
			: false;
	};
  
	const inputIsOperator = (input: string) => {
		return operators.includes(input);
	};
  
	const handleNumberFlip = () => {
		if (displayValue) {
			if (lastIsOperator()) {
				let value = displayValue.slice(0, displayValue.length - 1).replace(
					/[()]/g,
					'',
				);
        
				if (value.includes('—')) {
					value = value.replace('—', '-');
				}
				const num = Number(value);

				if (Math.sign(num) === 1) {
					setDisplayValue(`(—${num.toString()})${operator}`);
				} else {
					setDisplayValue(Math.abs(num).toString() + operator);
				}
			} else {
				// either there is one set of numbers or two sets of numbers
				if (operator) {
					// display is two values
					const [first, second] = displayValue.split(operator);

					let value = second.replace(/[()]/g, '');
          
					if (value.includes('—')) {
						value = value.replace('—', '-');
					}
					const num = Number(value);
					if (Math.sign(num) === 1) {
						setDisplayValue(`${first}${operator}(—${num.toString()})`);
					} else {
						setDisplayValue(first + operator + Math.abs(num).toString());
					}
				} else {
					// display is one number
					let value = displayValue.replace(/[()]/g, '');
          
					if (value.includes('—')) {
						value = value.replace('—', '-');
					}
					const num = Number(value);
          
					if (Math.sign(num) === 1) {
						setDisplayValue(`(—${num.toString()})`);
					} else {
						setDisplayValue(Math.abs(num).toString());
					}
				}
			}
		}
	};
  
	const handleResult = () => {
		if (displayValue) {
			if (isOperatorSet) {
				if (!lastIsOperator()) {
					let [first, second] = displayValue.split(operator);

					if (first) {
						first = first.replace(/[()]/g, '');
						if (first.includes('—')) {
							first = first.replace('—', '-');
						}
						if (first.includes('%')) {
							first = first.slice(0, first.length - 1);
							first = (Number(first) / 100).toString();
						}
					}
					if (second) {
						second = second.replace(/[()]/g, '');
						if (second.includes('—')) {
							second = second.replace('—', '-');
						}
						if (second.includes('%')) {
							second = second.slice(0, second.length - 1);
							second = (Number(second) / 100).toString();
						}
					} else {
						return displayValue;
					}

					let result = 0;
					if (operator === '+') {
						result = Number(first) + Number(second);
					} else if (operator === '-') {
						result = Number(first) - Number(second);
					} else if (operator === 'x') {
						result = Number(first) * Number(second);
					} else if (operator === '÷') {
						result = Number(first) / Number(second);
					}
					if (Number.isNaN(result)) {
						Alert.alert('Error', 'Operation not allowed');
						setOperator('');
						setIsOperatorSet(false);
						return '';
					} else {
						if (result < 0) {
							return result.toString().replace('-', '—');
						} else {
							return result.toString();
						}
					}
				}
			} else {
				if (displayValue.includes('%')) {
					let value = displayValue.replace(/[()]/g, '').slice(
						0,
						displayValue.length - 1,
					);
					if (value.includes('—')) {
						value = value.replace('—', '-');
					}
					value = (Number(value) / 100).toString();
					if (Number.isNaN(Number(value))) {
						Alert.alert('Error', 'Operation not allowed');
						setOperator('');
						setIsOperatorSet(false);
						return '';
					} else {
						if (Number(value) < 0) {
							return value.replace('-', '—');
						} else {
							return value;
						}
					}
				}
			}
		}
		return displayValue;
	};
  
	const handleOperationInput = (input: string) => {
		if (isOperatorSet) {
			if (lastIsOperator()) {
				const newValue = displayValue.slice(0, displayValue.length - 1);
				setDisplayValue(newValue + input);
				setOperator(input);
			} else {
				setDisplayValue(() => {
					return handleResult() + input;
				});
				setOperator(input);
			}
		} else {
			if (displayValue) {
				setOperator(input);
				setIsOperatorSet(true);
				setDisplayValue((prev) => {
					return prev + input;
				});
			}
		}
	};

	const handleMemoryInput = (input: string) => {
		if (input === 'mc') {
			setMemory('');
			Alert.alert('Clear', 'Memory cleared');
		} else if (input === 'mr') {
			if (memory) {
				if (lastIsOperator()) {
					setDisplayValue((prev) => prev + memory);
				} else {
					setDisplayValue(memory);
				}
			} else {
				Alert.alert(
					'Empty',
					'Nothing in memory. Try tapping a number and then tapping \'m+\'',
				);
			}
		} else if (input === 'm+') {
			if (!lastIsOperator()) {
				const result = handleResult();
				const resultNum = Number(result) + Number(memory);
				if (resultNum !== 0) {
					setMemory(resultNum.toString());
					Alert.alert(
						'Added to memory',
						`Memory now contains ${resultNum.toString()}`,
					);
				}
			}
		} else if (input === 'm-') {
			if (!lastIsOperator()) {
				const result = handleResult();
				const resultNum = Math.abs(Number(memory) - Number(result));
				setMemory(resultNum.toString());
				Alert.alert(
					'Subtracted from memory',
					`Memory now contains ${resultNum.toString()}`,
				);
			}
		}
	};

	const handleInput = (input: string) => {
		if (input === 'AC') {
			setDisplayValue('');
			setOperator('');
			setIsOperatorSet(false);
		} else if (input === '=') {
			setDisplayValue(handleResult());
			setOperator('');
			setIsOperatorSet(false);
		} else if (input === '+/-') {
			handleNumberFlip();
		} else if (inputIsOperator(input)) {
			handleOperationInput(input);
		} else if (memoryKeys.includes(input)) {
			handleMemoryInput(input);
		} else {
			// if it gets here, then it's likely just a number
			if (displayValue.length < 16) {
				if (input === '0' || input === '%' || input === '.') {
					if (displayValue) {
						setDisplayValue((prev) => prev + input);
					} else {
						if (input === '.') {
							setDisplayValue('0.');
						}
					}
				} else {
					if (displayValue === '0') {
						setDisplayValue(input);
					} else {
						setDisplayValue((prev) => prev + input);
					}
				}
			}
		}
	};

	return (
		<View style={styles.container}>
			<Display values={displayValue} />
			<ButtonGrid handleInput={handleInput} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
