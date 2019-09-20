module.exports = {
  name: 'configuration',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/configuration',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
