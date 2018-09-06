import bcrypt from 'bcrypt';
import _ from 'lodash';

import {tryLogin} from '../gqlauth'

const registerErr = (str)=>{
  return {
    ok:false,
            errors:[{
              path:str,
              message:'please enter '+str
            }]
  }
}

export default {
  Query: { 
    getUser: (parent, { id }, { models }) => models.User.findById(id),
    allUsers: (parent, args, { models }) => models.User.find()
  },
  Mutation: {
    login: (parent, {username, password}, {models, SECRET, SECRET2}) => 
      tryLogin(username, password, models, SECRET),
    signUp: async (parent, {password, lastName, firstName, username}, {models})=>{
      try {
        
      if(!username || !lastName || !firstName){
        const errors = []
          
        if(!username) errors.push({path:'username', message:'enter a username'})
        if(!firstName) errors.push({path:'first name', message:'enter a first name'})
        if(!lastName) errors.push({path:'last name', message:'enter a last name'})
        
        return {
          ok:false,
          errors
        }
      }

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

        if(user){
          return {
            ok:true,
            user
          }
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
