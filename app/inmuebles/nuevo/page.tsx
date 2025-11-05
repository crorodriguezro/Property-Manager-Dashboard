import Layout from "@/components/base/layout"
import CreatePropertyWizard from "@/components/create-property-wizard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function NewPropertyPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <CreatePropertyWizard />
      </Layout>
    </ProtectedRoute>
  )
}
