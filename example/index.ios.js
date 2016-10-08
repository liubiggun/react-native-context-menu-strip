
import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Platform,
  Text,
  View,
  Image,
} from 'react-native';
import ContextMenuStrip from './ContextMenuStrip'

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
