import { ADD_ITEM, ADD_SERVER_DATA, REMOVE_ITEMS } from "./actionTypes";

export const addAction = data => ({
	type: ADD_ITEM,
	payload: data, 
});

export const addServerDataAction = data => ({
	type: ADD_SERVER_DATA,
	payload: data,
});

export const removeItemsAction = () => ({
	type: REMOVE_ITEMS,
})