module.exports = {
  name: 'foundation',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/foundation',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
