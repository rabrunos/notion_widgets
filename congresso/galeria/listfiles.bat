@echo off
setlocal enabledelayedexpansion

:: Caminho da pasta principal
set "root_dir=.\media"

:: Loop através de cada subpasta dentro de 'media'
for /d %%D in ("%root_dir%\*") do (
    set "folder_name=%%~nxD"
    set "json_file=%%D\!folder_name!.json"
    echo Gerando lista para a pasta: !folder_name!

    (
        echo [
        set "first=1"
        for %%F in ("%%D\*") do (
            set "file_name=%%~nxF"
            if !first! equ 1 (
                echo     "!file_name!"
                set "first=0"
            ) else (
                echo     , "!file_name!"
            )
        )
        echo ]
    ) > "!json_file!"
)

echo Processamento concluído.
pause
