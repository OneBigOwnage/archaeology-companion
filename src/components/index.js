import Vue from 'vue';
import loader from '@/components/DefaultLoader';
import searchbar from '@/components/SearchBar';
import ImportExport from '@/components/ImportExport';
import CardTable from '@/components/CardTable';

Vue.component('app-loader', loader);
Vue.component('app-search-bar', searchbar);
Vue.component('app-import-export', ImportExport);
Vue.component('app-card-table', CardTable);
