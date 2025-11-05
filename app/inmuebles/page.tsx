import Layout from "@/components/base/layout"
import PropertiesList from "@/components/properties-list"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function InmueblesPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <PropertiesList />
      </Layout>
    </ProtectedRoute>
  )
}
