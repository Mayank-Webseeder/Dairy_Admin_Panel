# Convert/simplify TypeScript-like UI files in src/components/ui
# Creates .bak backups next to each modified file

$uiPath = "E:\VS Code Programs\admin_11\src\components\ui"
if (-not (Test-Path $uiPath)) {
    Write-Error "Path not found: $uiPath"
    exit 1
}

$files = Get-ChildItem -Path $uiPath -Recurse -Include *.jsx,*.js,*.tsx,*.ts

if ($files.Count -eq 0) {
    Write-Host "No files found to process under $uiPath"
    exit 0
}

Write-Host "Processing $($files.Count) files in $uiPath ..."
foreach ($f in $files) {
    $path = $f.FullName
    $orig = Get-Content -Raw -LiteralPath $path

    # create backup if not exists
    $bakPath = "$path.bak"
    if (-not (Test-Path $bakPath)) {
        $orig | Out-File -FilePath $bakPath -Encoding UTF8
    }

    $content = $orig

    # 1) Remove explicit package version suffixes in imports like package@1.2.3 -> package
    $content = [regex]::Replace($content, '(["''])(@?[\w\-\./]+?)@[\d][^"'']*?\1', '$1$2$1')

    # 2) Remove "type" token in imports (simple)
    $content = $content -replace '\btype\s+', ''

    # 3) Remove "as const"
    $content = $content -replace '\bas const\b', ''

    # 4) Remove export type/interface blocks (heuristic, single-line or small blocks)
    $content = [regex]::Replace($content, 'export\s+type\s+[A-Za-z0-9_]+\s*=\s*\{[^}]*\}\s*;?', '' , [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $content = [regex]::Replace($content, 'export\s+type\s+[A-Za-z0-9_]+\s*=\s*[^;]+;?', '' , [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $content = [regex]::Replace($content, 'export\s+interface\s+[A-Za-z0-9_]+\s*\{[^}]*\}\s*;?', '' , [System.Text.RegularExpressions.RegexOptions]::Singleline)

    # 5) Strip common TypeScript annotations like ": string", ": boolean", ": SomeType[]" when followed by , ) } ; or newline
    $content = [regex]::Replace($content, ':\s*([A-Za-z0-9_<>\[\]\| \.\'"\-,]+?)(?=(,|\)|\}|\n|\r|;))', '')

    # 6) Remove generic type parameters in common patterns (simple)
    $content = [regex]::Replace($content, '<\s*[A-Za-z0-9_<>\,\s\?]+\s*>', '')

    # 7) Remove leftover standalone "interface" or "type" tokens
    $content = $content -replace '\binterface\b\s+[A-Za-z0-9_]+\s*', ''
    $content = $content -replace '\btype\b\s+[A-Za-z0-9_]+\s*', ''

    # 8) Collapse multiple blank lines
    $content = [regex]::Replace($content, "(\r?\n){3,}", "`r`n`r`n")

    if ($content -ne $orig) {
        $content | Out-File -FilePath $path -Encoding UTF8 -Force
        Write-Host "Modified: $path (backup: $bakPath)"
    } else {
        Write-Host "No change: $path"
    }
}

Write-Host "Done. Review .bak files before committing."