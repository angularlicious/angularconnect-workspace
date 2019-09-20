module.exports = {
  name: 'http-service',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/http-service',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
