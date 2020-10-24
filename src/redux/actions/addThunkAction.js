import { findAllByDisplayValue } from "@testing-library/react";
import { getData, updateData } from "../../requests/request";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS, FETCH_REQUEST } from "./actionTypes";

export const fetchServicesRequest = () => ({
	type: FETCH_REQUEST,
});

export const fetchDataSuccess = (items) => ({
	type: FETCH_DATA_SUCCESS,
	payload: {
		items,
	},
});

export const fetchDataFailure = (error) => ({
	type: FETCH_DATA_FAILURE,
	payload: {
		error,
	}
})

export const fetchServices = () => async (dispatch) => {
	dispatch(fetchServicesRequest());

	try {
		const response = await getData('http://localhost:7070/api/services');

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();
		dispatch(fetchDataSuccess(data));
	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
};

export const saveServises = (value) => async (dispatch) => {
	dispatch(fetchServicesRequest());
	try {
		const response = await updateData('http://localhost:7070/api/services', 'POST', value);
		
		if (!response.ok) {
			throw new Error(response.statusText);
		}

	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
}

export const removeServises = (id) => async (dispatch) => {
	dispatch(fetchServicesRequest());
	try {
		const response = await updateData(` http://localhost:7070/api/services/${id}`, 'DELETE', {id});
		
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		dispatch(fetchServices());

	} catch (error) {
		dispatch(fetchDataFailure(error.message));
	}
}