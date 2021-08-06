import dashboardRoutes from 'layouts/routes/admin/dashboard'
import newsRoutes from 'layouts/routes/admin/news'
import settingsRoutes from 'layouts/routes/admin/settings'
import productRoutes from 'layouts/routes/admin/product'

const globalRoutes = [].concat(
  dashboardRoutes,
  newsRoutes,
  settingsRoutes,
  productRoutes,
)

export default globalRoutes
