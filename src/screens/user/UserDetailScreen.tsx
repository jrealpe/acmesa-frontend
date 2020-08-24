import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInput,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Root, Popup } from 'popup-ui'

import { UserModel } from "../../models";
import { UserService } from "../../services"

type TProps = {};

export const UserDetailScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
 
  const [description, setDescription] = useState(null);
  const [input2, setInput2] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const user = JSON.parse(route.params["user"]) as UserModel;

  useEffect(() => {

    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    });
  }, []);


  onSubmit = () => {
    Keyboard.dismiss;
    if (user.first_name !== '') {
      setLoading(true);
      if (user.id === 0) {
        const request = async () => {
          const resp = await UserService.create(user);
          setLoading(false);
          navigation.goBack();
        };
        request();
      } else {
        const request = async () => {
          const resp = await UserService.update(user.id, user);
          setLoading(false);
          navigation.goBack();
        };
        request();
      }
    } else {
      Popup.show({
        type: 'Danger',
        title: `Creacion de Usuario`,
        button: false,
        textBody: 'Por favor, llenar todos los campos',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      });
    }
  }

  return (
    <Root>
    <View style={{ flex: 1}}>
      {isLoading ? <ActivityIndicator style={{marginTop: 16}} size="large" /> : (
      <ScrollView
      >
        <View style={styles.container}>
            <TextInput
              editable={true}
              onChangeText={(username) => user.username=username}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Usuario'
              returnKeyType='next'
              style={styles.textInput}
              defaultValue={user.username}
            />

            <TextInput
              editable={true}
              onChangeText={(password) => user.password=password}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Contrasena'
              returnKeyType='next'
              style={styles.textInput}
              defaultValue={user.password}
            />

            <TextInput
              editable={true}
              onChangeText={(first_name) => user.first_name=first_name}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Nombre'
              returnKeyType='next'
              style={styles.textInput}
              defaultValue={user.first_name}
            />
      
            <TextInput
              editable={true}
              onChangeText={(last_name) => user.last_name=last_name} 
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Apellido'
              ref={(input) => { setInput2(input) }}
              returnKeyType='done'
              style={styles.textInput}
              defaultValue={user.last_name}
            />
      
            <TouchableOpacity
              style={styles.submit}
              onPress={onSubmit}>
              <Text style={styles.submitTitle}>Crear</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      )}
    </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  textInput: {
    width: '100%',
    marginBottom: 24,
    paddingBottom: 4,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  submit: {
    backgroundColor: '#000',
    marginTop: 24,
    height: 50,
    justifyContent: 'center'
  },
  submitTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  }
});
