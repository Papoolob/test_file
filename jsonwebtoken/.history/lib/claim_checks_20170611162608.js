function nbfCheck(claims, userOptions, context) {
  if (userOptions.ignoreNotBefore) { return; }
  if (typeof payload.nbf === 'undefined') { return; }

  if (typeof payload.nbf !== 'number') {
    return new JsonWebTokenError('invalid nbf value');
  }

  // context.clockTolerance = (options.clockTolerance || 0)
  if (payload.nbf > context.clockTimestamp + context.clockTolerance) {
    return new NotBeforeError('jwt not active', new Date(payload.nbf * 1000));
  }
}

// var ClaimCheck = function(){
//   this.checks = [ nbfCheck ];
// }

var defaultChecks = [ nbfCheck ];

// ClaimCheck.prototype.eval = function(claims, userOptions, context) {
function evalChecks(claims, userOptions, context) {
  var i;
  var checkError;
  for (i = 0; i < defaultChecks.length; i++) {
    checkError = defaultChecks[i](claims, userOptions, context);
    if (checkError) {
      return checkError;
    }
  }
  // var i = 0;
  // function evalNext(err) {
  //   if (err) { return done(err); }

  //   var check = this.checks[i++];
  //   if (!check) {
  //     return done();
  //   }

  //   check(claims, userOptions, context, evalNext);
  // }
  // evalNext();
};

module.exports.eval = evalChecks;
