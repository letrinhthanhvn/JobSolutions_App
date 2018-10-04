/**
* Created by nghinv on Mon Jun 04 2018
* Copyright (c) 2018 nghinv
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Dimensions, Platform, ViewPropTypes, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import IconMaterial from 'react-native-vector-icons/dist/MaterialIcons';
// import { tabbarHeight, safeArea, isX } from '../../common/utils';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center'
  },
  tabbarView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTab: {
    flex: 1,
    justifyContent: 'center'
  },
  viewIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2
  },
  next: {
    position: 'absolute',
    top: 20,
    right: 2,
    backgroundColor: 'transparent'
  },
  prew: {
    position: 'absolute',
    top: 20,
    left: 2,
    backgroundColor: 'transparent'
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 2
  },
  separator: {
    height: StyleSheet.hairlineWidth
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

class TabBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'portrait',
      widthDevice: SCREEN.width,
      heightDevice: SCREEN.height,
      page: true,
      show: true,
    }
  }

  _onLayout = (event) => {
    const maxWidthDevice = Math.max(SCREEN.width, SCREEN.height);

    if (event.width >= maxWidthDevice) {
      this.setState({
        orientation: 'landscape',
        widthDevice: SCREEN.height,
        heightDevice: SCREEN.width
      })
    } else {
      this.setState({
        orientation: 'portrait',
        widthDevice: SCREEN.width,
        heightDevice: SCREEN.height
      })
    }
  }

  getHeight = () => {
    let { orientation } = this.state;
    let heightTab = tabbarHeight;

    if (orientation === 'portrait') {
      return heightTab + (isX ? safeArea.portrait.bottomInset : 0);
    } else {
      return heightTab;
    }
  }

  getPadding = () => {
    let { orientation } = this.state;
    let paddingBottom = 0;

    if (orientation === 'portrait') {
      return paddingBottom + (isX ? safeArea.portrait.bottomInset : 0);
    } else {
      return paddingBottom;
    }
  }

  render() {
    let {
      backgroundColor,
      style,
      renderIcon,
      navigation,
      navigationState,
      getLabel,
      activeTintColor,
      inactiveTintColor,
      jumpToIndex,
      colorIconActive,
      colorIconInactive,
      titleStyle,
      titleSize,
      swipeTab,
      separator,
      bgSeparator,
      hasLabel
    } = this.props;

    const { routes } = navigation.state;
    const numberTab = routes.length;

    const viewDirection = numberTab > 4 ? (
      this.state.page ? <Icon style={styles.next} name="ios-arrow-forward" size={20} color="#fff" /> : <Icon style={styles.prew} name="ios-arrow-back" size={20} color="#fff" />
    ) : <View />

    const contentsView = (
      <View style={styles.tabbarView}>
        {
            routes.map((route, id) => {
            const color = navigationState.state.index === id ? activeTintColor : inactiveTintColor;
            const isActive = navigationState.state.index === id;
            const label = getLabel({ route });
            const icon = route.routes[0].params.icon

            return (
              <TouchableOpacity
                onPress={() => onTabPress({ route })}
                style={[
                  styles.viewTab,
                  {
                    width: this.state.widthDevice / 4 + (Platform.OS === 'android' ? 0.1 : 0),
                    paddingBottom: this.getPadding()
                  }
                ]}
                activeOpacity={.8}
                key={route.routeName}
              >
                {
                  icon ? (
                    <View style={[styles.viewIcon]}>
                      <IconMaterial name={icon} size={isActive ? 32 : 28} color={isActive ? colorIconActive : colorIconInactive} />
                      {
                        hasLabel && <Text style={[{ color, fontSize: titleSize, marginBottom: 2, fontWeight: '500' }, titleStyle]}>{label}</Text>
                      }
                    </View>
                  ) : <Text style={[{ color, fontSize: titleSize, fontWeight: '500' }, titleStyle]}>{label}</Text>
                }
              </TouchableOpacity>
            )
          })
        }
      </View>
    )

    if (swipeTab) {
      return (
        <View onLayout={e => this._onLayout(e.nativeEvent.layout)}>
          {
            separator && <View style={[styles.separator, { backgroundColor: bgSeparator }]} />
          }

          <View
            style={[
              styles.container,
              {
                height: this.getHeight(),
                backgroundColor
              }
            ]}
          >
            <ScrollView
              horizontal
              pagingEnabled
              scrollEnabled={numberTab > 4}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={(o) => {
                var c = o.nativeEvent.contentOffset.x;
                if (c > 0) {
                  this.setState({ page: false })
                } else {
                  this.setState({ page: true })
                }
                if (c == 0 || (c > (numberTab - 4) * this.state.widthDevice / 4 - 1 && c < (numberTab - 4) * this.state.widthDevice / 4 + 1)) {
                  this.setState({
                    show: true
                  })
                } else {
                  this.setState({
                    show: false
                  })
                }
              }}
            >
              {contentsView}
            </ScrollView>
            {
              this.state.show ? viewDirection : <View />
            }
          </View>
        </View>
      )
    }

    return (
      <View
        style={[
          styles.container,
          {
            height: this.getHeight(),
            backgroundColor: 'transparent'
          }
        ]}
      >
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={Platform.OS === "ios" ? 12 : 40}
          blurRadius={Platform.OS === "ios" ? 3 : 10}
        />
        <View style={[styles.viewContent, style]}>
          {contentsView}
        </View>

      </View>
    );
  }
}

TabBar.defaultProps = {
  backgroundColor: 'steelblue',
  colorIconActive: 'white',
  colorIconInactive: 'rgba(0, 0, 0, 0.6)',
  titleSize: Platform.OS === "ios" ? 12 : 11,
  swipeTab: false,
  separator: false,
  bgSeparator: 'rgba(0, 0, 0, 0.6)',
  hasLabel: false
}

TabBar.propTypes = {
  backgroundColor: PropTypes.string,
  style: ViewPropTypes.style,
  colorIconActive: PropTypes.string,
  colorIconInactive: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleSize: PropTypes.number,
  swipeTab: PropTypes.bool,
  separator: PropTypes.bool,
  bgSeparator: PropTypes.string,
  hasLabel: PropTypes.bool
}

export default TabBar;
