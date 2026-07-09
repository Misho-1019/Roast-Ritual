export interface Question {
  id: number
  question: string
  options: { label: string; value: string }[]
}

export interface ProductMatch {
  slug: string
  name: string
  imageUrl: string
  price: number
  roastLevel: string
  origin: string
  description: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'How do you typically take your coffee?',
    options: [
      { label: 'Black — pure and unadulterated', value: 'black' },
      { label: 'With milk or cream', value: 'milk' },
      { label: 'Sweet & creamy', value: 'sweet' },
    ],
  },
  {
    id: 2,
    question: 'What flavor profile excites you most?',
    options: [
      { label: 'Fruity & floral', value: 'fruity' },
      { label: 'Nutty & caramel', value: 'nutty' },
      { label: 'Bold & chocolate', value: 'chocolate' },
      { label: 'Bright & citrus', value: 'citrus' },
    ],
  },
  {
    id: 3,
    question: 'What roast level do you prefer?',
    options: [
      { label: 'Light — bright and complex', value: 'light' },
      { label: 'Medium — balanced and smooth', value: 'medium' },
      { label: 'Dark — bold and rich', value: 'dark' },
    ],
  },
  {
    id: 4,
    question: 'When do you enjoy coffee most?',
    options: [
      { label: 'Morning boost', value: 'morning' },
      { label: 'Afternoon pick-me-up', value: 'afternoon' },
      { label: 'Evening wind-down', value: 'evening' },
    ],
  },
  {
    id: 5,
    question: 'How adventurous are you with coffee?',
    options: [
      { label: 'Classic & reliable', value: 'classic' },
      { label: 'Balanced & smooth', value: 'balanced' },
      { label: 'Bold & experimental', value: 'experimental' },
    ],
  },
]

