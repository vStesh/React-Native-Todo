import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button, Alert, Keyboard} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../theme";

export const AddTodo = ({ onSubmit }) => {

    const [value, setValue] = useState('');

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        } else {
            //erro
            Alert.alert('Название не должно быть пустым');
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                onChangeText={text => setValue(text)}
                // onChangeText={setValue}
                value={value}
                style={styles.input}
                placeholder="Введите название дела..."
                autocorrect={true}
                autoCapitalize='none'
                // keyboardType='number-pad'
            />
            <AntDesign.Button onPress={pressHandler} name="pluscircleo">
                Добавить
            </AntDesign.Button>
            {/*<Button title='Добавить' onPress={pressHandler}/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});