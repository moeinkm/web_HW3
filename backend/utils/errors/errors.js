const {Normalize} = require('./../normalize')
const Errors = {
  badRequest: function (res, error) {
    const err = error.details ? error.details[0].message : error;
    return res.status(400).send(Normalize.failedResponse(err));
  },
};
exports.Errors = Errors;
