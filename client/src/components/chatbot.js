import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import '../App.css';
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result : 0,
      x: ''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { test } = steps;
    console.log(test);
    
    if(test.message[0]=='D')
    {
    const {D1,D2,D3,D4,D5} = steps;
    var result=parseInt((D1.value+D2.value+D3.value+D4.value+D5.value)/500 *100);
    var x=test.value;
    this.setState({result,x});
    }
    //this.setState({ name, gender, age });
  }
  

  render() {
    const { result,x } = this.state;
    return (
      <div style={{ width: '100%' }}>
        You have {result}% chance of {x.split(' ')[0]}
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
    state = {
        opened: false
      }
      toggleFloating = ({ opened }) => {
        this.setState({ opened }); 
      }
      
  render() {
    const { opened } = this.state;
    const {head} = "Chatbot";
    var theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#ED502F',
        headerFontColor: '#f5f8fb',
        headerFontSize: '15px',
        botBubbleColor: '#ED502F',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4287f5',

      };
    return (
        <ThemeProvider theme={theme}>
  
      <ChatBot
         headerTitle="Survey Bot"
         recognitionEnable={true}
         botAvatar="data:image/png;base64,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"
        floating={true}
        opened={opened}
        toggleFloating={this.toggleFloating}
        style={{color:'#f06f54'}}
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 100) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Are You Willing To Take Up the Test',
            trigger: 'ask',
          },
          {
            id: 'ask',
            options: [
                { value: 'Yes', label: 'Yes', trigger: 'test' },
                { value: 'No', label: 'No', trigger: 'ok-message' },
              ],
          },
          {
            id: 'test',
            options:[
                { value: 'Depression Test', label: 'Depression Test', trigger: '8' },
                { value: 'Anxiety Test', label: 'Anxiety Test', trigger: 'end-message' },
                { value: 'Bipolar Test', label: 'Bipolar Test', trigger: 'end-message' },
                { value: 'PTSD Test', label: 'PTSD Test', trigger: 'end-message' },
            ]
          },
          {
            id: "8",
            message: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
            trigger: "9"
          }
          ,{
            id: "9",
            message: "Little interest or pleasure in doing things",
            trigger: "D1"
          },{
            id:"D1",
            options: [
                { value: 0, label: 'Not At All', trigger: '11' },
                { value: 50, label: 'Several Days', trigger: '11' },
                { value: 75, label: 'More Than Half of the Days', trigger: '11' },
                { value: 100, label: 'Every Day', trigger: '11' },
              ],
          },
          {
            id: "11",
            message: "Feeling down, depressed, or hopeless",
            trigger:"D2"
          },{
            id:"D2",
            options: [
                { value: 0, label: 'Not At All', trigger: '13' },
                { value: 50, label: 'Several Days', trigger: '13' },
                { value: 75, label: 'More Than Half of the Days', trigger: '13' },
                { value: 100, label: 'Every Day', trigger: '13' },
              ],
          },
          {
            id: "13",
            message: "Trouble falling or staying asleep, or sleeping too much",
            trigger:"D3"
          },{
            id:"D3",
            options: [
                { value: 0, label: 'Not At All', trigger: '15' },
                { value: 50, label: 'Several Days', trigger: '15' },
                { value: 75, label: 'More Than Half of the Days', trigger: '15' },
                { value: 100, label: 'Every Day', trigger: '15' },
              ],
          },
          {
            id: "15",
            message: "Poor appetite or overeating",
            trigger:"D4"
          },{
            id:"D4",
            options: [
                { value: 0, label: 'Not At All', trigger: '17' },
                { value: 50, label: 'Several Days', trigger: '17' },
                { value: 75, label: 'More Than Half of the Days', trigger: '17' },
                { value: 100, label: 'Every Day', trigger: '17' },
              ],
          },
          {
            id: "17",
            message: "Thoughts that you would be better off dead, or of hurting yourself",
            trigger:"D5"
          },{
            id:"D5",
            options: [
                { value: 0, label: 'Not At All', trigger: 'result' },
                { value: 50, label: 'Several Days', trigger: 'result' },
                { value: 75, label: 'More Than Half of the Days', trigger: 'result' },
                { value: 100, label: 'Every Day', trigger: 'result' },
              ],
            },
            {
                id:"result",
                component: <Review />,
                asMessage: true,
                trigger:"end-message"
            },
            {
                id: 'ok-message',
                message: 'Alright! Have A Nice Day',
                end: true,
              },
          {
            id: 'end-message',
            message: 'Thanks! For Filling out the Survey',
            end: true,
          },
        ]}
      />
      </ThemeProvider>
    );
  }
}

export default SimpleForm;