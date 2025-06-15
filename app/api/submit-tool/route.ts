import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const requiredFields = ['toolName', 'description', 'website', 'category', 'pricing', 'email']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Create the submission record
    const submissionData = {
      tool_name: formData.toolName,
      tagline: formData.tagline,
      description: formData.description,
      website: formData.website,
      category_id: formData.category,
      pricing: formData.pricing,
      pricing_details: formData.pricingDetails,
      email: formData.email,
      company_name: formData.companyName,
      features: formData.features,
      logo_url: formData.logoUrl,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
      target_audience: formData.targetAudience,
      use_case: formData.useCase,
      key_benefits: formData.keyBenefits,
      technical_details: formData.technicalDetails,
      integrations: formData.integrations,
      languages: formData.languages,
      platforms: formData.platforms,
      request_featured: formData.requestFeatured,
      featured_reason: formData.featuredReason,
      social_media: formData.socialMedia,
      screenshots: formData.screenshots,
      demo_video: formData.demoVideo,
      founding_year: formData.foundingYear,
      team_size: formData.teamSize,
      funding: formData.funding,
      status: 'pending',
      submitted_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('tool_submissions')
      .insert(submissionData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit tool. Please try again.' },
        { status: 500 }
      )
    }    // If featured was requested, redirect to payment
    if (formData.requestFeatured) {
      return NextResponse.json({
        success: true,
        submissionId: data.id,
        requiresPayment: true,
        message: 'Submission received! Please complete payment for featured listing.'
      })
    }

    return NextResponse.json({
      success: true,
      submissionId: data.id,
      requiresPayment: false,
      message: 'Thank you! Your tool submission has been received. We will review it within 2-3 business days.'
    })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
