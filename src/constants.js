import { PixelRatio, Dimensions, Platform } from 'react-native';

export const ratio = PixelRatio.get()
export const pixel = 1 / PixelRatio.get()
export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height
export const os = Platform.OS
export const statusBarHeight = Platform.OS === 'ios' ? 20 : 25