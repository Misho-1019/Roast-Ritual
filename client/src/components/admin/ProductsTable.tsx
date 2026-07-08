const products = [
  { name: 'Ethiopian Yirgacheffe', origin: 'Light Roast • Ethiopia', price: 24.00, stock: 42, status: 'Active' as const, img: 'https://lh3.googleusercontent.com/aida/AP1WRLstZZkWJJSa1Hl1nnbZJglznlSOZGhyn62W2phTT4VqeG56ZjSCD1ysTyGFV02QN4oP-ThMEQZOffXzgy49zTrYR8omsHxTaK5sS87YK3sodClSLdvgizv6zdRuA1SrLw7PHWBPrq3JFTQ-seyfpLWvmhjtcHBpaVnDDH9VPdj4Qg6-HIVyetOGYeDuYd1jdYbDIIjDI3I_06JPseeCIixXgBMvWcsLF7xLeXESIdvSRQZ5zezIJKlKQqM' },
  { name: 'Colombian Supremo', origin: 'Medium Roast • Colombia', price: 22.50, stock: 35, status: 'Active' as const, img: 'https://lh3.googleusercontent.com/aida/AP1WRLs16r2RxDtJ6-wM8kavof-RSube-9QowOVobP5ftKbbccjx9IKdIPnvXBtSZ9OvtZBhnxLwq_6y_dmBEavdvdMQ6FCMMlPsmBuD0VurMCyGYlwHJjH1nOc5StKVdOJxIvnzlEz5L5x3YHXFdMOjDbClZjfHDndvBlXgW9b-RAkwecYa7VRRnVRTSb4eGnmdw2XTjiy--JGrNzdXb7Hhxe3ePwrVgGNk_nYSD3P626G_z_oWsmJdqIrkmkk' },
  { name: 'Midnight Sumatra', origin: 'Dark Roast • Indonesia', price: 26.00, stock: 18, status: 'Active' as const, img: '' },
  { name: 'Costa Rican Tarrazu', origin: 'Medium-Dark Roast • Costa Rica', price: 17.99, stock: 0, status: 'Draft' as const, img: '' },
  { name: 'Anaerobic Gesha', origin: 'Light Roast • Ethiopia', price: 38.00, stock: 8, status: 'Active' as const, img: '' },
]

export default function ProductsTable() {
  return (
    <div className="lg:col-span-2 bg-espresso border border-outline-variant rounded-lg overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
        <h2 className="font-bold text-on-surface">Premium Inventory</h2>
        <button className="text-primary font-small text-xs font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-mocha-text text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {products.map((product) => (
              <tr key={product.name} className="hover:bg-surface-container/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-variant overflow-hidden border border-outline-variant group-hover:border-primary transition-all shrink-0 flex items-center justify-center">
                      {product.img ? (
                        <img className="w-full h-full object-cover" src={product.img} alt={product.name} />
                      ) : (
                        <span className="material-symbols-outlined text-primary/40">local_cafe</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface truncate">{product.name}</p>
                      <p className="text-mocha-text font-small text-xs truncate">{product.origin}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-on-surface">{product.stock} units</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    product.status === 'Active'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-variant text-mocha-text'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-mocha-text hover:text-primary">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
