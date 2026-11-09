# Make the chosen Node executable available to npm and its child processes.
# PATH changes are limited to this invocation and restored afterwards.
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$NpmArguments)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$nodeCommand = Get-Command node.exe -CommandType Application -ErrorAction SilentlyContinue

if ($nodeCommand) {
  $nodePath = $nodeCommand.Source
} else {
  # Discover updated Codex bundles when Windows permits listing WindowsApps.
  $runtimePackages = Get-ChildItem -LiteralPath (Join-Path $env:ProgramFiles 'WindowsApps') -Filter 'OpenAI.CodexPrimaryRuntime*' -Directory -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending
  $nodePath = $runtimePackages |
    ForEach-Object { Join-Path $_.FullName 'dependencies\node\bin\node.exe' } |
    Where-Object { Test-Path -LiteralPath $_ } |
    Select-Object -First 1

  # WindowsApps can deny directory listing while allowing a known executable.
  $knownRuntimeNode = 'C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt\dependencies\node\bin\node.exe'
  if (-not $nodePath -and (Test-Path -LiteralPath $knownRuntimeNode)) {
    $nodePath = $knownRuntimeNode
  }
}

if (-not $nodePath) {
  throw 'Node.js was not found. Install Node.js LTS, then reopen your terminal.'
}

$npmCli = Join-Path $projectRoot '.tooling\node_modules\npm\bin\npm-cli.js'
if (-not (Test-Path -LiteralPath $npmCli)) {
  throw 'Project-local npm is missing. On a fresh clone, use npm included with Node.js LTS.'
}

$previousPath = $env:Path
$commandExitCode = 1
try {
  $nodeDirectory = Split-Path $nodePath -Parent
  $env:Path = $nodeDirectory + [IO.Path]::PathSeparator + $previousPath
  & $nodePath $npmCli @NpmArguments
  $commandExitCode = $LASTEXITCODE
} finally {
  $env:Path = $previousPath
}
exit $commandExitCode
