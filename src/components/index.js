import Vue from 'vue';
import loader from '@/components/DefaultLoader';
import EditMaterialModal from '@/components/EditMaterialModal';
import EditArtefactModal from '@/components/EditArtefactModal';

Vue.component('app-loader', loader);

Vue.component('app-edit-material-modal', EditMaterialModal);
Vue.component('app-edit-artefact-modal', EditArtefactModal);
