import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { createWrapper } from 'next-redux-wrapper'

export const store = createStore(reducers, applyMiddleware(thunk))

const makeStore = () => store
export const nextStore = createWrapper(makeStore)