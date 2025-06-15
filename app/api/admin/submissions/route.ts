import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('tool_submissions')
      .select('*', { count: 'exact' })
      .eq('status', status)
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      submissions: data,
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error: any) {
    console.error('Get submissions error:', error)
    
    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdmin()
    
    const { submissionId, status, rejectionReason, adminNotes } = await request.json()

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    if (rejectionReason) {
      updateData.rejection_reason = rejectionReason
    }

    if (adminNotes) {
      updateData.admin_notes = adminNotes
    }

    // If approving, create the actual tool entry
    if (status === 'approved') {
      const { data: submission, error: fetchError } = await supabase
        .from('tool_submissions')
        .select('*')
        .eq('id', submissionId)
        .single()

      if (fetchError || !submission) {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        )
      }

      // Create tool entry
      const toolData = {
        id: `tool-${Date.now()}`,
        name: submission.tool_name,
        description: submission.description,
        short_description: submission.tagline,
        logo_url: submission.logo_url,
        category_id: submission.category_id,
        tags: submission.tags,
        rating: 0,
        pricing: submission.pricing,
        url: submission.website,
        featured: submission.request_featured && submission.payment_status === 'completed',
        trending: false,
        new: true,
        clicks: 0,
        views: 0
      }

      const { error: toolError } = await supabase
        .from('tools')
        .insert(toolData)

      if (toolError) {
        console.error('Failed to create tool:', toolError)
        return NextResponse.json(
          { error: 'Failed to create tool entry' },
          { status: 500 }
        )
      }

      updateData.approved_at = new Date().toISOString()
    }

    const { error } = await supabase
      .from('tool_submissions')
      .update(updateData)
      .eq('id', submissionId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Update submission error:', error)
    
    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
