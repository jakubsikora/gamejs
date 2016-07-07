const initialState = {
  size: [0, 0],
  pos: [0, 0],
  vel: [0, 0],
  angle: 0,
  angleVel: 0,
  friction: 0,
  speed: 0,
};

export default function hero(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIZE:
      return { ...state, size: action.size };
    case PRESS_UP:
      return { ...state, pos: action.size };
    default:
      return state;
  }
}
