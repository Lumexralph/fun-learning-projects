import React, { Component } from 'react';
import { withAuthenticator, Auth } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import logo from './logo.svg';
import './App.css';
// import { styles } from 'ansi-colors';

const listTodos = `
query {
  listTodos {
    items {
      id name description completed
    }
  }
}`;

class App extends Component {
  state = {
    todos: [],
    people: [],
  }

  async componentDidMount() {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    const peopleData = await API.get('peopleapi', '/people');
    this.setState({
      todos: todoData.data.listTodos.items,
      people: peopleData.data,
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signUp = async () => {
    const { username, password, email, phoneNumber } = this.state;

    try {
      await Auth.signUp({ username, password, attributes: { email, phoneNumber } });
      console.log('successfully signed up');
    } catch (error) {
      console.log('error signing up', error);
    }

  }

  confirmSignup = async () => {
    const { username, authenticationCode } = this.state;

    try {
      await Auth.confirmSignup(username, authenticationCode);
      console.log('User successfully signed up!');
    } catch (error) {
      console.log('error signing up', error);
    }
  }

  render() {
    return (
      <div className="App">
        {/* {
          this.state.step === 0 && (
            <div>
              <input placeholder='name' 
                     onChange={this.onChange}
                     name='username'
                     type='text'
                     style={styles.input} />
              <input placeholder='password'
                     onChange={this.onChange}
                     name='password'
                     type='password'
                     style={styles.input} />
              <input placeholder='email'
                     onChange={this.onChange}
                     name='email'
                     type='email'
                     style={styles.input} />
              <input placeholder='phone number'
                     onChange={this.onChange}
                     name='phone-number'
                     type='number'
                     style={styles.input} />
              <button onClick={this.signUp}>Sign Up</button>
            </div>
          )
        }
        {
          this.state.step === 1 && (
            <div>
              <input placeholder='username'
                     onChange={this.onChange}
                     name='username'
                     type='text'
                     style={styles.input} />
              <input placeholder='authentication code'
                     onChange={this.onChange}
                     name='password'
                     type='password'
                     style={styles.input} />
              <button onClick={this.confirmSignup}>Confirm Sign Up</button>
            </div>
          )
        } */}
        {
          this.state.todos.map((todo, i) => (
            <div>
              <h3>
                {todo.name}
                {todo.description}
              </h3>
            </div>
          ))
        }
        <h3>People</h3>
        {
          this.state.people.map(person => (
            <div>
              <h3>{person.name}</h3>
              <h4>{person.hair}</h4>
            </div>
          ))
        }
      </div>
    );
  }
}

const styles = {
  input: {
    height: 35,
    margin: 5,
  }
};

export default withAuthenticator(App, { includeGreetings: true });
// export default App;
