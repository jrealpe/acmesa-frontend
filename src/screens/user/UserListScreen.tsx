import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Root, Popup } from 'popup-ui'

import { Theme } from "../../theme";
import NavigationNames from "../../navigations/NavigationNames";
import { UserModel } from "../../models";
import { UserService } from "../../services";


type TProps = {};

export const UserListScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<UserModel[]>([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, []);

  const fetchData = () => {
    setRefresh(true);
    setLoading(true);
    const request = async () => {
      const result = await UserService.getList();
      setData(result);
      setLoading(false);
    };
    request();
  };

  const deleteData = (pk: number) => {
    setLoading(true);
    const request = async () => {
      await UserService.delete(pk);
    };
    request();
  };

  return (
    <Root>
      <View style={{ flex: 1}}>
        {isLoading ? <ActivityIndicator style={{marginTop: 16}} size="large" /> : (
          <View style={{ flex: 1}}>
            <Text style={{fontSize: 26, textAlign: 'center'}}>Usuarios</Text>
            <FlatList
              data={data}
              extraData={refresh}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }: { item: UserModel }) => (
                <View style={styles.container}>
                  <View style={styles.itemContainer}>
                    <View style={styles.rows}>
                      <Text style={styles.titleText}>{item.username}</Text>
                      <Text style={styles.descriptionText}>{item.first_name}{" "}{item.last_name}</Text>
                    </View>
                    <View >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(NavigationNames.UserDetailScreen, {
                            user: JSON.stringify(item)
                          })
                        }
                      >
                        <Ionicons name={"md-create"} size={20} color={"#0715cd"} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Popup.show({
                            type: 'Warning',
                            title: `${item.username}`,
                            button: false,
                            textBody: '¿Estas seguro que deseas eliminar el usario?',
                            buttontext: 'Ok',
                            callback: () => {
                              Popup.hide()
                              
                              deleteData(item.id);
                              fetchData();
                            }
                          })
                        }
                      >
                        <Ionicons name={"md-trash"} size={20} color={"#a10000"} />
                      </TouchableOpacity>
                     
                    </View>
                  </View>
                  <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 20}} />
                </View>
              )}
            />
          
            <View style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 32,
              right: 16,
              position: 'absolute'}}
            >
              <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    backgroundColor: '#000',
                    borderRadius: 100,
                    opacity: 0.8
                  }}
                onPress={() => 
                  navigation.navigate(NavigationNames.UserDetailScreen, {user: JSON.stringify({id: 0, username: "", password: "", first_name: "", last_name: ""})})
                }
              >
                <Ionicons name={"md-add"} size={28} color={"#fff"} />
              </TouchableOpacity>
            </View>
            <View style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 118,
              right: 16,
              position: 'absolute'}}
            >
              <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    backgroundColor: '#000',
                    borderRadius: 100,
                    opacity: 0.8
                  }}
                onPress={() => fetchData()}
              >
                <Ionicons name={"md-sync"} size={28} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View> 
        )}
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  iconImage: { 
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  container: {
    padding: 10
  },
  itemContainer: {
    borderRadius: 12,
    flexDirection: "row"
  },
  rows: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black
  },
  descriptionText: {
    marginTop: 3,
    fontSize: 14,
    color: Theme.colors.gray
  },
});
