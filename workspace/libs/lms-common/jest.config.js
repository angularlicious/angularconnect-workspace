module.exports = {
  name: 'lms-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lms-common',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
