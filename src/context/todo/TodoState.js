import React, {useReducer, useContext} from "react"
import {Alert} from "react-native";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Http} from '../../http';
const DB_URL = 'https://rn-todo-app-f0911-default-rtdb.europe-west1.firebasedatabase.app/';

export const TodoState = ({children}) => {

    const initialState = {
        todos: [],
        loading: false,
        error: null
    };
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        clearError();
        try {
            const data = await Http.post(
                DB_URL + 'todos.json',
                {title}
            );
            dispatch({type: ADD_TODO, title, id: data.name});
        } catch(e) {
            showError();
        }
    };

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
                    "Удаление элемента",
                    `Вы уверены что хотите удалить "${todo.title}"?`,
                    [
                        {
                            text: "Отмена",
                            style: "cancel",
                        },
                        {
                            text: "Удалить",
                            onPress: async () => {
                                clearError();
                                try {
                                    await Http.delete(`${DB_URL}todos/${id}.json`);
                                } catch (e) {
                                    showError();
                                }
                                changeScreen(null);
                                dispatch({type: REMOVE_TODO, id});
                            },
                            style: "destructive",
                        },
                    ],
                    {
                        cancelable: false,
                    }
                );
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const data = await Http.get(DB_URL + 'todos.json');
            // const data = await Http.get('https://rn-todo-app-f0911-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
            if(data) {
                console.log('Fetch Data: ', data);
                const todos = Object.keys(data).map(key => ({...data[key], id: key}));
                dispatch({type: FETCH_TODOS, todos});
            }
            // const response = await fetch('https://rn-todo-app-f0911-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
            //     method: "GET",
            //     headers: {'Content-Type': 'application/json'}
            // });
            // const data = response.json();
            // console.log(data);
        } catch (e) {
            showError();
            console.log(e);
        } finally {
            hideLoader();
        }

    }

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(`${DB_URL}todos/${id}.json`, {title});
            dispatch({type: UPDATE_TODO, id, title});
        } catch (error) {
            showError('Ошибка. Что-то пошло не так');
            console.log(e);
        }
    }

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = (error = 'Ошибка. Что-то пошло не так') => dispatch({type: SHOW_ERROR, error});

    const clearError = () => dispatch({type: CLEAR_ERROR});

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            updateTodo,
            removeTodo,
            fetchTodos
        }}
    >
        {children}
    </TodoContext.Provider>
}