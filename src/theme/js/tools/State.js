const StateMiddleware = ({props}) => {
  let state = {}

  props.state = state;

  return props;
}

export default StateMiddleware;