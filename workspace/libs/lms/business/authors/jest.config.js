module.exports = {
  name: 'lms-business-authors',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/lms/business/authors',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
