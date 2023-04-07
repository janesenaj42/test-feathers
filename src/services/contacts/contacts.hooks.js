const uploadToBucket = async (context) => {
  const minioClient = context.app.get('minioClient');

  var buffer = 'Hello World';
  console.log('alamak got the hook ah');

  return new Promise((resolve, reject) => {
    minioClient.putObject(context.app.get('minio').bucket, 'hello-file' + new Date(), buffer, function (err, etag) {
      if (err) {
        reject(err);
      } else {
        context.data.etag = etag.etag;
        resolve(context);
      }
    });
  });

};


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [uploadToBucket],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [async (context) => {
      console.log('Received error...');
      // console.log(context.error);
      console.log(context.error.hook.type);
    }],
    update: [],
    patch: [],
    remove: []
  }
};
