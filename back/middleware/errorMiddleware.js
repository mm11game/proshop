const notFound = (req, res, next) => {
  //주소가 잘못되었을때
  console.log("111111");
  const error = new Error(`not found = ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //체크, 아무래도 next(첫번째), 첫번째에 들어가는게 err가 들어가는가보다.
  //catch에 걸렸을때
  console.log("222222");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
