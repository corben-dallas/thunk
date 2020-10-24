import { nanoid } from 'nanoid';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAction, addServerDataAction, removeItemsAction } from '../../redux/actions/addAction';
import { editAction } from '../../redux/actions/editAction';
import { filterAction } from '../../redux/actions/filterAction';
import { getData, updateData } from '../../requests/request';

import FormInputs from '../FormInputs';
import List from '../List';

const initialInputState = {description: '', price: ''};

const FirstPage = () => {
	const [inputValue, setInputValue] = useState(initialInputState);
	const [isEdit, setIsEdit] = useState({ state: false, id: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const editList = useSelector(state => state.editReducer);
	const { searchString: filterSearchValue } = useSelector(state => state.filterReducer);
	const [searchFilter, setSearchFilter] = useState(filterSearchValue);
	const dispatch = useDispatch();
	// const [isBtnLoading, setIsBtnLoading] = useState(false);

	const fetchNoteList = useCallback(
		() => {
			getData('http://localhost:7070/api/services')
				.then((resp) => {
					console.log(resp);
					dispatch(addServerDataAction(resp));
					setIsLoading(false);
					setError('');
				})
				.catch(() => {
					setIsLoading(false);
					setError('Error! Reload this page');
				})
		}, [dispatch],
	)

	useEffect(() => {
		setIsLoading(true);
		fetchNoteList();
		return () => {
			dispatch(removeItemsAction())
		}
	}, [dispatch, fetchNoteList]);

	const hundleInputChange = (e) => {
		if (!e) return;

		const { name, value } = e.target;
		setInputValue(prev => ({
			...prev,
			[name]: value,
		}));
	}

	const handleAddInputValue = (value) => {
		isEdit.state ? dispatch(editAction({...value, id: isEdit.id })) : dispatch(addAction(value));
		updateData('http://localhost:7070/api/services', 'POST', {...value, id: isEdit.state ? isEdit.id : nanoid()})
		setInputValue(initialInputState);
		setIsEdit({ state: false, id: '' });
	}

	const handleRemoveItem = (id) => {
		setIsLoading(true)
		updateData(`http://localhost:7070/api/services/:${id}`, 'DELETE')
			.then(() => {
				setError('');
				dispatch(removeItemsAction());
				fetchNoteList();
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			})
		setInputValue(initialInputState);
		setIsEdit({ state: false, id: '' });
	}

	const handleEditForm = (data) => {
		const { description, price, id} = data;

		getData(`http://localhost:7070/api/services/:${id}`)
			.then((resp) => {
				console.log(resp);
			})
			.catch(err => console.log(err.message));
		setInputValue({ description, price });
		setIsEdit({state: true, id });
	}

	const handleFilterChange = (e) => {
		const { value } = e.target;
		setSearchFilter(value);
		dispatch(filterAction(value));
	}

	return (
		<Fragment>
			<FormInputs
				onAdd={handleAddInputValue}
				onInputChange={hundleInputChange}
				value={inputValue}
				isEdit={isEdit.state}
				filter={searchFilter}
				onFilterChange={handleFilterChange}
				isFilterDisabled
			/>
			<List
				itemsList={editList}
				onEdit={handleEditForm}
				onRemove={handleRemoveItem}
				filterSearchValue={filterSearchValue}
				isLoading={isLoading}
				error={error}
			/>
		</Fragment>
	)
}

export default FirstPage;
