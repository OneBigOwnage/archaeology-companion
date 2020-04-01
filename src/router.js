import Vue from 'vue'
import VueRouter from 'vue-router'
import MaterialOverview from './views/MaterialOverview';
import ArtefactOverview from './views/ArtefactOverview';
import DigSiteOverview from './views/DigSiteOverview';
import ExcavationOverview from './views/ExcavationOverview';
import CollectionOverview from './views/CollectionOverview';

Vue.use(VueRouter)


const routes = [
    { path: '/materials'  , component: MaterialOverview   },
    { path: '/artefacts'  , component: ArtefactOverview   },
    { path: '/dig-sites'  , component: DigSiteOverview    },
    { path: '/excavations', component: ExcavationOverview },
    { path: '/collections', component: CollectionOverview },
];

export default new VueRouter({ mode: 'history', routes });
