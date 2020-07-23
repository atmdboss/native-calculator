import * as React from 'react';
import { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// typings
import { DisplayProps } from '../typings';

export const Display: FunctionComponent<DisplayProps> = ({ values }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{values}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 2,
		backgroundColor: '#000000',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	text: {
		fontSize: 40,
		color: 'whitesmoke',
	},
});
