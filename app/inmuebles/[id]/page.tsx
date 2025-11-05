import { Layout } from "@/components/base/layout"
import PropertyDetail from "@/components/property-detail"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <Layout>
        <PropertyDetail propertyId={params.id} />
      </Layout>
    </ProtectedRoute>
  )
}
