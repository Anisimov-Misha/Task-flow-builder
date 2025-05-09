import { createSlice } from '@reduxjs/toolkit';
import type { State } from '../../types/State';

const initialState: State = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const inputValueSlice = createSlice({
  name: 'inputValue',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: action.payload.id, value: '' });
    },
    setInputValue: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.value = action.payload.value;
    },
    clearTasks: (state) => {
        state.tasks = []
    },
  },
});

export const { addTask, setInputValue, clearTasks } = inputValueSlice.actions;
export default inputValueSlice.reducer;
