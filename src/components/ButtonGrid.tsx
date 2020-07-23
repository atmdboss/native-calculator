import * as React from 'react';
import { FunctionComponent } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
// typings
import { BGProps } from '../typings';
// helpers
import { buttons, yellowColoredKeys, greyColoredKeys } from '../helperKeys';

export const ButtonGrid: FunctionComponent<BGProps> = ({ handleInput }) => {
	return (
		<View style={styles.container}>
			{buttons.map((valueArr, index) => {
				return (
					<View style={styles.innerView} key={index + 4000}>
						{valueArr.map((value) => {
							return (
								<TouchableOpacity
									activeOpacity={0.7}
									style={[
										styles.button,
										yellowColoredKeys.includes(value) && styles.yellow,
										greyColoredKeys.includes(value) && styles.grey,
										value === '0' && styles.zero,
									]}
									key={value}
									onPress={() => {
										handleInput(value);
									}}
								>
									<Text style={styles.text}>{value}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 7,
		backgroundColor: '#000000',
	},
	innerView: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
	},
	button: {
		borderRadius: 50,
		backgroundColor: '#333333',
		height: 90,
		width: 20,
		margin: 2,
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	yellow: {
		backgroundColor: '#fba022',
	},
	grey: {
		backgroundColor: '#a5a5a5',
	},
	zero: {
		flexGrow: 2.5,
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'whitesmoke',
	},
});
