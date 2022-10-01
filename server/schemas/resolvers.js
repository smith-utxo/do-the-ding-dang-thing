const { Services, User } = require('../models')
const { gql } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return (userData)
            }
            throw new AuthenticationError('Not logged in');
        },
        //TO DO: use the service id to look for it inside all the user services arrays... the reverse of bonus in project 18 ... use the mongoose $
        services: async () => {
            return await Services.find();
        },
        providers: async (parent, { service, user }) => {
            const params = {};

            if (service) {
                params.service = service;
            }

            return await User.find(params).populate('service');
        },
    },
    
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            //const token = signToken(user);

                //TO DO: add token back when ready to use
            return { user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            //const token = signToken(user);
            //return { token, user };
        },

        //TO DO: This needs to be fixed to send service id to args
        //could just send the _id over in place of args... it is not part of context anymore... that needs to go
        addReview: async(parent, args, context) => {
            if (context.user) {
                const review = await Review.create({...args, username: context.user.username});

                await Service.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { reviews: review._id } },
                    { new: true }
                );

                return review;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addService: {
            // TO DO: have it link to a dropdown with pre-determined job options
            //then the service goes to the user's array

        }
    }
}