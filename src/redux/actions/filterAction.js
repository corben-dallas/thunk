import { SEARCH_STRING } from "./actionTypes";

export const filterAction = data => ({
	type: SEARCH_STRING,
	payload: data,
})