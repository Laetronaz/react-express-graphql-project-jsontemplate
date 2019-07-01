const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require("graphql");

//Posts
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

//Comments
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLInt },
    postId: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

//Albums
const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString }
  })
});

//Photos
const PhotoType = new GraphQLObjectType({
  name: "Photo",
  fields: () => ({
    id: { type: GraphQLInt },
    albumId: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString }
  })
});

//Todos
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

//Users
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    address: {
      type: new GraphQLObjectType({
        name: "Address",
        fields: () => ({
          street: { type: GraphQLString },
          suite: { type: GraphQLString },
          city: { type: GraphQLString },
          zipcode: { type: GraphQLString },
          geo: {
            type: new GraphQLObjectType({
              name: "geo",
              fields: () => ({
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat }
              })
            })
          }
        })
      })
    },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    company: {
      type: new GraphQLObjectType({
        name: "company",
        fields: () => ({
          name: { type: GraphQLString },
          catchPhrase: { type: GraphQLString },
          bs: { type: GraphQLString }
        })
      })
    }
  })
});

const Rootquery = new GraphQLObjectType({
  name: "Rootquery",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then(res => res.data);
      }
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
          .then(res => res.data);
      }
    },
    postComments: {
      type: GraphQLList(CommentType),
      args: {
        postId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/comments?postId=${
              args.postId
            }`
          )
          .then(res => res.data);
      }
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/comments")
          .then(res => res.data);
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/comments/${args.id}`)
          .then(res => res.data);
      }
    },
    albums: {
      type: GraphQLList(AlbumType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/albums")
          .then(res => res.data);
      }
    },
    album: {
      type: AlbumType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/albums/${args.id}`)
          .then(res => res.data);
      }
    },
    albumPhotos: {
      type: GraphQLList(PhotoType),
      args: {
        albumId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/photos?albumId=${
              args.albumId
            }`
          )
          .then(res => res.data);
      }
    },
    photos: {
      type: GraphQLList(PhotoType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/photos")
          .then(res => res.data);
      }
    },
    photo: {
      type: PhotoType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/photos/${args.id}`)
          .then(res => res.data);
      }
    },
    todos: {
      type: GraphQLList(TodoType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/todos")
          .then(res => res.data);
      }
    },
    todo: {
      type: TodoType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/todos/${args.id}`)
          .then(res => res.data);
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then(res => res.data);
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
          .then(res => res.data);
      }
    },
    userPosts: {
      type: GraphQLList(PostType),
      args: {
        userId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/posts?userId=${args.userId}`
          )
          .then(res => res.data);
      }
    },
    userAlbums: {
      type: GraphQLList(AlbumType),
      args: {
        userId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/albums?userId=${args.userId}`
          )
          .then(res => res.data);
      }
    },
    userTodos: {
      type: GraphQLList(TodoType),
      args: {
        userId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/todos?userId=${args.userId}`
          )
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: Rootquery });
