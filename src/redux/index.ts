import { combineReducers } from 'redux';
import AuthRerudec from './slice/auth'
import UsersReducer from './slice/users'
import SubjectReducer from './slice/items'
import RatesReducer from './slice/tarifs'
import RegionsReducer from './slice/regions'
import CitiesReducer from './slice/cities'



export const rootReducer = combineReducers({
    user: AuthRerudec,
    users: UsersReducer,
    subjects: SubjectReducer,
    rates: RatesReducer,
    regions: RegionsReducer,
    cities: CitiesReducer
})



