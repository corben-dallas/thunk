import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAction } from '../../redux/actions/addAction';
import { deleteAction } from '../../redux/actions/deleteAction';
import { editAction } from '../../redux/actions/editAction';
import { filterAction } from '../../redux/actions/filterAction';

import FormInputs from '../FormInputs';
import List from '../List';

const initialInputState = {description: '', price: ''};

const FirstPage = () => {
	const [inputValue, setInputValue] = useState(initialInputState);
	const [isEdit, setIsEdit] = useState({ state: false, id: '' });
	const editList = useSelector(state => state.editReducer);
	const { searchString: filterSearchValue } = useSelector(state => state.filterReducer);
	const dispatch = useDispatch();
	const [searchFilter, setSearchFilter] = useState(filterSearchValue);

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
		setInputValue(initialInputState);
		setIsEdit({ state: false, id: '' });
	}

	const handleRemoveItem = (id) => {
		dispatch(deleteAction(id));
		setInputValue(initialInputState);
		setIsEdit({ state: false, id: '' });
	}

	const handleEditForm = (data) => {
		const { description, price, id} = data;
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
			/>
			<List 
				itemsList={editList}
				onEdit={handleEditForm}
				onRemove={handleRemoveItem}
				filterSearchValue={filterSearchValue}
			/>
		</Fragment>
	)
}

export default FirstPage;
