echo Starting build....
call npm install
call cd public
call bower install
call cd ..
call harp compile
call grunt build
echo Complete