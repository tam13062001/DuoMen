import { load } from './core/loader';
import {registerComponent} from "./core/get-component";
import {ExampleBlock} from "./blocks/ExampleBlock";
import LogoutButton from './components/ButtonLogout';
import CollapseBlock from "./components/CollapseBlock";

registerComponent('rocket-example', ExampleBlock)
registerComponent('logout',LogoutButton)
registerComponent('collapse-block', CollapseBlock)

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll("[class^='wp-block-rocket']")
  containers.forEach(container => {
    load(container as HTMLElement)
  })
})