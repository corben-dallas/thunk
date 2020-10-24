import React, { useEffect, useState } from 'react';

import List from '../List';

import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, removeServises } from '../../redux/actions/addThunkAction';


const SecondPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const dataToShow = useSelector(state => state.thunkReducer);

	useEffect(() => {
		console.log('here');
		dispatch(fetchServices());
		return () => {
			
		};
	}, [dispatch]);

	const handleEditForm = ({id}) => {
		const { url } = match; 
		history.push(`${url}/${id}`);
	}

	const handleRemoveItem = (id) => {
		dispatch(removeServises(id));
	}

	return (
		<List 
			itemsList={dataToShow.list}
			onEdit={handleEditForm}
			onRemove={handleRemoveItem}
			filterSearchValue={''}
			isLoading={dataToShow.isLoading}
			error={dataToShow.error}
		/>
	)
}

export default SecondPage
