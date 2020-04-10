import Vue from 'vue';
import loader from '@/components/DefaultLoader';
import searchbar from '@/components/SearchBar';
import ImportExport from '@/components/ImportExport';
import CardTable from '@/components/CardTable';
import EditMaterialDialog from '@/components/EditMaterialDialog';
import EditArtefactDialog from '@/components/EditArtefactDialog';
import EditCollectionDialog from '@/components/EditCollectionDialog';
import EditDigSiteDialog from '@/components/EditDigSiteDialog';
import EditExcavationDialog from '@/components/EditExcavationDialog';

Vue.component('app-loader', loader);
Vue.component('app-search-bar', searchbar);
Vue.component('app-import-export', ImportExport);
Vue.component('app-card-table', CardTable);

Vue.component('app-edit-material-dialog', EditMaterialDialog);
Vue.component('app-edit-artefact-dialog', EditArtefactDialog);
Vue.component('app-edit-collection-dialog', EditCollectionDialog);
Vue.component('app-edit-dig-site-dialog', EditDigSiteDialog);
Vue.component('app-edit-excavation-dialog', EditExcavationDialog);
