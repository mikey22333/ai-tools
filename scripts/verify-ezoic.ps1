# Ezoic Integration Verification Script
# Run this after deploying to verify everything is working

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ezoic Integration Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://allaitools.dev"  # Change to localhost:3000 for local testing
$errors = @()
$warnings = @()

# Function to check URL
function Test-Url {
    param($url, $description)
    
    Write-Host "Checking: $description..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host " OK" -ForegroundColor Green
            return $true
        } else {
            Write-Host " FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
            $script:errors += "$description failed with status code $($response.StatusCode)"
            return $false
        }
    } catch {
        Write-Host " FAILED" -ForegroundColor Red
        $script:errors += "$description failed: $($_.Exception.Message)"
        return $false
    }
}

# Function to check for text in response
function Test-Content {
    param($url, $searchText, $description)
    
    Write-Host "Checking: $description..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.Content -like "*$searchText*") {
            Write-Host " FOUND" -ForegroundColor Green
            return $true
        } else {
            Write-Host " NOT FOUND" -ForegroundColor Yellow
            $script:warnings += "$description not found in response"
            return $false
        }
    } catch {
        Write-Host " FAILED" -ForegroundColor Red
        $script:errors += "$description check failed: $($_.Exception.Message)"
        return $false
    }
}

Write-Host "1. Testing Ads.txt Configuration" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Test-Url "$baseUrl/ads.txt" "Ads.txt file"

Write-Host ""
Write-Host "2. Testing Homepage Scripts" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow
Test-Content $baseUrl "gatekeeperconsent.com" "Privacy script 1"
Test-Content $baseUrl "cmp.min.js" "Privacy script 2"
Test-Content $baseUrl "ezojs.com/ezoic/sa.min.js" "Ezoic header script"
Test-Content $baseUrl "ezstandalone" "Ezoic initialization"

Write-Host ""
Write-Host "3. Testing Ad Placements" -ForegroundColor Yellow
Write-Host "========================" -ForegroundColor Yellow
Test-Content $baseUrl "ezoic-pub-ad-placeholder-101" "Homepage Top Ad (101)"
Test-Content $baseUrl "ezoic-pub-ad-placeholder-102" "Homepage Mid Ad (102)"
Test-Content $baseUrl "ezoic-pub-ad-placeholder-103" "Homepage Bottom Ad (103)"

Write-Host ""
Write-Host "4. Testing Blog Page" -ForegroundColor Yellow
Write-Host "====================" -ForegroundColor Yellow
Test-Content "$baseUrl/blog" "ezoic-pub-ad-placeholder-106" "Blog Listing Top Ad (106)"
Test-Content "$baseUrl/blog" "ezoic-pub-ad-placeholder-107" "Blog Sidebar Ad (107)"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verification Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Summary
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✓ All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Log into Ezoic Dashboard: https://pubdash.ezoic.com/" -ForegroundColor White
    Write-Host "2. Create placements with IDs: 101, 102, 103, 104, 105, 106, 107" -ForegroundColor White
    Write-Host "3. Wait 24-48 hours for first revenue data" -ForegroundColor White
} else {
    if ($errors.Count -gt 0) {
        Write-Host "✗ Errors Found:" -ForegroundColor Red
        $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠ Warnings:" -ForegroundColor Yellow
        $warnings | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
        Write-Host ""
    }
    
    Write-Host "Please review the issues above and fix them before proceeding." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For detailed integration guide, see EZOIC_INTEGRATION.md" -ForegroundColor Cyan
