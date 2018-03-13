// @flow
import { Observable } from 'redux-observable'
import { FormState } from 'redux-form'

export * from './features/auth/types'
export * from './features/chooser/types'
export * from './features/entity/types'
export * from './features/filter/types'
export * from './features/globalmenu/types'
export * from './features/help/types'
export * from './features/intl/types'
export * from './features/menu/recent/types'
export * from './features/message/types'
export * from './features/notification/types'
export * from './features/picker/types'
export * from './features/router/types'
export * from './features/search/types'
export * from './features/setting/types'
export * from './features/stream/types'
export * from './features/zone/types'

import { appActions } from './features/app/actions'
import type { AuthState, AuthAction } from './features/auth/types'
import type { ChooserAction, ChooserState } from './features/chooser/types'
import type { EntityState, EntityAction, EntityCreateAction } from './features/entity/types'
import type { FilterState, FilterAction } from './features/filter/types'
import type { GlobalMenuState, GlobalMenuAction } from './features/globalmenu/types'
import type { HelpState, HelpAction } from './features/help/types'
import type { IntlState, IntlAction } from './features/intl/types'
import type { MessageState, MessageAction } from './features/message/types'
import type { NavigationState } from 'react-navigation'
import type { NotificationState, NotificationAction } from './features/notification/types'
import type { PickerState, PickerAction } from './features/picker/types'
import type { RecentMenuState, RecentMenuAction } from './features/menu/recent/types'
import type { SettingState } from './features/setting/types'
import type { SearchState, SearchAction } from './features/search/types'
import type { StreamState, StreamAction } from './features/stream/types'
import type { ZoneState, ZoneAction } from './features/zone/types'

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Core


// Reducers
// We can't use exact object type, because spread is not supported yet.
// We can't use Strict<T> = T & $Shape<T>, because it breaks autocomplete.
// TODO: Wait for Flow.

export type AppState = {
  baselineShown: boolean,
  currentTheme: string,
  error: ?Error,
  menuShown: boolean,
  online: boolean,
  started: boolean,
}

export type ConfigState = {
  appName: string,
  appVersion: string,
}

export type DeviceState = {
  host: string,
}


// State

export type State = {
  // NOTE: if you add an entry here, also add to configureReducer
  app: AppState,
  auth: AuthState,
  chooser: ChooserState,
  config: ConfigState,
  device: DeviceState,
  entity: EntityState,
  filter: FilterState,
  form: FormState,
  globalmenu: GlobalMenuState,
  help: HelpState,
  intl: IntlState,
  message: MessageState,
  navigation: NavigationState,
  notification: NotificationState,
  picker: PickerState,
  recentmenu: RecentMenuState,
  search: SearchState,
  setting: SettingState,
  stream: StreamState,
  zone: ZoneState,
}

// Actions

export type Action =
  | { type: appActions.APP_ERROR, payload: { error: Error } }
  | { type: appActions.APP_ONLINE, payload: { online: boolean } }
  | { type: appActions.APP_STARTED, payload: {} }
  | AuthAction
  | EntityAction
  | EntityCreateAction
  | IntlAction
  | StreamAction
  | ZoneAction
  | GlobalMenuAction
  | HelpAction
  | MessageAction
  | RecentMenuAction
  | SearchAction
  | PickerAction
  | FilterAction
  | ChooserAction
  | NotificationAction

export type Dispatch = (action: Action | Promise<Action>) => Promise<any>

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
};

// TODO: There are no redux-observable flow definitions yet. Therefore, we have
// to use .filter instead of .ofType and
// https://flow.org/en/docs/lang/refinements.
// https://github.com/redux-observable/redux-observable/issues/258
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies,
) => Observable<Action>
