module.exports = {
  name: 'lms',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lms',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
