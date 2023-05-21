import { combineReducers } from '@reduxjs/toolkit';
import { user,} from './users';
import { formBuilderReducer } from '../utils/form-builder';
import { items } from './items';

const rootReducer = combineReducers({
  user,
  items,
  formBuilder: formBuilderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
