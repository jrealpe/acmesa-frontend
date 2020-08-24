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

import { ApplicationModel } from "../../models";
import { ApplicationService } from "../../services"

type TProps = {};

export const ApplicationDetailScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
 
  const [description, setDescription] = useState(null);
  const [input2, setInput2] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const application = JSON.parse(route.params["application"]) as ApplicationModel;

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
    if (application.name && application.description) {
      setLoading(true);
      if (application.id === 0) {
        const request = async () => {
          const resp = await ApplicationService.create(application);
          setLoading(false);
          navigation.goBack();
        };
        request();
      } else {
        const request = async () => {
          const resp = await ApplicationService.update(application.id, application);
          setLoading(false);
          navigation.goBack();
        };
        request();
      }
    } else {
      Popup.show({
        type: 'Danger',
        title: `Creacion de Rol`,
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
              onChangeText={(name) => application.name=name}
              onSubmitEditing={() => { input2.focus(); }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Nombre'
              returnKeyType='next'
              style={styles.textInput}
              defaultValue={application.name}
            />
      
            <TextInput
              editable={true}
              onChangeText={(description) => application.description=description} 
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Descripcion'
              ref={(input) => { setInput2(input) }}
              returnKeyType='done'
              style={styles.textInput}
              defaultValue={application.description}
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
