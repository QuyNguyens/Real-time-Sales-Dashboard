import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CreditCardIcon,
  CloudArrowDownIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export interface SidebarItem {
  labelKey: string;
  path: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    labelKey: 'sidebar.dashboard',
    path: '/',
    icon: HomeIcon,
  },
  {
    labelKey: 'sidebar.orders',
    path: '/orders',
    icon: ClipboardDocumentListIcon,
  },
  {
    labelKey: 'sidebar.products',
    path: '/products',
    icon: CreditCardIcon,
  },
  {
    labelKey: 'sidebar.users',
    path: '/users',
    icon: UserGroupIcon,
  },
  {
    labelKey: 'sidebar.fetchData',
    path: '/fetch-data',
    icon: CloudArrowDownIcon,
  },
  {
    labelKey: 'sidebar.settings',
    path: '/settings',
    icon: Cog6ToothIcon,
  },
];

export default sidebarItems;
