import { load } from './core/loader';
import {registerComponent} from "./core/get-component";
import {ExampleBlock} from "./blocks/ExampleBlock";
import DashboardSidebar from './blocks/Navigation';
import LoginForm from './blocks/Login';
import LogoutButton from './components/ButtonLogout';
import DashboardSidebarCore from './blocks/Navigation-core'

registerComponent('rocket-example', ExampleBlock)
registerComponent('navigation', DashboardSidebar)
registerComponent('navigation-core', DashboardSidebarCore)
registerComponent('login',LoginForm)
registerComponent('logout',LogoutButton)

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll("[class^='wp-block-rocket']")
  containers.forEach(container => {
    load(container as HTMLElement)
  })
})