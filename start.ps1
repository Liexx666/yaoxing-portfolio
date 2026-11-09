$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$nodeCommand = Get-Command node.exe -CommandType Application -ErrorAction SilentlyContinue
$npmCommand = Get-Command npm.cmd -CommandType Application -ErrorAction SilentlyContinue

if ($nodeCommand -and $npmCommand) {
  & $npmCommand.Source run dev
} else {
  & (Join-Path $PSScriptRoot 'scripts\npm.ps1') run dev
}
exit $LASTEXITCODE
