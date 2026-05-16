$repoDir = "C:\d\planifest\docs\"

# Refresh Framework
Remove-Item -Path "$repoDir\planifest-framework\" -Recurse -EA SilentlyContinue
Copy-Item -Path "C:\d\planifest\framework\planifest-framework\" -Destination $repoDir -Recurse

# Remove Claude
Remove-Item -Path "$repoDir\.claude\" -Recurse -EA SilentlyContinue
Remove-Item -Path "$repoDir\AGENTS.md" -EA SilentlyContinue
Remove-Item -Path "$repoDir\CLAUDE.md" -EA SilentlyContinue

# Re-add Claude
Set-Location $repoDir
.\planifest-framework\setup.ps1 claude-code --context-mode-mcp --structured-telemetry-mcp
