import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type TProps = {};

export const ToolbarMenu: React.FC<TProps> = props => {
  const navigation = useNavigation();

  return <Ionicons name={"ios-menu"} size={28} color={"#000"} style={styles.image} onPress={() => navigation.openDrawer()}/>;
};

const styles = StyleSheet.create({
  image: { marginLeft: 16 }
});
