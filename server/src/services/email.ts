import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

const FROM = process.env.EMAIL_FROM || 'noreply@roastandritual.com'

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SMTP_HOST) {
    console.warn('[email] SMTP not configured — skipping email send')
    return
  }

  await transporter.sendMail({
    from: `"Roast & Ritual" <${FROM}>`,
    to,
    subject,
    html,
  })
}

export function buildAbandonedCartEmail(name: string, items: { name: string; quantity: number; price: number }[], total: number) {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #3d2e24;color:#e9e1dc">${item.name} × ${item.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #3d2e24;color:#e9e1dc;text-align:right">$${Number(item.price).toFixed(2)}</td></tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0D0A08;font-family:Inter,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:48px 24px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="text-align:center;padding-bottom:32px">
<h1 style="color:#D4A04A;font-size:28px;font-weight:800;letter-spacing:-0.02em;margin:0">Roast &amp; Ritual</h1>
<p style="color:#B8A89A;font-size:14px;margin:4px 0 0">Turn your coffee into a ritual</p>
</td></tr>
<tr><td style="background:#1C1512;border:1px solid #3d2e24;border-radius:12px;padding:40px">
<h2 style="color:#F5F0EB;font-size:24px;font-weight:700;margin:0 0 8px">Hey ${name}, your cart is waiting!</h2>
<p style="color:#B8A89A;font-size:15px;line-height:1.6;margin:0 0 24px">You left some coffee behind. We've saved your items — come back and complete your order before they sell out.</p>
<table width="100%" cellpadding="0" cellspacing="0">
<thead><tr><th style="text-align:left;padding:8px 0;border-bottom:2px solid #D4A04A;color:#D4A04A;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">Item</th><th style="text-align:right;padding:8px 0;border-bottom:2px solid #D4A04A;color:#D4A04A;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">Price</th></tr></thead>
<tbody>${itemsHtml}</tbody>
<tfoot><tr><td style="padding:12px 0 0;color:#B8A89A;font-size:15px;font-weight:700">Total</td><td style="padding:12px 0 0;color:#D4A04A;font-size:15px;font-weight:700;text-align:right">$${Number(total).toFixed(2)}</td></tr></tfoot>
</table>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 0 0">
<a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/cart" style="display:inline-block;background:#D4A04A;color:#432c00;text-decoration:none;font-size:16px;font-weight:700;padding:14px 40px;border-radius:8px">Return to Cart</a>
</td></tr></table>
</td></tr>
<tr><td style="text-align:center;padding:24px 0 0">
<p style="color:#7C4F34;font-size:12px;margin:0">If you didn't add items to your cart, ignore this email.</p>
<p style="color:#7C4F34;font-size:12px;margin:4px 0 0">Roast &amp; Ritual — Premium Coffee, Delivered.</p>
</td></tr>
</table>
</td></tr></table>
</body>
</html>`

  return html
}
