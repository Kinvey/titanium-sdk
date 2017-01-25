import Kinvey from 'kinvey-node-sdk';
import Push from './push';

// Add the Push module
Kinvey.Push = Push;

export default Kinvey;
