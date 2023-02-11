const { request, gql,GraphQLClient } = require('graphql-request');

async function sendQuery(query,variables) {
  const graphQLClient = new GraphQLClient('https://api.start.gg/gql/alpha', {
    headers: {
        authorization: 'Bearer ' + "cf8a22705b8239ddae40fe7942679acb",
    },
    });

  const data = await graphQLClient.request(query,variables);
  return data;
}
const getPlayerListByEvent = gql`
query ($slug: String) {
    tournament(slug: $slug) {
      id
      name
      startAt
      events(limit:100) {
        id
        videogame {
          id
          name
        }
        entrants (query: {
            page:1
            perPage:500 
        }) {
          pageInfo {
            total
          }
          nodes {
              id
                name
          }
        }
      }
    }
  }`;

const getEventListByTournament = gql`
query ($slug: String) {
  tournament(slug: $slug) {
    name
    events(limit:100) {
      name
      videogame {
        name
      }
    }
  }
}`;

const getPlayerId = gql`
query ($slug: String) {
  user(slug: $slug) {
    player {
      id
    }
  }
}`

module.exports = {getPlayerListByEvent,getEventListByTournament,sendQuery};