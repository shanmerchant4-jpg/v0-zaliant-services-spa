import { type NextRequest, NextResponse } from "next/server"

const EMAIL_TEMPLATES = {
  order_confirmation: (data: any) => ({
    subject: "Order Confirmation - Zaliant Services",
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7D5FFF;">Order Confirmed!</h2>
        <p>Thank you for your purchase from Zaliant Services.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Amount:</strong> $${data.amount}</p>
          <p><strong>Items:</strong> ${data.items?.length || 1} product(s)</p>
        </div>

        <p>Your license key(s) will be delivered shortly via email.</p>
        
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          Need help? Contact support@zaliant.com
        </p>
      </div>
    `,
  }),

  license_key: (data: any) => ({
    subject: `Your License Key - ${data.productName}`,
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF4AD6;">Your License is Ready!</h2>
        <p>Thank you for purchasing <strong>${data.productName}</strong>.</p>
        
        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #7D5FFF;">
          <p style="color: #666; font-size: 12px; margin: 0 0 10px 0;">YOUR LICENSE KEY</p>
          <p style="color: #7D5FFF; font-size: 18px; font-family: monospace; margin: 0; word-break: break-all;">
            ${data.licenseKey}
          </p>
        </div>

        <h3>Installation Instructions:</h3>
        <ol style="line-height: 1.8;">
          <li>Copy your license key above</li>
          <li>Launch the application</li>
          <li>Paste the license key when prompted</li>
          <li>Enjoy premium features!</li>
        </ol>

        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          Having issues? Contact support@zaliant.com
        </p>
      </div>
    `,
  }),

  support_reply: (data: any) => ({
    subject: `Support Reply - Ticket #${data.ticketId}`,
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7D5FFF;">We've Replied to Your Support Ticket</h2>
        <p>Ticket #${data.ticketId}</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${data.message}
        </div>

        <p>Reply to this email or visit our support center to continue the conversation.</p>
      </div>
    `,
  }),
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, email, ...data } = body

    const template = EMAIL_TEMPLATES[type as keyof typeof EMAIL_TEMPLATES]
    if (!template) {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    const { subject, html } = template(data)

    // TODO: Integrate with email provider (Resend, SendGrid, etc.)
    console.log(`Sending ${type} email to ${email}:`, { subject, html })

    // For now, just log it - in production, call your email provider
    // Example with Resend:
    // const result = await resend.emails.send({
    //   from: "noreply@zaliant.com",
    //   to: email,
    //   subject,
    //   html,
    // })

    return NextResponse.json({ success: true, message: "Email queued" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
