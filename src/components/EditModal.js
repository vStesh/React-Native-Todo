import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, Modal, Alert} from "react-native";
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {

    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if(title.trim().length < 3){
            Alert.alert('Ошибка', `Минимальное количество символов 3. Сейчас ${title.trim().length} символов.`);
        } else {
            onSave(title);
        }
    }

    return (
      <Modal
          visible={visible}
          animationType='slide'
          transparent={false}
      >
          <View style={styles.wrap}>
              <TextInput
                  style={styles.input}
                  placeholder='Введите название'
                  aotuCorrect={false}
                  maxLength={64}
                  value={title}
                  autoFocus={true}
                  onChangeText={setTitle}
              />
              <View style={styles.buttons}>
                  <AppButton
                      onPress={() => {setTitle(value); onCancel()}}
                      color={THEME.DANGER_COLOR}
                  >Отменить</AppButton>
                  <AppButton onPress={saveHandler}>Сохранить</AppButton>
              </View>
          </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#000",
        // opacity: 0.9,
    },
    input: {
        padding: 10,
        width: '80%',
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});