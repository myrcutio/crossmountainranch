module.exports.staticRoutes = {
  '/': { page: '/', label: 'Home'},
  '/contact': { page: '/contact', label: 'Contact'},
  '/admin': { page: '/admin', label: 'Manage Content', menu: false, query: { page: '' }}
}