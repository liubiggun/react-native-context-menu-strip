# react-native-context-menu-strip
<a href="https://www.npmjs.com/package/react-native-context-menu-strip"><img width="134" height="20" src="https://img.shields.io/npm/dm/react-native-context-menu-strip.svg"></a>&nbsp;&nbsp;[![npm version](https://badge.fury.io/js/react-native-context-menu-strip.svg)](https://badge.fury.io/js/react-native-context-menu-strip)&nbsp;&nbsp;<a href="https://github.com/liubiggun/react-native-context-menu-strip"><img width="84" height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>

A ContextMenuStrip component for react-native

![react-native-context-menu-strip example](https://github.com/liubiggun/react-native-context-menu-strip/blob/master/example.gif)

### Installation
```bash
npm i react-native-context-menu-strip --save
```
### Usage
```js
import ContextMenuStrip from 'react-native-context-menu-strip'
```
#### ContextMenuStrip
`ContextMenuStrip` component is the main component.
###### props
| prop | default | type | description |
| ---- | ---- | ----| ---- |
| autoInactive | true | boolean | Auto hide ContextMenu when ContextMenuStrip.Item is pressed |
| width | 60 | number | width of menu button |
| height | 48 | number | height of menu button |
| circleRadius | 40 | number | radius of circle which wrap '+' icon |
| itemWidth | 150 | number | width of item button |
| itemHeight | 38 | number | height of item button |
| itemType | 'highlight' | 'opacity' or 'highlight' | type of item button |
| itemBgColor | 'transparent' | string | backgroundColor of item |
| itemUnderlayColor | '#F8F7F7' | string | underlayColor of item |
| btnUnderlayColor | '#F8F7F7' | string | underlayColor of menu's main button |
| btnColor | 'transparent' | string | backgroundColor of menu's main button, (must be rgba value!) |
| btnColorRange | undefined | string | backgroundColor of menu's main button when menu opened, (must be rgba value!) |
| degrees | 135 | number | degrees to rotate icon when menu opened |
| scaleRange | undefined | scale to resize menu's main button  |
| menuBorderColor | '#D5D5D5' | string | borderColor of menu |
| menuMarginRight | 0 | number | marginRight of menu items |
| icon | undefined | component | '+' icon |
| onPress | () = {} | function | callback when menu's main button is pressed |
| onReset | undefined | function | callback when menu reset |

##### ContextMenuStrip.Item
`ActionButton.Item` specifies a menu Button.
###### props
| prop | default | type | description |
| ---- | ---- | ----| ---- |
| customized | false | boolean | when customize === false, you need to specify icon and label, when customize === false, you need to specify a child component. |
| btnColor | undefined | string | background color of item button |
| onPress | undefined | function | callback when item button is pressed |
| iconSize | 20 | number | radius of icon on item button |
| itemWidth | 150 | number | width of item button |
| iconName | undefined | number or string | source of Image component or iconName of react-native-vector-icon's component |
| iconType | undefined | PropTypes.oneOf(['Zocial', 'Octicons', 'MaterialIcons', 'Ionicons', 'Foundation', 'EvilIcons', 'Entypo', 'FontAwesome', 'Image']) | type of icon |
| label | undefined | string | label on item button |

### Example
_The following example can be found in `example`._
```js
import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Platform,
  Text,
  View,
  Image,
} from 'react-native';
import ContextMenuStrip from 'react-native-context-menu-strip'

class example extends Component {
  contextMenuStrip

  constructor (props) {
    super(props)
    this.state = {
      menuActive: false,
    }
  }

  onMenuToggled (expand) {
    this.setState({menuActive: expand})
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => this.handleBackButton())
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', () => this.handleBackButton())
  }

  handleBackButton () {
    if (this.state.menuActive) {
      this.setState({
        menuActive: false,
      })
      this.contextMenuStrip.reset()
      return true
    }

    // navigator

    // finally
    return false
  }

  render() {
    return (
      <ContextMenuStrip
        ref={(c) => this.contextMenuStrip = c}
        width={60}
        height={Platform.OS === 'ios' ? 40 : 48}
        itemWidth={150}
        itemHeight={38}
        btnSize={40}
        degrees={135}
        scaleRange={1.5}
        btnColorRange="rgba(88,66,77,0.8)"
        menuMarginRight={10}
        onPress={() => this.onMenuToggled(true)}
        onReset={() => this.onMenuToggled(false)}>

        {/*Icon*/}
        <ContextMenuStrip.Item
          iconType="FontAwesome"
          iconName="comments"
          label="chat"
          onPress={() => {}}
        />
        <ContextMenuStrip.Item
          iconType="FontAwesome"
          iconName="gear"
          label="setting"
          onPress={() => {}}
        />
        <ContextMenuStrip.Item
          iconType="FontAwesome"
          iconName="refresh"
          label="refresh"
          onPress={() => {}}
        />

        {/*Image Icon*/}
        <ContextMenuStrip.Item
          iconType="Image"
          iconName={require('./icons/about.png')}
          label="about"
          onPress={() => {}}
        />

        {/*Customize*/}
        <ContextMenuStrip.Item
          customized={true}
          onPress={() => {}}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <View style={{
              width: 45,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}
                source={require('./icons/chat.png')}
              />
            </View>

            <Text
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}
            >
              Come on
            </Text>
          </View>
        </ContextMenuStrip.Item>

      </ContextMenuStrip>
    )
  }
}


AppRegistry.registerComponent('example', () => example)

```