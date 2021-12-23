summary
---------

* a dockerized version of sbadmin2
* runs in a docker container
* all that is needed is to launch the docker command (see below)
* a bind mount is made between the dev directory & the docker container

Docker considerations
------------------------

* all gulp/npm installs are done under /opt in the container (debian base image)
* the setup is meant to be mounted under /frontend in the docker container
* you mount your frontend dev setup (could be just current dir) in /frontend in container
* then run gulp watch | css etc.

run the container etc.
---------------------------------------

cd to root folder:
* docker build -t <dockerhub_username>/<your_image_name> .
* docker push <dockerhub_username>/<your_image_name>
running bash shell within the container (assuming your run this command from the root directory where you code):
* docker run -it -v "$(pwd):/frontend" <dockerhub_username>/<your_image_name> bash
running any of the gulp task:
* docker run -it -v "$(pwd):/frontend" <dockerhub_username>/<your_image_name> gulp [css|js|vendor|watch]

