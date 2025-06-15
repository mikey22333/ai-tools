import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      )
    }

    // In a real implementation, you would verify the webhook signature here
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    
    // For now, we'll parse the body directly (not recommended for production)
    const event = JSON.parse(body)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const submissionId = session.metadata.submissionId
      const featuredType = session.metadata.featuredType

      // Update submission with payment information
      const { error } = await supabase
        .from('tool_submissions')
        .update({
          payment_status: 'completed',
          featured_type: featuredType,
          payment_session_id: session.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)

      if (error) {
        console.error('Failed to update submission:', error)
        return NextResponse.json(
          { error: 'Failed to update submission' },
          { status: 500 }
        )
      }

      // TODO: Send confirmation email to the user
      console.log(`Payment completed for submission ${submissionId}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
