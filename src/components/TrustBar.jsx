import { useSiteContent } from '../context/SiteContentContext'

export default function TrustBar() {
  const { home } = useSiteContent()
  const trustItems = home.trust

  return (
    <section className="border-t border-teal-100 bg-navy py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-sm font-bold text-white">{item.label}</p>
            <p className="mt-1 text-xs text-teal-200/80">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
