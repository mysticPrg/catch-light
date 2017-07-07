import React, { Component } from 'react';
import styled from 'styled-components';

class UnstyledCheckBox extends Component {
	render() {
		return (
			<label className={this.props.className}>
				<input type="checkbox"/>
				{this.props.children}
			</label>
		);
	}
}

export const CheckBox = styled(UnstyledCheckBox)`
	color: green;
`;

export default CheckBox;