import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// user
const User = React.lazy(() => import('./views/user/User'));
// course
const Course = React.lazy(() => import('./views/course/Course'));
const courseCreate = React.lazy(() => import('./views/course/Create'));
// master module
const MasterCourse = React.lazy(() => import('./views/master/course/Course'));
const Header = React.lazy(() => import('./views/master/setting/webHeader'));
const Footer = React.lazy(() => import('./views/master/setting/webFooter'));
// section module
const Banner = React.lazy(() => import('./views/section/Banner'));
const Skill = React.lazy(() => import('./views/section/Skill'));
const Project = React.lazy(() => import('./views/section/Project'));
const Contact = React.lazy(() => import('./views/section/Contact'));

const routes = [
  // users list
  { path: '/users', name: 'User', element: User},
  // course routes
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/course/list', name: 'Course', element: Course},
  {path: '/course/create', name: 'Course', element: courseCreate},
  // Master modules
  {path: '/master/course', name: 'Courses', element: MasterCourse},
  // Master Settings modules
  {path: '/master/header', name: 'Header', element: Header},
  {path: '/master/footer', name: 'Footer', element: Footer},
  // portfolio section
  {path: '/section/banner', name: 'Banner', element: Banner},
  {path: '/section/skill', name: 'Skill', element: Skill},
  {path: '/section/project', name: 'Project', element: Project},
  {path: '/section/contact', name: 'Contact', element: Contact},

]

export default routes
