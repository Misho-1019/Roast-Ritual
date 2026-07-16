const BASE_URL = 'https://api.hubapi.com'

function getToken(): string | null {
  return process.env.HUBSPOT_API_KEY || null
}

async function apiPost(path: string, body: unknown) {
  const token = getToken()
  if (!token) return null

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[hubspot] POST error', res.status, text.slice(0, 200))
      return null
    }
    return res.json()
  } catch (err) {
    console.error('[hubspot] request failed:', err)
    return null
  }
}

export async function syncContact(user: { id: string; email: string; name: string }) {
  const nameParts = user.name.trim().split(/\s+/)
  return apiPost('/crm/v3/objects/contacts', {
    properties: {
      email: user.email,
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(' ') || nameParts[0],
      hs_object_id: user.id,
    },
  })
}

export async function syncDeal(order: { id: string; total: number; userId: string; status: string }) {
  return apiPost('/crm/v3/objects/deals', {
    properties: {
      dealname: `Order #${order.id.slice(0, 8)}`,
      amount: String(Number(order.total)),
      dealstage: order.status === 'PAID' ? 'closedwon' : 'appointmentscheduled',
      hs_object_id: order.id,
    },
  })
}
