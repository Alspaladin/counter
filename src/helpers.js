import {API_URL, MAX_RANDOM_NUMBER, MIN_RANDOM_NUMBER} from "./constants";

export const fetchCounter = async () => {
	const response = await fetch(`${API_URL}/counter`);
	const parsed = await response.json();
	return parsed.counter;
}

export const randomize = () => {
	return Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1)) + MIN_RANDOM_NUMBER
}
