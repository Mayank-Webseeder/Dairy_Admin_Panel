# Set working directory
$projectPath = "E:\VS Code Programs\admin_11\src"
Write-Host "Starting file conversion in: $projectPath"

# Convert .tsx to .jsx
Get-ChildItem -Path $projectPath -Filter "*.tsx" -Recurse | ForEach-Object {
    $newName = $_.FullName -replace '\.tsx$', '.jsx'
    Move-Item -Path $_.FullName -Destination $newName -Force
    Write-Host "Converted $($_.Name) to $(Split-Path $newName -Leaf)"
}

# Convert .ts to .js
Get-ChildItem -Path $projectPath -Filter "*.ts" -Recurse | ForEach-Object {
    $newName = $_.FullName -replace '\.ts$', '.js'
    Move-Item -Path $_.FullName -Destination $newName -Force
    Write-Host "Converted $($_.Name) to $(Split-Path $newName -Leaf)"
}

Write-Host "Conversion complete!"