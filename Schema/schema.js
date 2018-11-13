const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const Book = require("../models/Book");
const Author = require("../models/Author");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (parent, args) => {
        return await Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        return await Book.find({ authorId: parent._id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        try {
          const res = await Author.create(args);
          return res;
        } catch (err) {
          console.log(err);
        }
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        try {
          const res = await Book.create(args);
          return res;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
