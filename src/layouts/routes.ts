import dashboardRoutes from 'layouts/routes/admin/dashboard'
import newsRoutes from 'layouts/routes/admin/news'
import pagesRoutes from 'layouts/routes/admin/pages'

const globalRoutes = [].concat(dashboardRoutes, newsRoutes, pagesRoutes)

export default globalRoutes
