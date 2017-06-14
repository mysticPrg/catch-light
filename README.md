# Catch Light

# start server (temporary server)
sudo docker run --name catch-light -d -p 3000:3000 mysticprg/catch-light 

connect http://localhost:3000

# start develop mode
sudo docker run --name catch-light -d -p 3000:3000 -v `pwd`/src:/app/src mysticprg/catch-light

connect http://localhost:3000 and edit source files...

# stop
sudo docker stop catch-light


