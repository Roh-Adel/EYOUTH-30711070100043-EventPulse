const AppError = require('../../utils/AppError');

describe('AppError', () => {
  test('should create a 404 fail error', () => {
    const error = new AppError('Not found', 404);

    expect(error.statusCode).toBe(404);
    expect(error.status).toBe('fail');
  });

  test('should create a 500 error', () => {
    const error = new AppError('Server error', 500);

    expect(error.status).toBe('error');
  });

  test('should be operational by default', () => {
  const error = new AppError('Test error', 400);

  expect(error.isOperational).toBe(true);
  });

  test('should be an instance of Error', () => {
  const error = new AppError('Test error', 400);

  expect(error).toBeInstanceOf(Error);
  });
});