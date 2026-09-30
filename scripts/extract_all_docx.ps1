Add-Type -AssemblyName System.IO.Compression.FileSystem

$outDir = "scripts/extracted_docs"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$files = @(
    "Questionnaire_Design_V1.docx",
    "Questionnaire_Blueprint_38xEvidencia_V1.docx",
    "Question_Bank_V1_Alex_IA.docx",
    "Score_Model_V1_Alex_IA.docx"
)

foreach ($f in $files) {
    $docxPath = Join-Path "Preguntas-Diseño" $f
    $outputPath = Join-Path $outDir ($f -replace '\.docx$', '.txt')
    
    Write-Output "Processing $docxPath ..."
    $zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
    $entry = $zip.GetEntry('word/document.xml')
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xmlText = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()

    [xml]$xml = $xmlText
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

    $sb = New-Object System.Text.StringBuilder
    $bodyNodes = $xml.SelectNodes('//w:body/*[self::w:p or self::w:tbl]', $ns)

    foreach ($node in $bodyNodes) {
        if ($node.LocalName -eq 'p') {
            $pText = ""
            $texts = $node.SelectNodes('.//w:t', $ns)
            foreach ($t in $texts) {
                $pText += $t.InnerText
            }
            if ($pText.Trim().Length -gt 0) {
                [void]$sb.AppendLine($pText)
            }
        }
        elseif ($node.LocalName -eq 'tbl') {
            [void]$sb.AppendLine("--- TABLE START ---")
            $rows = $node.SelectNodes('.//w:tr', $ns)
            foreach ($row in $rows) {
                $cells = $row.SelectNodes('.//w:tc', $ns)
                $cellTexts = @()
                foreach ($cell in $cells) {
                    $cText = ""
                    $texts = $cell.SelectNodes('.//w:t', $ns)
                    foreach ($t in $texts) {
                        $cText += $t.InnerText
                    }
                    $cellTexts += $cText.Trim()
                }
                [void]$sb.AppendLine(($cellTexts -join " | "))
            }
            [void]$sb.AppendLine("--- TABLE END ---")
        }
    }

    [System.IO.File]::WriteAllText($outputPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
    Write-Output "Extracted: $outputPath"
}
