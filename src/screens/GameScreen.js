import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  CheckBox,
} from 'react-native';
import {Header} from '../components';
import {backgroundColor, primaryColor} from '../utils';
import randomColor from 'randomcolor';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const ColorBox = ({color, answer}) => {
  return (
    <View
      style={[
        styles.colorBox,
        {
          backgroundColor: color,
          width: answer ? 150 : 100,
          marginHorizontal: answer ? null : 30,
          marginBottom: answer ? 50 : 20,
        },
      ]}
    />
  );
};

const GameScreen = () => {
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [answerTrue, setAnswerTrue] = useState(false);

  const [color, setColor] = useState({
    one: 'blue',
    two: 'red',
    three: 'brown',
    four: 'pink',
    five: 'orange',
    six: 'white',
    seven: 'gray',
    eight: 'black',
  });

  const [ansOne, setansOne] = useState(color.one);
  const [ansTwo, setansTwo] = useState(color.two);
  const [ansThree, setansThree] = useState(color.three);
  const [ansFour, setansFour] = useState(color.four);
  const [answerIn, setAnswerIn] = useState(1);

  const ColorBoxAnswer = ({
    colorOne,
    colorTwo,
    colorThree,
    colorFour,
    answer,
    onPress,
    answerIn,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (answerIn) {
            checkAnswer(true);
          } else {
            checkAnswer(false);
          }
        }}>
        <LinearGradient
          colors={
            answerIn
              ? [ansOne, ansTwo, ansThree, ansFour]
              : [colorOne, colorTwo, colorThree, colorFour]
          }
          style={[
            styles.colorBox,
            {
              height: answer ? 70 : 100,
              width: answer ? 150 : 100,
              marginBottom: answer ? 12 : null,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getTwoRandom = () => {
    let one = getRandomInt(1, 8);
    let two = getRandomInt(1, 8);
    let three = getRandomInt(1, 8);
    let four = getRandomInt(1, 8);
    if (
      one !== two &&
      one !== three &&
      one !== four &&
      two !== three &&
      two !== four &&
      three !== four
    ) {
      return {colorone: one, colortwo: two, colorthree: three, colorfour: four};
    } else {
      return getTwoRandom();
    }
  };

  const getColor = () => {
    const one = randomColor();
    const two = randomColor();
    const three = randomColor();
    const four = randomColor();
    const five = randomColor();
    const six = randomColor();
    const seven = randomColor();
    const eight = randomColor();

    let colorArray = [one, two, three, four, five, six, seven, eight];
    let {colorone, colortwo, colorthree, colorfour} = getTwoRandom();

    setansOne(colorArray[colorone - 1]);
    setansTwo(colorArray[colortwo - 1]);
    setansThree(colorArray[colorthree - 1]);
    setansFour(colorArray[colorfour - 1]);

    setColor({
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
    });
  };

  useEffect(() => {
    getColor();
  }, []);

  const checkTrue = (color) => {
    if (
      color === ansOne ||
      color === ansTwo ||
      color === ansThree ||
      color === ansFour
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkAnswer = (result) => {
    setAnswerIn(getRandomInt(1, 6));
    if (result) {
      setAnswerTrue(true);
      setshowModal(true);
    } else {
      setAnswerTrue(false);
      setshowModal(true);
    }
  };

  const modalOkAction = () => {
    if (answerTrue) {
      setScore((score) => score + 1);
    }
    getColor();
    setQuestion((question) => question + 1);
    setshowModal(false);
  };

  return (
    <View style={styles.container}>
      <Header score={score} question={question} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setshowModal(true)}>
        <View style={styles.modalView}>
          <View style={styles.contain}>
            <Text
              style={[
                styles.modalButtonTxt,
                {color: answerTrue ? 'green' : 'red'},
              ]}>
              {answerTrue ? 'Correct Answer' : 'Wrong Answer'}
            </Text>
            <View style={{width: '100%', height: '70%'}}>
              <LottieView
                source={
                  answerTrue
                    ? require('../assests/success.json')
                    : require('../assests/failure.json')
                }
                autoPlay
                loop
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={modalOkAction}>
                <Text style={[styles.ButtonTxt]}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bxView}>
        <View style={styles.ques}>
          <ColorBox color={ansOne} />
          <Text style={styles.plusSign}>+</Text>
          <ColorBox color={ansTwo} />
          {/* <Text style={styles.plusSign}>+</Text> */}
          <ColorBox color={ansThree} />
          {/* <Text style={styles.plusSign}>+</Text> */}
          <ColorBox color={ansFour} />
        </View>

        <View style={styles.txtBox}>
          <Text style={styles.txtMessage}>
            The Combination of Above Two Color Generate which gradient ?
          </Text>
        </View>

        <View style={styles.ans}>
          <ColorBoxAnswer
            answerIn={answerIn === 1}
            colorOne={color.one}
            colorTwo={color.two}
            colorThree={color.three}
            colorFour={color.four}
            answer
            onPress={() =>
              checkAnswer(color.one, color.two, color.three, color.four)
            }
          />

          <ColorBoxAnswer
            answerIn={answerIn === 2}
            colorOne={color.two}
            colorTwo={color.three}
            colorThree={color.four}
            colorFour={color.five}
            answer
            onPress={() =>
              checkAnswer(color.two, color.three, color.four, color.five)
            }
          />

          <ColorBoxAnswer
            answerIn={answerIn === 3}
            colorOne={color.three}
            colorTwo={color.four}
            colorThree={color.five}
            colorFour={color.six}
            answer
            onPress={() =>
              checkAnswer(color.three, color.four, color, color.five, color.six)
            }
          />

          <ColorBoxAnswer
            answerIn={answerIn === 4}
            colorOne={color.one}
            colorTwo={color.four}
            colorThree={color.seven}
            colorFour={color.eight}
            answer
            onPress={() =>
              checkAnswer(color.one, color.four, color.seven, color.eight)
            }
          />
          <ColorBoxAnswer
            answerIn={answerIn === 5}
            colorOne={color.one}
            colorTwo={color.four}
            colorThree={color.five}
            colorFour={color.six}
            answer
            onPress={() =>
              checkAnswer(color.one, color.four, color, color.five, color.six)
            }
          />

          <ColorBoxAnswer
            answerIn={answerIn === 6}
            colorOne={color.one}
            colorTwo={color.four}
            colorThree={color.seven}
            colorFour={color.five}
            answer
            onPress={() =>
              checkAnswer(color.one, color.four, color.seven, color.eight)
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: backgroundColor,
  },
  colorBox: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  plusSign: {
    fontSize: 70,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    right: '45%',
  },
  ques: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ans: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bxView: {
    justifyContent: 'space-around',
    flex: 1,
  },
  txtBox: {
    width: '85%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 3,
    padding: 10,
    borderRadius: 8,
  },
  txtMessage: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contain: {
    width: '70%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  modalButtonTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  ButtonTxt: {
    color: 'black',
  },
  modalButton: {
    backgroundColor: primaryColor,
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

export default GameScreen;
