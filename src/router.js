import Vue from 'vue'
import VueRouter from 'vue-router'
import MaterialOverview from '@/views/MaterialOverview';
import MaterialDetails from '@/views/MaterialDetails';
import ArtefactOverview from '@/views/ArtefactOverview';
import ArtefactDetails from '@/views/ArtefactDetails';
import DigSiteOverview from '@/views/DigSiteOverview';
import DigSiteDetails from '@/views/DigSiteDetails';
import ExcavationOverview from '@/views/ExcavationOverview';
import ExcavationDetails from '@/views/ExcavationDetails';
import CollectionOverview from '@/views/CollectionOverview';
import CollectionDetails from '@/views/CollectionDetails';

Vue.use(VueRouter)


const routes = [
    { path: '/materials'         , component: MaterialOverview   , name: 'material-overview'   },
    { path: '/materials/:slug'   , component: MaterialDetails    , name: 'material-details'    },
    { path: '/artefacts'         , component: ArtefactOverview   , name: 'artefact-overview'   },
    { path: '/artefacts/:slug'   , component: ArtefactDetails    , name: 'artefact-details'    },
    { path: '/dig-sites'         , component: DigSiteOverview    , name: 'dig-site-overview'   },
    { path: '/dig-sites/:slug'   , component: DigSiteDetails     , name: 'dig-site-details'    },
    { path: '/excavations'       , component: ExcavationOverview , name: 'excavation-overview' },
    { path: '/excavations/:slug' , component: ExcavationDetails  , name: 'excavation-details'  },
    { path: '/collections'       , component: CollectionOverview , name: 'collection-overview' },
    { path: '/collections/:slug' , component: CollectionDetails  , name: 'collection-details'  },
];

export default new VueRouter({ mode: 'history', routes });
