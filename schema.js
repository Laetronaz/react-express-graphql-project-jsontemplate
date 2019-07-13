const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");

//Posts
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "GraphQLObjectType representing a Post",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    comments: postComments
  })
});

//Comments
const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "GraphQLObjectType representing a Comment",
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
  description: "GraphQLObjectType representing an Album",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    photos: albumPhotos
  })
});

//Photos
const PhotoType = new GraphQLObjectType({
  name: "Photo",
  description: "GraphQLObjectType representing a Photo",
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
  description: "GraphQLObjectType representing a Todo",
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
  description: "GraphQLObjectType representing a User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    posts: userPosts,
    albums: userAlbums,
    todos: userTodos
  })
});

const postComments = {
  type: GraphQLList(CommentType),
  resolve(parent, args) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${parent.id}`)
      .then(res => res.data);
  }
};

const albumPhotos = {
  type: GraphQLList(PhotoType),
  resolve(parent, args) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${parent.id}`)
      .then(res => res.data);
  }
};

const userPosts = {
  type: GraphQLList(PostType),
  resolve(parent, args) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${parent.id}`)
      .then(res => res.data);
  }
};

const userAlbums = {
  type: GraphQLList(AlbumType),
  resolve(parent, args) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${parent.id}`)
      .then(res => res.data);
  }
};

const userTodos = {
  type: GraphQLList(TodoType),
  resolve(parent, args) {
    return axios
      .get(`https://jsonplaceholder.typicode.com/todos?userId=${parent.id}`)
      .then(res => res.data);
  }
};

const Rootquery = new GraphQLObjectType({
  name: "jsonTemplateAPI",
  description: "Queries for the The JSONTemplate API requests",
  fields: {
    posts: {
      description: "GraphQL GET request to get all Posts",
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then(res => res.data);
      }
    },
    post: {
      description: "GraphQL GET request to get a single Post",
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
    addPost: {
      description: "GraphQL POST request to create a single Post",
      type: PostType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            userId: args.userId,
            title: args.title,
            body: args.body
          })
          .then(res => res.data);
      }
    },
    editPost: {
      description: "GraphQL PATCH request to update a single Post",
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .patch("https://jsonplaceholder.typicode.com/posts/" + args.id, args)
          .then(res => res.data);
      }
    },
    deletePost: {
      description: "GraphQL DELETE request to delete a single Post",
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/posts/" + args.id)
          .then(res => res.data);
      }
    },
    comments: {
      description: "GraphQL GET request to get all Comments",
      type: GraphQLList(CommentType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/comments")
          .then(res => res.data);
      }
    },
    comment: {
      description: "GraphQL GET request to get a single Comment",
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
    addComment: {
      description: "GraphQL POST request to create a single Comment",
      type: CommentType,
      args: {
        postId: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/comments", {
            postId: args.postId,
            name: args.name,
            email: args.email,
            body: args.body
          })
          .then(res => res.data);
      }
    },
    editComment: {
      description: "GraphQL PATCH request to update a single Comment",
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .patch(
            "https://jsonplaceholder.typicode.com/comments/" + args.id,
            args
          )
          .then(res => res.data);
      }
    },
    deleteComment: {
      description: "GraphQL DELETE request to delete a single Comment",
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/comments/" + args.id)
          .then(res => res.data);
      }
    },
    albums: {
      description: "GraphQL GET request to get all Albums",
      type: GraphQLList(AlbumType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/albums")
          .then(res => res.data);
      }
    },
    album: {
      description: "GraphQL GET request to get a single Album",
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
    addAlbum: {
      description: "GraphQL POST request to create a single Album",
      type: AlbumType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/albums", {
            userId: args.userId,
            title: args.title
          })
          .then(res => res.data);
      }
    },
    editAlbum: {
      description: "GraphQL PATCH request to update a single Album",
      type: AlbumType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .patch("https://jsonplaceholder.typicode.com/albums/" + args.id, args)
          .then(res => res.data);
      }
    },
    deleteAlbum: {
      description: "GraphQL DELETE request to delete a single Album",
      type: AlbumType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/albums/" + args.id)
          .then(res => res.data);
      }
    },
    photos: {
      description: "GraphQL GET request to get all Photos",
      type: GraphQLList(PhotoType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/photos")
          .then(res => res.data);
      }
    },
    photo: {
      description: "GraphQL GET request to get a single Photo",
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
    addPhoto: {
      description: "GraphQL POST request to create a single Photo",
      type: PhotoType,
      args: {
        albumId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        thumbnailUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/photos", {
            albumId: args.albumId,
            title: args.title,
            url: args.url,
            thumbnailUrl: args.thumbnailUrl
          })
          .then(res => res.data);
      }
    },
    editPhoto: {
      description: "GraphQL PATCH request to update a single Photo",
      type: PhotoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .patch("https://jsonplaceholder.typicode.com/photos/" + args.id, args)
          .then(res => res.data);
      }
    },
    deletePhoto: {
      description: "GraphQL DELETE request to delete a single Photo",
      type: PhotoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/photos/" + args.id)
          .then(res => res.data);
      }
    },
    todos: {
      description: "GraphQL GET request to get all Todos",
      type: GraphQLList(TodoType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/todos")
          .then(res => res.data);
      }
    },
    todo: {
      description: "GraphQL GET request to get a single Todos",
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
    addTodo: {
      description: "GraphQL POST request to create a single Todos",
      type: TodoType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/todos", {
            userId: args.userId,
            title: args.title,
            completed: args.completed
          })
          .then(res => res.data);
      }
    },
    editTodo: {
      description: "GraphQL PATCH request to update a single Todos",
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return axios
          .patch("https://jsonplaceholder.typicode.com/todos/" + args.id, args)
          .then(res => res.data);
      }
    },
    deleteTodo: {
      description: "GraphQL DELETE request to delete a single Todos",
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/todos/" + args.id)
          .then(res => res.data);
      }
    },
    users: {
      description: "GraphQL GET request to get all Users",
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then(res => res.data);
      }
    },
    user: {
      description: "GraphQL GET request to get a single User",
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
    addUser: {
      description: "GraphQL POST request to create a single User",
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .post("https://jsonplaceholder.typicode.com/users", {
            name: args.name,
            username: args.username,
            email: args.email,
            phone: args.phone,
            website: args.website
          })
          .then(res => res.data);
      }
    },
    editUser: {
      description: "GraphQL PATCH request to update a single User",
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .patch("https://jsonplaceholder.typicode.com/users/" + args.id, args)
          .then(res => res.data);
      }
    },
    deleteUser: {
      description: "GraphQL DELETE request to delete a single User",
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return axios
          .delete("https://jsonplaceholder.typicode.com/users/" + args.id)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Rootquery
});
