import { ADD_ITEM } from "./actionTypes";

export const addAction = data => ({
	type: ADD_ITEM,
	payload: data, 
});