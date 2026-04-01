import type { Handler } from '@netlify/functions'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FEEDBACK_EMAIL = 'aszkenasy@gmail.com'

interface FeedbackPayload {
  message: string
  email?: string
  page?: string
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' }),
    }
  }

  try {
    const payload: FeedbackPayload = JSON.parse(event.body || '{}')

    if (!payload.message?.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      }
    }

    const emailHtml = `
      <h2>New Feedback from DS Pathway</h2>
      <p><strong>Message:</strong></p>
      <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${payload.message.replace(/\n/g, '<br>')}</p>
      ${payload.email ? `<p><strong>Reply to:</strong> ${payload.email}</p>` : ''}
      ${payload.page ? `<p><strong>Page:</strong> ${payload.page}</p>` : ''}
      <hr>
      <p style="color: #666; font-size: 12px;">Sent from DS Pathway app</p>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DS Pathway <onboarding@resend.dev>',
        to: FEEDBACK_EMAIL,
        subject: 'New Feedback from DS Pathway',
        html: emailHtml,
        reply_to: payload.email || undefined,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Resend error:', errorData)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    console.error('Error sending feedback:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
