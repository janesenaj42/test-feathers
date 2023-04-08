const assert = require('assert');

const mongoose = require('mongoose');
const feathers = require('@feathersjs/feathers');

const createModel = require('../../src/models/contacts.model');
const { Contacts } = require('../../src/services/contacts/contacts.class');


describe('\'contacts\' service with real db', () => {
  let app;

  const body = {
    'name': {
      'first': 'john',
      'last': 'smith'
    },
    'email': 'john@gmail.com',
    'etag': 'dummyetag'
  };

  afterEach(() => {
    app.service('contacts').remove({});
  })

  it('should not create mongo entry with read only user', async () => {
    app = feathers();
    const randomFirstName = body.name.first + new Date();

    // user has no write access to mongodb
    mongoose.connect(
      "mongodb://readuser:userpassword@172.23.240.1:27017/contactsdb?authSource=admin",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    ).catch(err => {
      logger.error(err);
      process.exit(1);
    });

    app.set('mongooseClient', mongoose);
    // console.log(app.get('mongooseClient'))

    const options = {
      Model: createModel(app),
      paginate: app.get('paginate')
    };

    app.use('/contacts', new Contacts(options, app));
    service = app.service('contacts');

    await assert.rejects(
      service.create({ ...body, 'name': { 'first': randomFirstName } }),
      (err) => {
        assert.strictEqual(err.name, 'GeneralError');
        assert.strictEqual(err.code, 500)
        return true;
      })

    // Check that entry is not created
    const response = await service.find({ 'name': { 'first': randomFirstName } })
    assert.equal(response.length, 0);
  });
});

