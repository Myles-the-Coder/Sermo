import { StyleSheet } from "react-native"
const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
		flex: 1,
	},
  innerContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 25,
    borderRadius: 20,
  },
	img: {
		width: 175,
		height: 175,
    margin: 20
	},
	textInput: {
		width: 300,
		margin: 10,
		padding: 10,
		backgroundColor: 'whitesmoke',
    borderWidth: 1,
    borderColor: 'gray'
	},
  text: {
    fontSize: 20, margin: 10
  }, 
  colorList: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    margin: 20
  },
  blackBackground: {
    backgroundColor: '#090c08'
  },
  lighterBackground: {
    backgroundColor: '#474056'
  },
  grayBackground: {
    backgroundColor: '#8A95A5'
  },
  lightBlueBackground: {
    backgroundColor: '#add8e6'
  },
})