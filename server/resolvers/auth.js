import bcrypt from 'bcrypt';
import _ from 'lodash';

export default {
  Query: { 
    getUser: (parent, { id }, { models }) => models.User.findById(id),
    allUsers: (parent, args, { models }) => models.User.find()
  },
  Mutation: {
    signUp: async (parent, {password, lastName, firstName, username}, {models})=>{
      try {
        let existingUser = await models.User.findOne({username})
        if(existingUser) { 
          return {
            ok:false,
            errors:[{
              path:'username',
              message:'username is already taken'
            }]
          }
        }
        if(password.length < 5 || password.length > 100){
          return {
            ok:false,
            errors:[{
              path:'password',
              message: 'password needs to be between 5 and 100 charactes'
            }]
          }
        }
        const hashedPassword = await bcrypt.hash(password, 12) 
        const user = await models.User.create({
          username,
          lastName,
          firstName,
          password:hashedPassword
        })
        return {
          ok:true,
          user
        }
      } catch(err) {
        return {
                  ok: false,
                  errors: err
        }
      }
    }
  }
}