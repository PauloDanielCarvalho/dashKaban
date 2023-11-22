import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, ApolloLink, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { getMainDefinition } from '@apollo/client/utilities';
import { HttpClientModule } from '@angular/common/http';

import * as AbsintheSocket from "@absinthe/socket";
import {createAbsintheSocketLink} from "@absinthe/socket-apollo-link";
import {Socket as PhoenixSocket} from "phoenix";



const httpUri = 'http://localhost:4000/api';
const wsUri = 'ws://localhost:4000/socket';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {
        headers: {
          Authorization: `Bearer `,
        },
      };
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const http = httpLink.create({ uri: httpUri });

  const socketLink = createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(wsUri))
  );

  const link = split(
    ({ query }) => {
      let definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    socketLink,
    ApolloLink.from([basic, auth, http]),
  );

  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
