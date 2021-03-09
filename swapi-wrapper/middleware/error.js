export default (error, req, res, next) => {
  return res.status(500).send({ message : error.message });
}