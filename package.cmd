@echo off

del back\mini-kafka-ui-win32-x64.zip /q
rmdir /s back\dist /q
rmdir /s back\mini-kafka-ui-win32-x64 /q
rmdir /s front\dist /q

call yarn --cwd back build
copy back\package.json back\dist\package.json
xcopy back\node_modules\ back\dist\node_modules\ /q /s

call yarn --cwd back package

call yarn --cwd front build
xcopy front\dist\ back\mini-kafka-ui-win32-x64\resources\app\public\ /q /s

call yarn --cwd back zip