import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const knowledgeChunks = [
  // Origins
  { category: 'origin', content: 'Ethiopian Yirgacheffe is a light roast coffee from Ethiopia. It has floral, lemon, and tea-like flavor notes with a wine-like acidity and a long sweet finish. Grown by smallholder farmers in the birthplace of coffee.' },
  { category: 'origin', content: 'Colombian Supremo is a medium roast from Colombia. It features caramel sweetness, red apple notes, and a smooth nutty body. Grown at high altitude in the Huila region.' },
  { category: 'origin', content: 'Midnight Sumatra is a dark roast from Indonesia. It delivers deep chocolate notes, earthy tones, and a hint of spice with an almost syrupy body and low acidity.' },
  { category: 'origin', content: 'Anaerobic Gesha is a light roast experimental lot from Ethiopia. Anaerobic fermentation creates an explosion of tropical fruit and jasmine with a winey acidity and extremely complex layered profile.' },
  { category: 'origin', content: 'Costa Rican Tarrazu is a medium-dark roast from Costa Rica. Bright citrus acidity meets honey-like sweetness with a creamy body and hints of milk chocolate.' },
  { category: 'origin', content: 'Kenyan AA is a light roast from Kenya. Grade AA beans from the Nyeri region produce a remarkably bright cup with grapefruit and blackcurrant notes and a wine-like body.' },

  // Roast levels
  { category: 'roast', content: 'Light roast coffees are roasted for the shortest time. They retain more of the bean\'s original character, with higher acidity, brighter flavors, and more complex fruity or floral notes. Best for pour-over and drip brewing.' },
  { category: 'roast', content: 'Medium roast coffees strike a balance between acidity and body. They have caramelized sweetness, moderate body, and well-rounded flavor. Works well with most brewing methods.' },
  { category: 'roast', content: 'Medium-dark roast coffees have a richer body with more pronounced roast flavors. The acidity is low, and chocolatey or nutty notes become more prominent.' },
  { category: 'roast', content: 'Dark roast coffees are roasted the longest. They have low acidity, full body, and bold roast flavors like dark chocolate, toasted nuts, and spice. Excellent for espresso and cold brew.' },

  // Brewing methods
  { category: 'brewing', content: 'V60 pour-over: Use 15g of medium-fine ground coffee per 250ml of water at 93°C. Pour in circular motion, bloom for 30 seconds, total brew time about 3 minutes.' },
  { category: 'brewing', content: 'French Press: Use 30g of coarse ground coffee per 500ml of water at 94°C. Steep for 4 minutes, press slowly, and pour immediately. Produces a full-bodied cup.' },
  { category: 'brewing', content: 'AeroPress: Use 15g of fine ground coffee per 200ml of water at 85°C. Stir for 10 seconds, press for 30 seconds. Clean and smooth cup, similar to espresso.' },
  { category: 'brewing', content: 'Cold Brew: Use 100g of coarse ground coffee per 1 liter of cold water. Steep in refrigerator for 16-24 hours, filter, and serve over ice. Smooth, low acidity, naturally sweet.' },
  { category: 'brewing', content: 'Espresso: Use 18g of fine ground coffee, tamp evenly, extract 36g of liquid in 25-30 seconds at 9 bars of pressure and 92°C water temperature.' },
  { category: 'brewing', content: 'Moka Pot: Use 17g of medium-fine ground coffee per 200ml of water. Fill bottom chamber with hot water, fill filter basket with coffee, assemble and brew on medium heat until top chamber fills.' },
  { category: 'brewing', content: 'Pour-over brewing requires a gooseneck kettle for controlled pouring, a paper filter, and a dripper (V60, Chemex, or Kalita Wave). Use water just off boil at 93°C.' },

  // Tasting
  { category: 'tasting', content: 'Coffee tasting (cupping) involves evaluating aroma, flavor, aftertaste, acidity, body, balance, and overall impression. Specialty coffee is scored on a 100-point scale by certified Q Graders.' },
  { category: 'tasting', content: 'Flavor notes in coffee come from the bean\'s origin, variety, processing method, and roast level. Common tasting notes include floral, fruity, nutty, chocolatey, spicy, and earthy.' },
  { category: 'tasting', content: 'Coffee acidity is a desirable quality that adds brightness, sweetness, and complexity. It should be pleasant and crisp, not sour or harsh. Light roasts have higher perceived acidity.' },
  { category: 'tasting', content: 'Coffee body refers to the weight and texture of the brew on your tongue. Light-bodied coffees feel tea-like, while full-bodied coffees feel heavy, creamy, or syrupy.' },

  // Processing
  { category: 'processing', content: 'Washed (wet) processing removes the fruit from the bean before drying. Results in clean, bright flavors with high acidity. Common for specialty Arabica coffees.' },
  { category: 'processing', content: 'Natural (dry) processing dries the whole coffee fruit with the bean inside. Produces fruity, complex, and sometimes winey flavors with full body.' },
  { category: 'processing', content: 'Honey processing removes the skin but leaves some fruit mucilage on the bean during drying. Creates a balance between washed and natural flavors with sweetness.' },
  { category: 'processing', content: 'Anaerobic fermentation is an experimental process where coffee is fermented in sealed tanks without oxygen. Produces intense, complex flavors with tropical fruit and wine notes.' },

  // Storage & freshness
  { category: 'storage', content: 'Store whole bean coffee in an airtight container away from light, heat, and moisture. Use within 2-4 weeks of the roast date for optimal freshness.' },
  { category: 'storage', content: 'Grind coffee just before brewing for the best flavor. Pre-ground coffee loses its aromatic compounds quickly and stales within hours.' },
  { category: 'storage', content: 'Never refrigerate or freeze coffee beans — condensation introduces moisture and odors. Store at room temperature in a cool, dark cabinet.' },

  // Pairings
  { category: 'pairing', content: 'Light roast Ethiopian coffee pairs well with citrus desserts, lemon cake, and floral pastries. Its bright acidity complements fruity flavors.' },
  { category: 'pairing', content: 'Medium roast Colombian coffee pairs with caramel desserts, nutty biscotti, and milk chocolate. Its balanced profile matches a wide range of foods.' },
  { category: 'pairing', content: 'Dark roast Sumatra coffee pairs with dark chocolate, grilled meats, and spicy dishes. Its bold flavors stand up to strong tastes.' },

  // Health & general
  { category: 'general', content: 'Coffee contains caffeine, a natural stimulant. A standard 8oz cup contains approximately 95mg of caffeine. Light roasts have slightly more caffeine than dark roasts by volume.' },
  { category: 'general', content: 'Single-origin coffee comes from one specific region, farm, or cooperative. It showcases the unique flavor characteristics of that particular place — its terroir.' },
  { category: 'general', content: 'Specialty coffee is graded 80+ points on the Specialty Coffee Association (SCA) 100-point scale by certified Q Graders. Only the top 3% of coffee worldwide qualifies as specialty.' },

  // About Roast & Ritual
  { category: 'shop', content: 'Roast & Ritual sources single-origin specialty coffee directly from farms in Ethiopia, Colombia, Indonesia, Costa Rica, and Kenya. Each roast is crafted to highlight the bean\'s unique origin characteristics.' },
  { category: 'shop', content: 'Roast & Ritual offers free shipping on orders over $30. All orders are roasted to order and shipped within 24 hours to ensure peak freshness.' },
  { category: 'shop', content: 'Roast & Ritual\'s coffee quiz matches you with your perfect roast based on your taste preferences, brewing method, and how adventurous you feel.' },
]

async function main() {
  console.log('Seeding coffee knowledge...')

  for (const chunk of knowledgeChunks) {
    await prisma.coffeeKnowledge.create({
      data: chunk,
    })
    console.log(`  ✓ [${chunk.category}] ${chunk.content.slice(0, 60)}...`)
  }

  console.log('Seeding complete!')
  console.log('')
  console.log('Next step: Enable pgvector on Neon and run the embedding script:')
  console.log('  1. In Neon Console → SQL Editor → RUN: CREATE EXTENSION vector;')
  console.log('  2. Run: npx tsx prisma/embed-knowledge.ts')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
