$ErrorActionPreference = "Stop"

$repoUrl = "https://github.com/faustoaguanor/acceptance-sampling.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git no está instalado o no está disponible en PATH."
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) no está instalado o no está disponible en PATH."
}

gh auth status
gh auth setup-git | Out-Null

if (-not (Test-Path ".git")) {
  git init -b main
}

git branch -M main

$remote = git remote get-url origin 2>$null
if (-not $remote) {
  git remote add origin $repoUrl
} elseif ($remote -ne $repoUrl) {
  throw "El remoto origin apunta a '$remote'. Revíselo antes de publicar."
}

git add .
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "feat: add acceptance sampling web tool and examples"
}

git push -u origin main
Write-Host "Publicado en https://github.com/faustoaguanor/acceptance-sampling"

