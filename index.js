'use strict'

var crypto = require('crypto');

var options = {
  KEY : '830544f01b190da158ef7eac44bd077d09c8ad0261cbe30f2e2b93e27489275f',
  IV : '3c2f775df8fa82ff319966584d2adc74',
  ALGTHM : 'AES-256-CBC'
}

var BasicHash = function (opt) {
  if(opt){
    options.KEY = opt.KEY||options.KEY;
    options.IV = opt.IV||options.IV;
    options.ALGTHM = opt.ALGTHM||options.ALGTHM;
  }

  console.log("Key : "+options.KEY); //eslint-disable-line no-console
  console.log("IV : "+options.IV); //eslint-disable-line no-console
  console.log("Algorithm : "+options.ALGTHM); //eslint-disable-line no-console
}

BasicHash.prototype.encrypt = function(data,cb){
  var cipher = crypto.createCipheriv(options.ALGTHM,
               new Buffer(options.KEY,'hex'),
               new Buffer(options.IV,'hex')),
      crypt = cipher.update(data,'utf8','hex'); //eslint-disable-line no-unused-vars
      crypt += cipher.final('hex');

      if(cb === undefined)
        return crypt;

      cb(crypt);
}

BasicHash.prototype.decrypt = function(hashed,cb){
  var decipher = crypto.createDecipheriv(options.ALGTHM,
                 new Buffer(options.KEY,'hex'),
                 new Buffer(options.IV,'hex')),
          data = decipher.update(hashed,'hex','utf8'); //eslint-disable-line no-unused-vars
          data += decipher.final('utf8');

          if(cb === undefined)
            return data;
          cb(data);
}

var generateRandomBytes = function(length,cb){
  var salt = crypto.randomBytes(parseInt(length||32)).toString('hex');

  if(cb === undefined)
    return salt;

  cb(salt);
}

module.exports = (function(){
  return {
    BasicHash : BasicHash,
    generateRandomBytes : generateRandomBytes
  }
})();
