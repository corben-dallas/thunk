import { EDIT_ITEM } from "./actionTypes";

export const editAction = data => ({
	type: EDIT_ITEM,
	payload: data,
})