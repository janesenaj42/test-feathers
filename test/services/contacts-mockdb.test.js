const assert = require('assert');
const MockedService = require('feathers-memory');
const feathers = require('@feathersjs/feathers');


describe('\'contacts\' service with mock db', () => {

  const body = {
    'name': {
      'first': 'john',
      'last': 'smith'
    },
    'email': 'john@gmail.com',
    'etag': 'dummyetag'
  };

  let app, store, service;

  beforeEach(() => {
    app = feathers();
    store = {};
    // Mock database
    app.use('/contacts', MockedService({ store })); // hooks not registered, so only testing services
    service = app.service('contacts');
  });

  afterEach(() => {
    app.service('contacts').remove({});
  })

  it('registered the service', () => {
    service = app.service('contacts');
    assert.ok(service, 'Registered the service');
  });

  it('should create mongo entry successfully', async () => {
    service = app.service('contacts');
    const response = await service.create(body);
    assert.deepEqual(response.name, body.name);
    assert.equal(response.email, body.email);
    assert.equal(response.etag, body.etag);
  });
});

