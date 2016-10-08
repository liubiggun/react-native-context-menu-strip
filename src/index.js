import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight
} from 'react-native'
import ContextMenuItem from './ContextMenuItem'
import { width as screenWidth, pixel, os, statusBarHeight } from './constants'


export default class ContextMenuStrip extends Component {
  static propTypes = {
    /**
     * Auto hide ContextMenu when ContextMenuStrip.Item is pressed
     */
    autoInactive: PropTypes.bool,
    /**
     * width of menu button
     */
    width: PropTypes.number,
    /**
     * height of menu button
     */
    height: PropTypes.number,
    /**
     * radius of circle which wrap '+' icon
     */
    circleRadius: PropTypes.number,
    /**
     * width of item button
     */
    itemWidth: PropTypes.number,
    /**
     * height of item button
     */
    itemHeight: PropTypes.number,
    /**
     * type of item button
     */
    itemType: PropTypes.oneOf(['opacity', 'highlight']),
    /**
     * backgroundColor of item
     */
    itemBgColor: PropTypes.string,
    /**
     * underlayColor of item
     */
    itemUnderlayColor: PropTypes.string,
    /**
     * underlayColor of menu's main button
     */
    btnUnderlayColor: PropTypes.string,
    /**
     * backgroundColor of menu's main button, (must be rgba value!)
     */
    btnColor: PropTypes.string,
    /**
     * backgroundColor of menu's main button when menu opened, (must be rgba value!)
     */
    btnColorRange: PropTypes.string,
    /**
     * degrees to rotate icon when menu opened
     */
    degrees: PropTypes.number,
    /**
     * scale to resize menu's main button
     */
    scaleRange: PropTypes.number,
    /**
     * borderColor of menu
     */
    menuBorderColor: PropTypes.string,
    /**
     * marginRight of menu items
     */
    menuMarginRight: PropTypes.number,
    /**
     * text color of menu's main button
     */
    btnTextColor: PropTypes.string,
    /**
     * '+' icon
     */
    icon: PropTypes.object,
    /**
     * callback when menu's main button is pressed
     */
    onPress: PropTypes.func,
    /**
     * callback when menu reset
     */
    onReset: PropTypes.func,
  }

  static defaultProps = {
    autoInactive: true,
    width: 60,
    height: 48,
    itemWidth: 150,
    itemHeight: 38,
    circleRadius: 40,
    btnUnderlayColor: '#F8F7F7',
    itemBgColor: 'transparent',
    itemUnderlayColor: '#F8F7F7',
    menuBorderColor: '#D5D5D5',
    btnColor: 'transparent',
    btnTextColor: 'rgba(0,0,0,1)',
    degrees: 0,
    scaleRange: 1,
    itemType: 'highlight',
    menuMarginRight: 0,
    onPress: () => {
    },
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false,
      animating: false,
    }

    this.animation = new Animated.Value(0)
    this.timeout = null
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  getHighlightStyle () {
    return {
      position: 'absolute',
      top: os === 'ios' ? statusBarHeight : 0,
      right: 0,
      bottom: 0,
      left: screenWidth - this.props.width,
      width: this.props.width,
      height: this.props.height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    }
  }

  getItemsLayoutStyle () {
    return {
      position: 'absolute',
      flex: 1,
      top: os === 'ios' ? statusBarHeight + this.props.height : this.props.height,
      right: 0,
      bottom: 0,
      left: screenWidth - this.props.itemWidth - this.props.menuMarginRight,
      flexDirection: 'column',
      backgroundColor: 'transparent',
    }
  }

  getItemsContainerStyle () {
    const {itemWidth, itemHeight, btnColor, menuBorderColor} = this.props
    const height = this.props.children.length * itemHeight

    return {
      width: itemWidth,
      height: height,
      backgroundColor: btnColor,
      borderWidth: 2 * pixel,
      borderColor: menuBorderColor
    }
  }

