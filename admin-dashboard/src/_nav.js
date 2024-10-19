import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to: '/users',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Blogs',
  },  
  {
    component: CNavGroup,
    name: 'Blogs',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Blogs',
        to: '/course/list',
      },
      {
        component: CNavItem,
        name: 'Blog Create',
        to: '/course/create',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Section',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/section/banner',
      },
      {
        component: CNavItem,
        name: 'Skill',
        to: '/section/skill',
      },
      {
        component: CNavItem,
        name: 'Project',
        to: '/section/project',
      },
      {
        component: CNavItem,
        name: 'Contact',
        to: '/section/contact',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Master',
  },  
  {
    component: CNavGroup,
    name: 'Master',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Settings',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Header',
            to: '/master/header',
          },
          {
            component: CNavItem,
            name: 'Footer',
            to: '/master/footer',
          },
          {
            component: CNavItem,
            name: 'Course List',
            to: '/master/course',
          }
        ],
      },
    ],
  },
  
  
]

export default _nav
