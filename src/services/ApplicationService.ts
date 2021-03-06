import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Toast } from 'popup-ui'

export default class ApplicationService {
  public static getList = () => {
    const url = `http://127.0.0.1:8000/api/v1/applications/`;
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
    const url = `http://127.0.0.1:8000/api/v1/applications/${pk}/`;
    return fetch(url, {
        method: 'delete'
      })
      .then(resp => {
        Toast.show({
            title: 'Aplicacion eliminado',
            text: 'El aplicacion ha sido eliminado correctamente.',
            color: '#2ecc71',
            timing: 2000
            
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Aplicacion no eliminado',
            text: 'El aplicacion no ha podido ser eliminado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };

  public static create = (data) => {
    const url = `http://127.0.0.1:8000/api/v1/applications/`;
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
            title: 'Aplicacion creado',
            text: 'El aplicacion ha sido creado correctamente.',
            color: '#2ecc71',
            timing: 2000
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Aplicacion no creado',
            text: 'El aplicacion no ha podido ser creado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };

  public static update = (pk, data) => {
    const url = `http://127.0.0.1:8000/api/v1/applications/${pk}/`;
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
            title: 'Aplicacion creado',
            text: 'El aplicacion ha sido actualizado correctamente.',
            color: '#2ecc71',
            timing: 2000
        })
        return null;
      })
      .catch(error => {
        Toast.show({
            title: 'Aplicacion no creado',
            text: 'El aplicacion no ha podido ser actualizado.',
            color: '#e74c3c',
            timing: 2000
        })
        return null;
      });
  };
}
