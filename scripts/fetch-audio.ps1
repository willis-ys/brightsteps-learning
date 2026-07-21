param([string]$Target = "audio/phonemes")
$ErrorActionPreference = "Stop"
$Base = "https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds"
$Files = @("a","ai","air","ar","b","c","ch","d","e","ear","ee","er","f","g","h","i","igh","j","l","m","n","ng","o","oa","oi","oo","ooo","or","ow","p","qu","r","s","sh","t","th","u","ur","ure","v","w","x","y","z")
New-Item -ItemType Directory -Force -Path $Target | Out-Null
foreach ($Name in $Files) {
  $Out = Join-Path $Target "$Name.m4a"
  Write-Host "Downloading $Name.m4a"
  Invoke-WebRequest -Uri "$Base/$Name.m4a" -OutFile $Out
  if ((Get-Item $Out).Length -eq 0) { throw "Empty file: $Out" }
}
Write-Host "Installed $($Files.Count) local phonics files in $Target"
