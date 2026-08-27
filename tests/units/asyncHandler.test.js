const asyncHandler = require('../../utils/asyncHandler');

describe('asyncHandler', () => {
  test('should call the wrapped function with req, res, and next', () => {
    const controller = jest.fn();

    const wrapped = asyncHandler(controller);

    const req = {};
    const res = {};
    const next = jest.fn();

    wrapped(req, res, next);

    expect(controller).toHaveBeenCalledWith(req, res, next);
  });

  test('should pass rejected errors to next', async () => {
  const error = new Error('Test error');

  const controller = jest.fn().mockRejectedValue(error);

  const wrapped = asyncHandler(controller);

  const req = {};
  const res = {};
  const next = jest.fn();

  wrapped(req, res, next);

  await new Promise(setImmediate);

  expect(next).toHaveBeenCalledWith(error);
  });
});