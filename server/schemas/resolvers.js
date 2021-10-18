const { AuthenticationError } = require('apollo-server-express');
const { bookSchema, User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {},

    Mutation: {

        addUser: async (parent, { username, email, password }, context, info) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);            
            return { token, user };
        },

        saveBook: async (parent, {}, context, info) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: User._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }

            );
            return updatedUser;
        },
    }
}

module.exports = resolvers;