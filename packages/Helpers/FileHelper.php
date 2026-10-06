<?php

namespace Packages\Helpers;

class FileHelper
{
    public function fileUpload(
        string $fileDirection,
        string $fileName,
        string $fileDirectionChild = ''
    )
    {
        $makeParentDirection = __SOURCE__ . 'Storage/' . trim($fileDirection, '/');

        if (!is_dir($makeParentDirection)) {
            if (!mkdir($makeParentDirection, 0777, true) && !is_dir($makeParentDirection)) {
                throw new RuntimeException(
                    'Unable to create directory: ' . $makeParentDirection
                );
            }
        }

        $targetDirectory = $makeParentDirection;

        if ($fileDirectionChild) {
            $makeChild = $makeParentDirection . '/' . trim($fileDirectionChild, '/');

            if (!is_dir($makeChild)) {
                if (!mkdir($makeChild, 0777, true) && !is_dir($makeChild)) {
                    throw new RuntimeException(
                        'Unable to create directory: ' . $makeChild
                    );
                }
            }

            $targetDirectory = $makeChild;
        }

        if (empty($_FILES[$fileName]['name'])) {
            return null;
        }

        $tmpName = $_FILES[$fileName]['tmp_name'];
        $extension = pathinfo(
            $_FILES[$fileName]['name'],
            PATHINFO_EXTENSION
        );

        $hashedFileName = md5($tmpName);

        $uploadedFileName = $hashedFileName . (
            $extension !== '' ? '.' . $extension : ''
            );

        $targetFile = $targetDirectory . '/' . $uploadedFileName;

        if (!move_uploaded_file($tmpName, $targetFile)) {
            throw new RuntimeException(
                'Unable to move uploaded file to: ' . $targetFile
            );
        }

        return $uploadedFileName;
    }
}