<?php

namespace Packages\Services\Pdf;

use Mpdf\Mpdf;
use Mpdf\MpdfException;
use Packages\Enums\ExportType;

class MpdfService
{
    public function mpdfFontDirs(): array
    {
        return [
            __SOURCE__ . 'public/fonts/MpdfFonts',
        ];
    }

    public function mpdfFontData(): array
    {
        return [
            'xbzar' => [
                'R' => 'IRANYekanXFaNum-Regular.ttf',
                'B' => 'IRANYekanXFaNum-Bold.ttf',
                'BI' => 'IRANYekanXFaNum-ExtraBlack.ttf',
                'useOTL' => 0xFF,
                'useKashida' => 75
            ]
        ];
    }

    /**
     * @throws MpdfException
     */
    public function makePdfObject(array $options = []): \Mpdf\Mpdf
    {
        $basicOptions = [
            'fontDir' => $this->mpdfFontDirs(),
            'fontdata' => $this->mpdfFontData(),
            'tempDir' => __SOURCE__ . 'Storage/cache',
        ];
        return new \Mpdf\Mpdf(array_merge($basicOptions, $options));
    }

    /**
     * @throws \ImagickException
     * @throws MpdfException
     * @throws \Exception
     */
    public
    function exportPdf(
        Mpdf        $mpdf,
        string      $fileName,
        string      $tempPdfSchema,
        ExportType  $exportType = ExportType::IMAGE,
        string|null $fileProtectionPassword = null,
        string      $returnType = "I"
    ): void
    {
        switch ($exportType->name) {
            case "IMAGE":
                $tempFileName = $tempPdfSchema . "_" . uniqid();
                $tempPdf = __SOURCE__ . "Storage/cache/imagick/" . $tempFileName . '.pdf';

                $mpdf->Output($tempPdf, \Mpdf\Output\Destination::FILE);

                $imagick = new \Imagick();
                $imagick->setResolution(300, 300);
                $imagick->readImage($tempPdf);
                $imagick->setImageFormat('jpg');

                $imagePaths = [];
                foreach ($imagick as $i => $page) {
                    $imgFile = __SOURCE__ . "Storage/cache/imagick/" . $tempFileName . "page_{$i}.jpg";
                    $page->writeImage($imgFile);
                    $imagePaths[] = $imgFile;
                }

                $mpdfObject = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4', 'tempDir' => __SOURCE__ . 'Storage/cache/mpdf',]);
                foreach ($imagePaths as $imgPath) {
                    $mpdfObject->AddPage();
                    $mpdfObject->Image($imgPath, 0, 0, 210, 297, 'jpg', '', true, false);
                }


                unlink($tempPdf);
                foreach ($imagePaths as $img) {
                    unlink($img);
                }
                break;

            case "PDF":
                $mpdfObject = $mpdf;
                break;
            default:
                throw new \Exception('method not allowed');
        }

        if (!is_null($fileProtectionPassword)) {
            $mpdfObject->SetProtection(['print'], '', $fileProtectionPassword);
        }

        $mpdfObject->Output($fileName . '.pdf', $returnType);
    }

}