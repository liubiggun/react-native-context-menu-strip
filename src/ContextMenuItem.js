import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { width } from './constants'
import getIconTypes from './getIconTypes'

export default class ContextMenuItem extends Component {
  static propTypes = {
    /**
     * when customize === false, you need to specify icon and label,
     * when customize === false, you need to specify a child component.
     */
    customized: PropTypes.bool,
    btnColor: PropTypes.string,
    onPress: PropTypes.func,
    iconSize: PropTypes.number,
    iconName: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    iconColor: PropTypes.string,
    iconType: PropTypes.oneOf([
      'Zocial',
      'Octicons',
      'MaterialIcons',
      'Ionicons',
      'Foundation',
      'EvilIcons',
      'Entypo',
      'FontAwesome',
      'Image',
    ]),
    label: PropTypes.string,

    animation: PropTypes.object,
    parentWidth: PropTypes.number,
    parentHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    btnType: PropTypes.oneOf(['opacity', 'highlight']),
    underlayColor: PropTypes.string,
  }

  static defaultProps = {
    customized: false,
    iconSize: 20,
    btnColor: 'transparent',
    iconColor: '#7F7F7F',
  }

  getItemIconStyle () {
    return {
      width: this.props.iconSize + 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
    }
  }

  getItemLabelStyle () {
    return {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
    }
  }

  render () {
    const {
      children,
      style,
      customized,
      animation,
      btnType,
      onPress,
      iconSize,
      width,
      height,
      underlayColor,
      btnColor,
      iconName,
      iconType,
      iconColor,
      label,
    } = this.props

    const Touchable = btnType === 'opacity' ? TouchableOpacity : TouchableHighlight
    let Icon = null

    if (customized) {
      if (!children || Array.isArray(children)) {
        throw new Error("Non-customized ContextMenuItem must has one and only one Child component.")
      }
    } else {
      if (!iconName || !iconType || !label) {
        throw new Error("Customized ContextMenuItem must has iconName, iconType and label.")
      }

      if (iconType === 'Image') {
        Icon = (
          <Image
            style={{
              width: iconSize,
              height: iconSize,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={iconName}
          />
        )
      } else {
        const VectorIcon = getIconTypes(iconType)
        Icon = (
          <VectorIcon
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        )
      }
    }

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.layout,
          {
            opacity: animation,
            transform: [
              {translateX: 0},
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    -40,
                    0
                  ]
                }),
              }
            ],
          }
        ]}>

        <Touchable
          style={{flex: 1}}
          activeOpacity={0.85}
          underlayColor={underlayColor}
          onPress={onPress}>

          {
            customized
              ? (
                <View
                  style={[styles.container, style, {
                    width,
                    height,
                    backgroundColor: btnColor,
                    justifyContent: 'center',
                  }]}>

                  {children}
                </View>
              )
              : (
                <View
                  style={[styles.container, style, {
                    width,
                    height,
                    backgroundColor: btnColor,
                    justifyContent: 'flex-start',
                  }]}>

                  <View style={this.getItemIconStyle()}>
                    {Icon}
                  </View>
                  <Text style={this.getItemLabelStyle()}>{label}</Text>

                </View>
              )
          }
        </Touchable>

      </Animated.View>
    )

  }

}

const styles = StyleSheet.create({
  layout: {
    width
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
  },

})