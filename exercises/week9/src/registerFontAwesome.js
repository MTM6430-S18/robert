import Vue from 'vue'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
  faSort
} from '@fortawesome/free-solid-svg-icons'
import {
  faCircle,
  faCheckCircle,
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons'

library.add(faCircle, faCheckCircle, faTrashAlt, faSort)

Vue.component('font-awesome-icon', FontAwesomeIcon)