export const products: ProductMatch[] = [
  {
    slug: 'ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZcbV-rZZJqxtnNqTv30TWfrUxqeiMrSQQIP72N7NznwT7RGfwpNSQ5KIMv2PKdrcNTGpxgWfbFzLVuce4N9bic3sYQQ-w7DnCjT9v8-w9r57adnwwmWoYuZ2JzUlN1m_Bu1sgqtohJaOdih7yhCR-echybm7waPzD8ocE7FoiTJl4ma_J6gzUF3gCdVL6uYfHP-uvLwl7g6sTFPrMMaiGQkyZ85IULp3IuD7lWs3jDG9c_mUOLIFAITVbiX2hDhOEwbVGeKMRIZs=s0',
    price: 24.00,
    roastLevel: 'Light Roast',
    origin: 'Ethiopia',
    description: 'Bright, complex, and intensely aromatic with floral and citrus notes.',
  },
  {
    slug: 'colombian-supremo',
    name: 'Colombian Supremo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qLIG-wEZJiYR4d5dvY6ZN7mq-fy6qOR-pLIl9K2VFRwmp8KgLiJdo62Bs57pCgt3xMgf8snJBXsvvhIjZc-hCy1ziTNPXyQEKAQ5Dupo-nJ0Wcw9M8QFpaT2_A7D8ZbyuXgFG92-qu0eVnxsBp3G0UqMFeVjx819FBlhXyuQn96UUFW4XfBR98E_BrcKpQExPgzC4rmLkphenZMhoOMrl4pJMRm5--pzGOLJDk3B4Rl7VVmHZ_n-6tAQUphIWQA7Jg3i64-0-GA=s0',
    price: 22.50,
    roastLevel: 'Medium Roast',
    origin: 'Colombia',
    description: 'Perfectly balanced with caramel sweetness and a smooth, nutty body.',
  },
  {
    slug: 'midnight-sumatra',
    name: 'Midnight Sumatra',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwebKEY5VrYuu7MOa6txGOsapmLcdckM4RBhcKc2WnLMtVU1XzsQAr7D0qlJczUqD2--XA-jVPYsJa0N0axP1XFhi-1oHeLQR2Ag3-1Q2ZDcNRrJkCoM_PqACDJGs1ani4d1zGh5kk_aVl16pL4tER0jJUks3i_NFyfZo5K5I0j_9MJGwjd6nAxOqxViT_6ynd7kKdse1eHVt9ruvtt8_VlHD9tBfYVgb9OI-yXUncTtVPV0NFSOUwFNwfB9UInTDP6nflD4lKg5s=s0',
    price: 26.00,
    roastLevel: 'Dark Roast',
    origin: 'Indonesia',
    description: 'Bold, earthy, and full-bodied with deep chocolate notes and a hint of spice.',
  },
  {
    slug: 'anaerobic-gesha',
    name: 'Anaerobic Gesha',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7qDnK5TuhnUz3FIUvJUGw9aFsSsiHptvO8YO7WBqOiaMTRFyGMtnPWhjiUANodLbDHaD5Gij1N3TY_9j5KNnHhqE7liqvyAWsD_U0Iw4VAlMMiWfw_hlZI4kiA66nE5o_6eGWXJhSDSzKE9NO3p1u8k_3B72D_AQhb6EmRW2qctUU1zcHTJgTCf4xLe1yQXpIYD-8uIhCO3Vz9VVlW6ZS4hxXSPOHhOKvfe5zu-nWG-uzOLHqqjHN7B_Mb9uF3UrWyQSZreF0h2Y=s0',
    price: 38.00,
    roastLevel: 'Light Roast',
    origin: 'Ethiopia',
    description: 'An explosion of tropical fruit and jasmine with an incredibly complex profile.',
  },
  {
    slug: 'costa-rican-tarrazu',
    name: 'Costa Rican Tarrazu',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7qDnK5TuhnUz3FIUvJUGw9aFsSsiHptvO8YO7WBqOiaMTRFyGMtnPWhjiUANodLbDHaD5Gij1N3TY_9j5KNnHhqE7liqvyAWsD_U0Iw4VAlMMiWfw_hlZI4kiA66nE5o_6eGWXJhSDSzKE9NO3p1u8k_3B72D_AQhb6EmRW2qctUU1zcHTJgTCf4xLe1yQXpIYD-8uIhCO3Vz9VVlW6ZS4hxXSPOHhOKvfe5zu-nWG-uzOLHqqjHN7B_Mb9uF3UrWyQSZreF0h2Y=s0',
    price: 17.99,
    roastLevel: 'Medium-Dark Roast',
    origin: 'Costa Rica',
    description: 'Bright citrus acidity meets honey-like sweetness with a creamy body.',
  },
  {
    slug: 'kenyan-aa',
    name: 'Kenyan AA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qLIG-wEZJiYR4d5dvY6ZN7mq-fy6qOR-pLIl9K2VFRwmp8KgLiJdo62Bs57pCgt3xMgf8snJBXsvvhIjZc-hCy1ziTNPXyQEKAQ5Dupo-nJ0Wcw9M8QFpaT2_A7D8ZbyuXgFG92-qu0eVnxsBp3G0UqMFeVjx819FBlhXyuQn96UUFW4XfBR98E_BrcKpQExPgzC4rmLkphenZMhoOMrl4pJMRm5--pzGOLJDk3B4Rl7VVmHZ_n-6tAQUphIWQA7Jg3i64-0-GA=s0',
    price: 28.00,
    roastLevel: 'Light Roast',
    origin: 'Kenya',
    description: 'Remarkably bright with grapefruit and blackcurrant notes, a wine-like body.',
  },
]

export function calculateMatch(answers: Record<number, string>): ProductMatch {
  const values = Object.values(answers)

  if (values.includes('experimental') || values.includes('fruity')) return products[3]
  if (values.includes('citrus')) return values.includes('sweet') ? products[4] : products[5]
  if (values.includes('nutty') || values.includes('milk')) return products[1]
  if (values.includes('chocolate') || values.includes('dark')) return products[2]
  if (values.includes('black') && values.includes('fruity')) return products[0]
  if (values.includes('morning') || values.includes('light')) return products[0]
  if (values.includes('balanced') || values.includes('medium')) return products[1]
  if (values.includes('evening') || values.includes('classic')) return products[4]

  return products[0]
}
