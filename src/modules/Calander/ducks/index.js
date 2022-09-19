/* INDEX FILE
It exports as default the reducer function of the duck.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other ducks.
*/

import reducers from './reducers';

import CalenderService from './service';
import CalenderTypes from './types';
import CalenderActions from './actions';

export { CalenderService, CalenderActions, CalenderTypes };

export default reducers;
