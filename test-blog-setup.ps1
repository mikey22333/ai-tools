# PowerShell script to test blog setup
Write-Host "Testing Blog System Setup..." -ForegroundColor Green

# Test 1: Check if development server is running
Write-Host "`n1. Testing if development server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "✓ Development server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Development server not running. Please run 'npm run dev' first." -ForegroundColor Red
    exit 1
}

# Test 2: Check database connection and posts table
Write-Host "`n2. Testing database connection and posts table..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/blog/test" -Method GET -TimeoutSec 10
    $content = $response.Content | ConvertFrom-Json
    Write-Host "✓ Database connection successful" -ForegroundColor Green
    Write-Host "✓ Posts table exists with $($content.count) posts" -ForegroundColor Green
} catch {
    Write-Host "✗ Database test failed. Please ensure the posts table is created in Supabase." -ForegroundColor Red
    Write-Host "  Run the SQL script from database/create-posts-table.sql in your Supabase SQL Editor." -ForegroundColor Yellow
}

# Test 3: Check environment variables
Write-Host "`n3. Testing environment variables..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/blog/env-check" -Method GET -TimeoutSec 5
    $content = $response.Content | ConvertFrom-Json
    if ($content.hasRequiredVars) {
        Write-Host "✓ All required environment variables are set" -ForegroundColor Green
    } else {
        Write-Host "✗ Missing environment variables" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Environment check failed" -ForegroundColor Red
}

# Test 4: Check blog API endpoints
Write-Host "`n4. Testing blog API endpoints..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/posts" -Method GET -TimeoutSec 10
    Write-Host "✓ Blog API is working" -ForegroundColor Green
} catch {
    Write-Host "✗ Blog API test failed" -ForegroundColor Red
}

Write-Host "`nSetup test complete!" -ForegroundColor Green
Write-Host "If all tests pass, your blog system is ready to use." -ForegroundColor Cyan
