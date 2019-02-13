import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

class CreateEventScreen extends Component {
  static navigationOptions = {
    title: 'Create new event',
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      title: '',
      description: '',
      location: '',
      date: undefined,
      invites: [],
    };
  }

  addUserToInvites = user => {
    const { invites } = this.state;
    const alreadyInvited = invites.some(item => item.id === user.id);

    if (!alreadyInvited) {
      this.setState(prevState => ({
        invites: [...prevState.invites, user],
      }));
    } else {
      this.setState(prevState => ({
        invites: prevState.invites.filter(item => item.id !== user.id),
      }));
    }
  };

  render() {
    const txt = this.state.date
      ? this.state.date.toString()
      : 'Add date and starting time';

    return (
      <View style={styles.container}>
        <Input
          placeholder="Title"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={title => this.setState({ title })}
        />
        <Input
          placeholder="Description"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={description => this.setState({ description })}
        />
        <Input
          placeholder="Location"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={location => this.setState({ location })}
        />

        <TouchableOpacity
          onPress={() => this.setState({ isDateTimePickerVisible: true })}
        >
          <Text style={styles.link}>{txt}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('InvitePeople', {
              invites: this.state.invites,
              addUserToInvites: this.addUserToInvites,
            })
          }
        >
          <Text style={styles.link}>Invite people</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.invites}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={item.fullName}
              subtitle={item.email}
              leftIcon={{
                name: 'md-checkmark-circle-outline',
                type: 'ionicon',
                size: 35,
                color: '#e74c3c',
              }}
            />
          )}
          style={{
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
          }}
        />

        <Button
          title="Create the event"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode="datetime"
          minimumDate={new Date()}
          onConfirm={date => this.setState({ date })}
          onHideAfterConfirm={() =>
            this.setState({ isDateTimePickerVisible: false })
          }
          onCancel={() => this.setState({ isDateTimePickerVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    padding: 20,
  },
  inputContainer: {
    marginTop: -10,
    marginBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 20,
  },
  link: {
    color: '#e74c3c',
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 25,
  },
});

export default CreateEventScreen;