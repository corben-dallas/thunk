import { DELETE_ITEM } from "./actionTypes";

export const deleteAction = id => ({
	type: DELETE_ITEM,
	payload: { id },
});
