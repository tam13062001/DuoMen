import { load } from './core/loader';
import {registerComponent} from "./core/get-component";
import {ExampleBlock} from "./blocks/ExampleBlock";
import LogoutButton from './components/ButtonLogout';
import CollapseBlock from "./components/CollapseBlock";
<<<<<<< HEAD
import ContactPage from "./blocks/ContactPage";
=======
import FloatingContact from './components/Panel';
import Header from './components/Menu';
>>>>>>> 00a25a2d517b637be6e8345e705c8619e299cbac

registerComponent('rocket-example', ExampleBlock)
registerComponent('logout',LogoutButton)
registerComponent('collapse-block', CollapseBlock)
<<<<<<< HEAD
registerComponent('doumen-contact-page', ContactPage)

=======
registerComponent('floating-contact', FloatingContact)
registerComponent('header-menu', Header)
>>>>>>> 00a25a2d517b637be6e8345e705c8619e299cbac
document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll("[class^='wp-block-rocket']")
  containers.forEach(container => {
    load(container as HTMLElement)
  })
})