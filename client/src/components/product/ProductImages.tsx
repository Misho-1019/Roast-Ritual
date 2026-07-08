import { useState } from 'react'

const thumbnails = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtESJ7HealZP2tdWospM3ZvZYjjB9iVqZSaE9dgMbE9YJRhoSdYbeqru0PQRRDjb9CPOXmOVEHPbSSK1GDi-vpp3ohxFt7jcZ2Z8dyHIOot2EtB1DR74jZTkdMmMWJX-3rQ1VJqFPGKzKREGyGEre-ID-Vt_ysmXZNmGc377dWYP9J2801_t0jTfxzcoA5ofIZ0PE6pPiM7ltlkMgKVLMom1Y9puNGTizX9g7Srqxotg3obOmeOV3Ot1iSxMOFQj0KtOt3ujaX8LI=s0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1LuBSeYoYfPF6PLXohvXlVLpBlvYt3WcFEL1jR6Rjx_opbTVMTOlCnZjxLQQlmmr8WImfnUjui2eyw9W1d_kgzQGaUEbgJhJNqJlwP2LUssTWXAaAs9cVn4hwE_yWXUic_X-s4DnSTi-RbT0Wmow1WdCU1y_oJkkF3Vi-IBF9r03qbYdiiJajIq59ML1PLuT4kU9He7YZ-LPv894MIgNzPjH5aUfpacUaoF_mmL3z6KTZY83rhXr1jufmrlw7H1nk8Blp9EOxYJk=s0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBGR6krMcY3ViAyGFj6l2ZJAYoReClq08axjmM9_nXMNJlyU3Wb2Nu5zAhDsNjBhGaHr_fPk7pxce_GhfQuZCFsEeCUK-UNPrH_oeoW2hX1V1IUYVY9VNMRVt7BZlykO5e4L_WZipe59r44-wx8jOtffSKasna9K_L_7HMG_mSZ2VTxuKGUJMgQwDZVJzwyL0PQQ_dKR3e1V1PdtYzdr8rqjG96qsmw3fI3dL84GbJ6kwEDhu4Cj46LvjudZcHG_Fhu5RzcJbcM9D8=s0',
]

interface ProductImagesProps {
  mainImage: string
  productName: string
}

export default function ProductImages({ mainImage, productName }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const allImages = [mainImage, ...thumbnails]

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-2xl overflow-hidden border border-outline-variant/20 bg-espresso/30">
        <img
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          src={allImages[selectedImage]}
          alt={productName}
        />
      </div>
      {selectedImage !== 0 && (
        <button
          onClick={() => setSelectedImage(0)}
          className="text-primary text-sm hover:underline"
        >
          &larr; Back to main image
        </button>
      )}
      <div className="grid grid-cols-4 gap-3">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === i ? 'border-primary' : 'border-transparent hover:border-outline-variant'
            }`}
          >
            <img className="w-full h-full object-cover" src={img} alt={`${productName} view ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
