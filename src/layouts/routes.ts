import dashboardRoutes from 'layouts/routes/admin/dashboard'
import newsRoutes from 'layouts/routes/admin/news'
import pagesRoutes from 'layouts/routes/admin/pages'
import settingsRoutes from 'layouts/routes/admin/settings'
import productRoutes from 'layouts/routes/admin/product'

const globalRoutes = [].concat(
  dashboardRoutes,
  newsRoutes,
  pagesRoutes,
  settingsRoutes,
  productRoutes,
)

export default globalRoutes
