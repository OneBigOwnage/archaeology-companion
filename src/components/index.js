import Vue from 'vue';
import loader from '@/components/DefaultLoader';
import EditMaterialModal from '@/components/EditMaterialModal';
import EditArtefactModal from '@/components/EditArtefactModal';
import EditCollectionModal from '@/components/EditCollectionModal';

Vue.component('app-loader', loader);

Vue.component('app-edit-material-modal', EditMaterialModal);
Vue.component('app-edit-artefact-modal', EditArtefactModal);
Vue.component('app-edit-collection-modal', EditCollectionModal);
