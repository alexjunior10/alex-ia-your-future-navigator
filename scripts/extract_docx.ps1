param (
    [string]$DocxPath,
    [string]$OutputPath
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Parse XML to extract text preserving paragraphs and tables
[xml]$xml = $xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

$sb = New-Object System.Text.StringBuilder

# Find all body elements in order (paragraphs and tables)
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

[System.IO.File]::WriteAllText($OutputPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Output "Successfully extracted $DocxPath to $OutputPath"
