import React from 'react';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fetchCounter, randomize } from './helpers';
import App from './App';

jest.mock('./helpers');

describe('App works as expected', () => {
  beforeEach(() => {
    fetchCounter.mockResolvedValue(10);
  });

  it('initially only shows loading text', async () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  it('Replaces loading text with initial value after api call', async () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
  });

  it('Renders increment, decrement, randomize and add buttons', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    const incrementButton = screen.getByText('Increment');
    const decrementButton = screen.getByText('Decrement');
    const randomizeButton = screen.getByText('Randomize');
    const addCounterButton = screen.getByText('Add counter');

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(randomizeButton).toBeInTheDocument();
    expect(addCounterButton).toBeInTheDocument();
  });

  it('Increments counter on clicking increment button', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    const incrementButton = screen.getByText('Increment');
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
    userEvent.click(incrementButton);
    expect(screen.getByText('Counter: 11')).toBeInTheDocument();
    userEvent.click(incrementButton);
    expect(screen.getByText('Counter: 12')).toBeInTheDocument();
  });

  it('Decrements counter on clicking decrement button', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    const decrementButton = screen.getByText('Decrement');
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
    userEvent.click(decrementButton);
    expect(screen.getByText('Counter: 9')).toBeInTheDocument();
    userEvent.click(decrementButton);
    expect(screen.getByText('Counter: 8')).toBeInTheDocument();
  });

  it('Randomizes counter on clicking random button', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    randomize.mockReturnValueOnce(20);
    const randomizeButton = screen.getByText('Randomize');
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
    userEvent.click(randomizeButton);
    expect(screen.getByText('Counter: 20')).toBeInTheDocument();
    randomize.mockReturnValueOnce(30);
    userEvent.click(randomizeButton);
    expect(screen.getByText('Counter: 30')).toBeInTheDocument();
  });

  it('Adds new counter on clicking add counter button', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    var addCounterButton = screen.getByText('Add counter');
    expect(screen.getAllByText('Counter: 10')).toHaveLength(1);

    userEvent.click(addCounterButton);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getAllByText('Counter: 10')).toHaveLength(2);

    var addCounterButton = screen.getByText('Add counter');
    userEvent.click(addCounterButton);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getAllByText('Counter: 10')).toHaveLength(3);
  });

  it('Fetches counter value from mocked api', async () => {
    const mockedCounterValue = 20;
    fetchCounter.mockImplementationOnce(() => Promise.resolve(mockedCounterValue));

    const fetchedValue = await fetchCounter();
    expect(fetchedValue).toEqual(mockedCounterValue);
  });
})
