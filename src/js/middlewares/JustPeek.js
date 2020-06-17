export default contents => {
  console.group('Just peeking...');
    console.log( contents );
  console.groupEnd();

  return contents;
};
