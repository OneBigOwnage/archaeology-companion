import Vue from 'vue'
import VueRouter from 'vue-router'
import MaterialOverview from '@/views/MaterialOverview';
import ArtefactOverview from '@/views/ArtefactOverview';
import DigSiteOverview from '@/views/DigSiteOverview';
import ExcavationOverview from '@/views/ExcavationOverview';
import CollectionOverview from '@/views/CollectionOverview';
import MaterialDetails from '@/views/MaterialDetails';
import ArtefactDetails from '@/views/ArtefactDetails';
import DigSiteDetails from '@/views/DigSiteDetails';

Vue.use(VueRouter)


const routes = [
    { path: '/materials'         , component: MaterialOverview   , name: 'material-overview'   },
    { path: '/materials/:slug'   , component: MaterialDetails    , name: 'material-details'    },
    { path: '/artefacts'         , component: ArtefactOverview   , name: 'artefact-overview'   },
    { path: '/artefacts/:slug'   , component: ArtefactDetails    , name: 'artefact-details'    },
    { path: '/dig-sites'         , component: DigSiteOverview    , name: 'dig-site-overview'   },
    { path: '/dig-sites/:slug'   , component: DigSiteDetails     , name: 'dig-site-details'    },
    { path: '/excavations'       , component: ExcavationOverview , name: 'excavation-overview' },
    { path: '/excavations/:slug' , component: ExcavationOverview , name: 'excavation-details'  },
    { path: '/collections'       , component: CollectionOverview , name: 'collection-overview' },
    { path: '/collections/:slug' , component: CollectionOverview , name: 'collection-details'  },
];

export default new VueRouter({ mode: 'history', routes });
