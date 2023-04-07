const assert = require('assert');
const app = require('../../src/app');
const MockedService = require('feathers-memory');

describe('\'contacts\' service', () => {
  // Mock database
  const store = {};
  app.use('/contacts', MockedService({ store }));
  const service = app.service('contacts');

  const body = {
    'name': {
      'first': 'john',
      'last': 'smith'
    },
    'email': 'john@gmail.com',
    'etag': 'dummyetag'
  };

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('should create mongo entry successfully', async () => {
    const response = await service.create(body);
    assert.deepEqual(response.name, body.name);
    assert.equal(response.email, body.email);
    assert.equal(response.etag, body.etag);
  });


});

