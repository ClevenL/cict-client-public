import { createStore } from 'vuex'
import Article from './modules/Article'
import Collection from './modules/Collection'
import Entry from './modules/Entry'
import Template from './modules/Template'
import Source from './modules/Source'
import State from './modules/State'

export default createStore({
    modules:{
        Article,
        Collection,
        Entry,
        Template,
        Source,
        State
    }
})