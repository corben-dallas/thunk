import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, saveServises } from '../redux/actions/addThunkAction';

const FormEdit = ({match, history}) => {
	const { id } = match.params;
	const dispatch = useDispatch();
	const listItems = useSelector(state => state.thunkReducer);
	const [inputValue, setInputValue] = useState({
		name: '',
		price: '',
		id: '',
	})

	useEffect(() => {
		dispatch(fetchServices());
	}, [dispatch]);

	useEffect(() => {
		const filteredItem = listItems.list.filter(item => +item.id === +id);	
		filteredItem.length > 0 && setInputValue(prev => ({
			...prev,
			price: filteredItem[0].price,
			name: filteredItem[0].name,
			id: filteredItem[0].id,
		}))
	}, [listItems.list, id]);

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setInputValue(prev => ({
			...prev,
			[name]: value,
		}));
	}

	const handleSaveChange = () => {
		console.log('inputValue', inputValue);
		const promise = dispatch(saveServises(inputValue));
		promise
			.then(() => {
				history.goBack();
			})
			.catch(err => {
				console.log(err);
			})
	}

	const handleCancelChange = () => {
		history.goBack();
	}

	return (
		<>
			<input 
				type="text"
				value={inputValue.name}
				name='name'
				onChange={onInputChange}
			/>
			<input 
				type="text"
				value={inputValue.price}
				name="price"
				onChange={onInputChange}
			/>
			<button onClick={handleSaveChange}>Ok</button>
			<button onClick={handleCancelChange}>Cancel</button>
		</>
	)
}

export default FormEdit;
