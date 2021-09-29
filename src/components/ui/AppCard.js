import React from "react";
import {View, StyleSheet} from "react-native";

export const AppCard = props => <View style={ {...styles.default, ...props.style} }>{props.children}</View>

const styles = StyleSheet.create({
    default: {
        padding: 20,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.2,
        textShadowOffset: {width: 2, height: 2},
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 8
    }
});