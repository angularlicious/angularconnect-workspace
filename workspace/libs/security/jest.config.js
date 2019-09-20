module.exports = {
  name: 'security',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/security',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
