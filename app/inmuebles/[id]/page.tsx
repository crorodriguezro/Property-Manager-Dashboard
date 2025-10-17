import { Layout } from "@/components/kokonutui/layout"
import PropertyDetail from "@/components/property-detail"

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <PropertyDetail propertyId={params.id} />
    </Layout>
  )
}
