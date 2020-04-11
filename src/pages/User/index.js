import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
  };

  setHeaderTitle = () => {
    const { navigation, route } = this.props;

    navigation.setOptions({
      title: route.params.user.name,
    });
  };

  async componentDidMount() {
    this.setHeaderTitle();

    this.setState({ loading: true });

    const { route } = this.props;
    const user = route.params.user;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  render() {
    const { stars, loading } = this.state;
    const { route } = this.props;
    const user = route.params.user;

    if (loading) {
      return (
        <ActivityIndicator size="large" color="#7159c1" style={{ flex: 1 }} />
      );
    }

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item: repo }) => (
            <Starred>
              <OwnerAvatar source={{ uri: repo.owner.avatar_url }} />
              <Info>
                <Title>{repo.name}</Title>
                <Author>{repo.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
