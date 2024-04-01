import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
} from './actionTypes';

// Load initial state from localStorage if available
const initialState = JSON.parse(localStorage.getItem('todos')) || { todos: [], filter: 'ALL', searchTerm: '' };

const todoReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_TODO:
      newState = {
        ...state,
        todos: [...state.todos, { text: action.payload.text, completed: false }],
      };
      break;

    case TOGGLE_TODO:
      newState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
      break;

    case REMOVE_TODO:
      newState = {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload.id),
      };
      break;

    case MARK_COMPLETED:
      newState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: true } : todo
        ),
      };
      break;

    case MARK_INCOMPLETE:
      newState = {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: false } : todo
        ),
      };
      break;

    case FILTER_TODOS:
      newState = {
        ...state,
        filter: action.payload.filter,
      };
      break;

    case UPDATE_SEARCH_TERM:
      newState = {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
      break;

    case MARK_ALL_COMPLETED:
      newState = {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, completed: true })),
      };
      break;

    default:
      break;
  }

  // Save state to localStorage after each action
  localStorage.setItem('todos', JSON.stringify(newState));

  return newState;
};

export default todoReducer;
