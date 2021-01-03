import { ApolloClient } from '@apollo/client';
import React, { Component, createContext, ReactElement, useContext } from 'react';
import { auth } from '../config/firebase';

type UserProviderProps = {
  children: ReactElement;
  apollo: ApolloClient<any>;
};

type UserProviderState = {
  initialized: boolean;
  loggedIn: boolean;
  fbUserUid?: string | null;
  profile?: {
    id: string;
  } | null;
};

export const UserContext = createContext<UserProviderState>({
  initialized: false,
  loggedIn: false,
  fbUserUid: null,
  profile: null,
});

export const useProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useProfile hook was used but UserContext not provided');
  }
  if (!context.profile) {
    throw new Error("Profile doesn't exist");
  }
  return context.profile;
};

class UserProvider extends Component<UserProviderProps, UserProviderState> {
  state = {
    initialized: false,
    loggedIn: false,
    fbUserUid: null,
    profile: null,
  };

  unsub: (() => void | undefined) | undefined;

  componentDidMount = () => {
    this.unsub = auth.onAuthStateChanged(async userAuth => {
      let initialized = this.state.initialized;
      if (!this.state.initialized) {
        console.log('initialized');
        initialized = true;
      }
      if (userAuth) {
        console.log('has user');
        // const profile = await this.props.apollo
        //   .query<ProfileQuery>({
        //     query: ProfileDocument
        //   })
        console.log('got profile');
        this.setState({
          ...this.state,
          fbUserUid: userAuth?.uid,
          loggedIn: true,
          profile: {
            id: '1',
          },
          initialized,
        });
      } else {
        console.log('has no user');
        this.setState({
          ...this.state,
          fbUserUid: null,
          loggedIn: false,
          profile: null,
          initialized,
        });
      }
    });
  };

  componentWillUnmount = () => {
    if (this.unsub) this.unsub();
  };

  render() {
    return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
  }
}

export default UserProvider;
