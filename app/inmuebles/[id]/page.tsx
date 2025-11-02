import { Layout } from "@/components/base/layout"
import PropertyDetail from "@/components/property-detail"

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <PropertyDetail propertyId={params.id} />
    </Layout>
  )
}
