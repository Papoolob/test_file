TokenGen = require('./tokenGenerator')
tg = new TokenGen('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: true, expiresIn: '2m', notBefore: '10s' })
token = tg.sign({ a: 1 }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })