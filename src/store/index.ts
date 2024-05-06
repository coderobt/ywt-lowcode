import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType> //增加了undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    //分模块, 扩展：问卷的信息,组件的信息
    //没有undo的功能
    // components: componentsReducer,

    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
})
