import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: ClipboardDocumentListIcon,
  },
  {
    label: 'Users',
    path: '/users',
    icon: UserGroupIcon,
  },
  {
    label: 'Fetch Data',
    path: '/fetch-data',
    icon: CloudArrowDownIcon,
  },
];

export default sidebarItems;
