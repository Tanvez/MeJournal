import bcrypt from 'bcrypt'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user:user._id
    },
    secret,
    {
      expiresIn: '1h'
    }
  )

  const createRefreshToken = jwt.sign(
    {
      user:user._id
    },
    secret2,
    {
      expiresIn:'7d'
    }
  )
  return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1
  try {
    const {user:{id}} = jwt.decode(refreshToken)
    userId =id
  } catch (err) {
    return {}
  }
  if(!userId){
    return {}
  }
  const user = await models.User.findById(userId)
  if (!user){
    return {}
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret)
  } catch (err) {
    return {}
  }
  
  const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret)
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  }
}

export const tryLogin = async (username, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({username})
  if (!user) {
    return {
      ok:false,
      errors:[{path:'username', message: 'Wrong username'}]
    } 
  }

  const valid = await bcrypt.compare(password, user.password)
  if(!valid){
    return {
      ok:false,
      errors:[{path:'password', message: 'Wrong password'}]
    } 
  }

const refreshTokenSecret = user.password + SECRET2;

const [token, refreshToken] =  await createTokens(user, SECRET, refreshTokenSecret)
  return {
    ok: true,
    token,
    refreshToken
  }
}