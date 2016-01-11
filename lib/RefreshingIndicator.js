var React = require('react-native')
var {
  Animated,
  View,
  Text,
  ActivityIndicatorIOS,
  PropTypes,
  StyleSheet,
  isValidElement,
  createElement,
} = React

var RefreshingIndicator = React.createClass({
  getInitialState() {
      return {
          indicatorHeight: new Animated.Value(0)   
      };
  },
  propTypes: {
    activityIndicatorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    stylesheet: PropTypes.object,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  },
  getDefaultProps() {
    return {
      activityIndicatorComponent: ActivityIndicatorIOS,
    }
  },
  componentWillReceiveProps(nextProps) {
      if ( nextProps.isRefreshing ) {
        Animated.timing(         
          this.state.indicatorHeight,    
          {
            toValue: 60,
            friction:0,
            duration: 0
          },           
        ).start();  
      } else {
        Animated.timing(         
          this.state.indicatorHeight,    
          {
            toValue: 0,
            friction:1,
            duration: 300
          },           
        ).start();  
      }
  },
  renderActivityIndicator(style) {
    if ( this.props.isRefreshing ) {
      var activityIndicator = this.props.activityIndicatorComponent

      if (isValidElement(activityIndicator)) {
        return activityIndicator
      } else { // is a component class, not an element
        return createElement(activityIndicator, {style})
      }
    } else {
      return <View style={{
        height:20
      }} />
    }
  },
  render() {
    var styles = Object.assign({}, stylesheet, this.props.stylesheet)

    return (
      <Animated.View style={[styles.container, {
        height: this.state.indicatorHeight
      }]}>
        <View style={[styles.container, styles.content]}>
          <Text style={styles.description}>
            {this.props.description}
          </Text>
          {this.renderActivityIndicator(styles.activityIndicator)}
        </View>
      </Animated.View>
    )
  },
})

var stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: "hidden"
  },
  content: {
    marginTop: 10,
    height: 60,
  },
  activityIndicator: {
    height: 20
  }
})

module.exports = RefreshingIndicator
