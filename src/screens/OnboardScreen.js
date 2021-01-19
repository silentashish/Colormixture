import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardScreen = (props) => {
  return (
    <Onboarding
      // containerStyles={{backgroundColor: '#DDD1C7'}}
      titleStyles={{color: '#ee4540'}}
      subTitleStyles={{color: '#ee4540'}}
      // bottomBarColor={'#f9f9f9'}
      onSkip={() => props.navigation.navigate('Game')}
      onDone={() => props.navigation.navigate('Game')}
      pages={[
        {
          backgroundColor: '#272121',
          title: 'What is Gradient ?',
          subtitle:
            'Color Gradient specifies a range of position-dependent colors, usually used to fill a region. For example, many window managers allow the screen background to be specified as a gradient. The colors produced by a gradient vary continuously with position, producing smooth color transitions.',
          image: (
            <Image
              source={require('../assests/one.png')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
            />
          ),
        },
        {
          backgroundColor: '#272121',
          title: 'How to win Point ?',
          subtitle:
            'You will be provied with two main color and multiple gradient which is generated from that color. You have to pick right one.',
          image: (
            <Image
              source={require('../assests/two.jpg')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
            />
          ),
        },
        {
          backgroundColor: '#272121',
          title: 'How to play ?',
          subtitle:
            'Find the correct gradient and press that gradient. If it is correct one you will get point.',
          image: (
            <Image
              source={require('../assests/three.jpg')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
            />
          ),
        },
        {
          backgroundColor: '#272121',
          title: "Let's Start ?",
          subtitle: 'Start to find gradient.',
          image: (
            <Image
              source={require('../assests/four.jpg')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
            />
          ),
        },
      ]}
    />
  );
};

export default OnboardScreen;
