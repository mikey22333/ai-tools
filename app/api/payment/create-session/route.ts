import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

// Initialize Stripe only when needed
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const { submissionId, featuredType = 'basic' } = await request.json()

    // Validate submission exists
    const { data: submission, error: submissionError } = await supabase
      .from('tool_submissions')
      .select('*')
      .eq('id', submissionId)
      .single()

    if (submissionError || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }    // Define pricing tiers
    const pricingTiers = {
      basic: {
        price: 999, // $9.99 in cents
        name: 'Featured Listing',
        description: 'Featured placement in our directory (one-time fee)'
      },
      premium: {
        price: 999, // Keep same price for now
        name: 'Featured Listing',
        description: 'Featured placement in our directory (one-time fee)'
      },
      ultimate: {
        price: 999, // Keep same price for now
        name: 'Featured Listing',
        description: 'Featured placement in our directory (one-time fee)'
      }
    }

    const selectedTier = pricingTiers[featuredType as keyof typeof pricingTiers]
    
    if (!selectedTier) {
      return NextResponse.json(
        { error: 'Invalid featured type' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedTier.name,
              description: selectedTier.description,
              metadata: {
                submissionId: submissionId,
                toolName: submission.tool_name
              }
            },
            unit_amount: selectedTier.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/submit-tool/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/submit-tool?cancelled=true`,
      metadata: {
        submissionId: submissionId,
        featuredType: featuredType
      },
      customer_email: submission.email,
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}
