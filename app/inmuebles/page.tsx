import Layout from "@/components/kokonutui/layout"
import PropertiesList from "@/components/properties-list"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function InmueblesPage() {
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Inmuebles</h1>
          <Link
            href="/inmuebles/nuevo"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar Inmueble
          </Link>
        </div>
        <PropertiesList />
      </div>
    </Layout>
  )
}
