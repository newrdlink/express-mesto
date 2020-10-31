module.exports = (error) => {
  const objErrors = error.errors;
  const objErrorsName = Object.keys(objErrors);
  const objErr = objErrorsName.reduce((object, item) => {
    // eslint-disable-next-line no-param-reassign
    object[item] = objErrors[item].message;
    return object;
  }, {});
  return objErr;
};
