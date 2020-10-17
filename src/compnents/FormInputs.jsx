import React from 'react';

const FormInputs = ({
	onAdd,
	value,
	onInputChange,
	isEdit,
	filter,
	onFilterChange,
}) => {
	return (
		<>
			<div>
				<input 
					type="text"
					name="description"
					value={value.description}
					onChange={onInputChange}
					placeholder="Add a description"
				/>
				<input 
					type="text"
					name="price"
					value={value.price}
					onChange={onInputChange}
					placeholder="add price"
				/>
				<button 
					className=""
					disabled={!value.description || !value.price}
					onClick={() => { onAdd(value) }}
				>
					{isEdit ? 'Edit' : 'Add'}
				</button>
				<input 
					type="text"
					value={filter}
					name="filter"
					onChange={onFilterChange}
					placeholder="Filter by description and price"
					style={{marginLeft: '25px', width: '200px'}}
				/>
			</div>
		</>
	)
}

export default FormInputs
