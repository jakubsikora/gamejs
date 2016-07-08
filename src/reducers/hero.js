import {
  INIT_HERO,
  UPDATE_THRUST,
  UPDATE_HERO,
} from '../actionTypes';

const initialState = {
  size: [0, 0],
  pos: [0, 0],
  velocity: [0, 0],
  forward: [0, 0],
  thrust: false,
  angleVelocity: 0,
  angle: 0,
};

const FRICTION_FACTOR = 0.02;

const angleToVector = angle => [Math.cos(angle), Math.sin(angle)];

function updatePosition(state) {
  // Friction udpate
  const velocity = [
    state.velocity[0] * (1 - FRICTION_FACTOR),
    state.velocity[1] * (1 - FRICTION_FACTOR),
  ];

  // const newAngle = state.angle + state.angleVel;
  // const newForward = angleToVector(newAngle);

  // if (action.thrust) {
  //   vel[0] += forward[0] * SHIP_SPEED;
  //   vel[1] += forward[1] * SHIP_SPEED;
  // }

  // pos[0] += vel[0];
  // pos[1] += vel[1];
}


export default function hero(state = initialState, action) {
  switch (action.type) {
    case INIT_HERO:
      return { ...state, ...action.hero };
    case UPDATE_THRUST:
      const newState = { ...state, thrust: action.thrust };
      return updatePosition(newState);
    case UPDATE_HERO:
      return updatePosition(state);
    default:
      return state;
  }
}
