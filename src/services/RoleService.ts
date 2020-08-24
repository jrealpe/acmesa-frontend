import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Toast } from 'popup-ui'

export default class RoleService {
  public static getList = () => {
    const url = `http://127.0.0.1:8000/api/v1/roles/`;
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        return [];
      });
  };

  public static delete = (pk: number) => {
    const url = `http://127.0.0.1:8000/api/v1/roles/${pk}/`;
    return fetch(url, {
        method: 'delete'
      })
      .then(resp => {
        Toast.show({
            title: 'Rol eliminado',
            text: 'El rol ha sido eliminado correctamente.',
            color: '#2ecc71',
            timing: 2000
            
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Rol no eliminado',
            text: 'El rol no ha podido ser eliminado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };

  public static create = (data) => {
    const url = `http://127.0.0.1:8000/api/v1/roles/`;
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        Toast.show({
            title: 'Rol creado',
            text: 'El rol ha sido creado correctamente.',
            color: '#2ecc71',
            timing: 2000
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Rol no creado',
            text: 'El rol no ha podido ser creado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };

  public static update = (pk, data) => {
    const url = `http://127.0.0.1:8000/api/v1/roles/${pk}/`;
    return fetch(url, {
        method: 'patch',
        body: JSON.stringify(data),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        Toast.show({
            title: 'Rol creado',
            text: 'El rol ha sido actualizado correctamente.',
            color: '#2ecc71',
            timing: 2000
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Rol no creado',
            text: 'El rol no ha podido ser actualizado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };
}
