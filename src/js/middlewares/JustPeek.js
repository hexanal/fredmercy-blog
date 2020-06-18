export default ({Component, props}) => {
  console.group('Just taking a peek at the component:');
    console.log({Component, props});
  console.groupEnd();

  return props;
};
