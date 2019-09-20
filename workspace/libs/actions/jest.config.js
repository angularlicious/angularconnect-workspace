module.exports = {
  name: 'actions',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/actions',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