  render () {
    return (
      <View pointerEvents="box-none" style={styles.layout}>
        <View pointerEvents="box-none" style={styles.layout}>
          {this.state.active && this._renderTouchableBackground()}

          {this._renderMainButton()}
          {this.props.children && this._renderItems()}
        </View>
      </View>
    )
  }

  _renderMainButton () {
    const btnColorMax = this.props.btnColorRange
      ? this.props.btnColorRange
      : this.props.btnColor

    const rectAnimatedViewStyle = {
      width: this.props.width,
      height: this.props.height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [this.props.btnColor, btnColorMax]
      }),
    }


    const circleAnimatedViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: this.props.circleRadius,
      height: this.props.circleRadius,
      borderRadius: this.props.circleRadius / 2,
      transform: [{
        scale: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, this.props.scaleRange]
        }),
      }, {
        rotate: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', this.props.degrees + 'deg']
        })
      }],
    }

    return (
      <TouchableHighlight
        style={this.getHighlightStyle()}
        activeOpacity={0.85}
        underlayColor={this.props.btnUnderlayColor}
        onPress={() => {
          this.props.onPress()
          if (this.props.children) {
            this.animateMenu()
          }
        }}>
        <Animated.View style={rectAnimatedViewStyle}>
          <Animated.View
            style={circleAnimatedViewStyle}>
            {this._renderButtonIcon()}
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
    )
  }

  _renderButtonIcon () {
    const {icon, btnOutRangeTxt, btnTextColor} = this.props

    if (icon) {
      return icon
    }

    const btnTextColorMax = btnOutRangeTxt ? btnOutRangeTxt : btnTextColor

    return (
      <Animated.Text style={[styles.btnText, {
        color: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [btnTextColor, btnTextColorMax]
        })
      }]}>
        +
      </Animated.Text>
    )
  }

  _renderItems () {
    if (!this.state.active) {
      return null
    }

    let items = this.props.children

    if (!Array.isArray(this.props.children)) {
      items = [this.props.children]
    }

    const animatedViewStyle = [
      this.getItemsContainerStyle(),
      {
        backgroundColor: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255,255,255,0)', this.props.btnColor]
        }),
        borderColor: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255,255,255,0)', this.props.menuBorderColor]
        }),
      },
    ]

    return (
      <View
        style={this.getItemsLayoutStyle()}
        pointerEvents={'box-none'}>

        <Animated.View style={animatedViewStyle}>

          {items.map((menuItem, index) => {
            return (
              <ContextMenuItem
                key={index}
                animation={this.animation}
                parentWidth={this.props.width}
                parentHeight={this.props.height}
                width={this.props.itemWidth}
                height={this.props.itemHeight}
                btnType={this.props.itemType}
                underlayColor={this.props.itemUnderlayColor}
                {...menuItem.props}
                onPress={() => {
                  if (this.props.autoInactive) {
                    this.timeout = setTimeout(() => this.reset(), 200)
                  }
                  menuItem.props.onPress()
                }}
              />
            )
          })}

        </Animated.View>

      </View>
    )
  }

  _renderTouchableBackground () {
    return (
      <TouchableHighlight
        activeOpacity={1}
        style={styles.layout}
        pointerEvents={this.state.active ? 'auto' : 'box-none'}
        underlayColor='transparent'
        onPress={() => this.reset()}>
        <View></View>
      </TouchableHighlight>
    )
  }

  animateMenu () {
    if (this.state.active) {
      return this.reset()
    }

    Animated.spring(this.animation, {toValue: 1}).start()

    this.setState({active: true})
  }

  reset () {
    this.props.onReset && this.props.onReset()

    Animated.spring(this.animation, {toValue: 0}).start()

    setTimeout(() => this.setState({active: false}), 250)
  }
}

ContextMenuStrip.Item = ContextMenuItem

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  btnText: {
    marginTop: -4,
    fontSize: 30,
    backgroundColor: 'transparent',
    position: 'relative',
  },
})