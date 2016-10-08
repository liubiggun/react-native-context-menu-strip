import Zocial from 'react-native-vector-icons/Zocial'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default (type) => {
  switch (type.toLowerCase()) {
    case 'zocial': {
      return Zocial
    }
    case 'octicons': {
      return Octicons
    }
    case 'materialicons': {
      return MaterialIcons
    }
    case 'ionicons': {
      return Ionicons
    }
    case 'foundation': {
      return Foundation
    }
    case 'evilicons': {
      return EvilIcons
    }
    case 'entypo': {
      return Entypo
    }
    case 'fontawesome': {
      return FontAwesome
    }
    default: {
      return FontAwesome
    }
  }
}

