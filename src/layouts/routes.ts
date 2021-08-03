import dashboardRoutes from 'layouts/routes/admin/dashboard'
import settingsRoutes from 'layouts/routes/admin/settings'
import productRoutes from 'layouts/routes/admin/product'

const globalRoutes = [].concat(dashboardRoutes, settingsRoutes, productRoutes)

export default globalRoutes
