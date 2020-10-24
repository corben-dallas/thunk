import React from 'react';
import { nanoid } from 'nanoid';

const List = ({ itemsList, onEdit, onRemove, filterSearchValue, isLoading, error }) => {

	let filteredCertsList = [...itemsList];

	if (filterSearchValue.length > 0) {
		filteredCertsList = itemsList.filter((list) => {
			if (!list) return false;
			const descriptionIncludes = 
				list.description ? 
					list.description.toLowerCase().includes(filterSearchValue.trim().toLowerCase()) : false;
			const priceIncludes = 
				list.price ? 
					list.price.toLowerCase().includes(filterSearchValue.trim().toLowerCase()) : false;

			return descriptionIncludes || priceIncludes;
		});
	}

	if (isLoading) {
		return <p>Loading ...</p>;
	}

	if (!!error.length) {
		return <p>{error}</p>;
	}

	const isBtnLoading = false;

	return (
		<div className="list">
			{
				itemsList.length === 0 && 
				filterSearchValue.length === 0 && 
				<p>No items added</p>
			}
			{
				filterSearchValue.length !== 0 &&
				filteredCertsList.length === 0 &&
				<p>No result</p>
			}
			{filteredCertsList.map(item => (
				<div key={nanoid()} className="list__item">
					<div className="list__description">{item.description || item.name}</div>
					<div className="list__price">{item.price}</div>
					<div className={`list__action ${isBtnLoading ? 'list__action--loading' : ''}`}>
						<div
							onClick={!isBtnLoading ? () => onEdit({ ...item }) : null}
							className="list__action--edit"
						>
							<i className="material-icons">edit</i>
						</div>
						<div
							onClick={!isBtnLoading ? () => onRemove(item.id) : null}
							className="list__action--remove"
						>
							<i className="material-icons">close</i>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default List;
