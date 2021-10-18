const { AuthenticationError } = require('apollo-server-express');
const { bookSchema, User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {},

    Mutation: {

        login: async (parent, { email, password }, context, info) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }, context, info) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);            
            return { token, user };
        },

        saveBook: async (parent, { userId, input }, context, info) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError('Cannot Save Book!');
            }
            return updatedUser;
        },

        removeBook: async (parent, { userId, bookId }, context, info) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId} } },
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError('Cannot Remove Book!');
            }
            return updatedUser;
        },
    }
}

module.exports = resolvers;