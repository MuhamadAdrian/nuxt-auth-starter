import { Calendar, Home, Inbox } from 'lucide-vue-next'

export default defineAppConfig({
  menu: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
      group: 'Dashboard',
    },
    {
      title: 'Product',
      url: '/product',
      icon: Inbox,
      group: 'Master Data',
    },
    {
      title: 'Category',
      url: '/product-category',
      icon: Calendar,
      group: 'Master Data',
    },
  ],
})
