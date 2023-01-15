const wrapAsync = (fn) => {
  return (req, res, next) => {
    return fn(req, res).catch(next);
  };
};

module.exports = wrapAsync;
